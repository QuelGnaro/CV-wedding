import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IForm, IFormControl, IValidator } from '../../interface/form.interface';
import { BehaviorSubject } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent implements OnInit {
  private renderTrigger$ = new BehaviorSubject<void>(undefined);
  cdr = inject(ChangeDetectorRef);
  @Input() form !: IForm;
  fb = inject(FormBuilder);
  dynamicForm: FormGroup = this.fb.group({}, { updateOn: 'submit' });
  @Output() formSubmitted = new EventEmitter<void>();

  constructor(private formService: FormService) { }

  ngOnInit(): void {
    if (this.form?.formControls) {
      let formGroup: any = {};

      this.form.formControls.forEach((control: IFormControl) => {
        if (!control.conditional) {
          const validators = this.buildValidators(control.validators || []);

          if (control.type === 'checkbox' && control.options) {
            const selectedValues = control.options
              .filter(option => option.selected)
              .map(option => option.value);
            formGroup[control.name] = this.fb.control(selectedValues, validators);
          } else {
            formGroup[control.name] = this.fb.control(control.value || '', validators);
          }
        }
      });

      this.dynamicForm = this.fb.group(formGroup);
      this.handleConditionalFields();
    }
  }

  private handleConditionalFields(): void {
    const allControls = this.form.formControls;

    // Per ogni controllo del form, osserva tutti i controlli da cui dipende
    allControls.forEach(control => {
      if (control.conditional) {
        const { dependsOn, valueEquals } = control.conditional;

        // Watch ALL valueChanges per evitare problemi di esistenza iniziale
        this.dynamicForm.valueChanges.subscribe(() => {
          const depControl = this.dynamicForm.get(dependsOn);
          const depValue = depControl?.value;
          const shouldBeVisible = depValue === valueEquals;
          const alreadyExists = !!this.dynamicForm.get(control.name);

          if (shouldBeVisible && !alreadyExists) {
            const validators = this.buildValidators(control.validators || []);
            this.dynamicForm.addControl(control.name, this.fb.control(control.value || '', validators));
            this.cdr.detectChanges(); // forza il re-render
          } else if (!shouldBeVisible && alreadyExists) {
            this.dynamicForm.removeControl(control.name);
            this.cdr.detectChanges(); // forza il re-render
          }
        });
      }
    });
  }

  private buildValidators(validators: IValidator[]): any[] {
    const controlValidators: any[] = [];
    validators.forEach(val => {
      if (val.validatorName === 'required') controlValidators.push(Validators.required);
      if (val.validatorName === 'email') controlValidators.push(Validators.email);
      if (val.validatorName === 'pattern') controlValidators.push(Validators.pattern(val.pattern as string));
      if (val.validatorName === 'minlength') controlValidators.push(Validators.minLength(val.minLength as number));
      if (val.validatorName === 'maxlength') controlValidators.push(Validators.maxLength(val.maxLength as number));
    });
    return controlValidators;
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      const data = this.dynamicForm.value;

      this.formService.sendFormData(data).subscribe({
        next: () => {
          this.formSubmitted.emit(); // Notifica il padre
          this.resetForm();
        },
        error: (err) => {
          console.error('Errore invio form', err);
        }
      });
    }
  }

  resetForm(): void {
    this.dynamicForm.reset();
    Object.keys(this.dynamicForm.controls).forEach(controlName => {
      const control = this.dynamicForm.get(controlName);
      control?.setErrors(null);
      control?.markAsUntouched();
    });
  }

  getValidationErrorMessage(control: IFormControl): string {
    const myControl = this.dynamicForm.get(control.name);
    let errorMessage = '';
    control.validators?.forEach((val) => {
      if (myControl?.hasError(val.validatorName as string)) {
        errorMessage = val.message as string;
      }
    });
    return errorMessage;
  }

  onCheckboxChange(controlName: string, optionValue: any, event: Event): void {
    const control = this.dynamicForm.get(controlName) as FormControl;
    const selectedValues: any[] = control.value || [];
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      if (!selectedValues.includes(optionValue)) {
        selectedValues.push(optionValue);
      }
    } else {
      const index = selectedValues.indexOf(optionValue);
      if (index > -1) {
        selectedValues.splice(index, 1);
      }
    }


    control.setValue(selectedValues);
    control.markAsTouched();
  }

  onRadioChange(controlName: string, optionValue: any): void {
    const control = this.dynamicForm.get(controlName) as FormControl;
    control.setValue(optionValue);
    control.markAsTouched();

    // Triggera un refresh del DOM
    this.renderTrigger$.next();
    this.cdr.detectChanges();
  }

  shouldRender(control: any): boolean {
    if (!control.conditional) {
      return true;
    }

    const { dependsOn, valueEquals } = control.conditional;
    const dependencyControl = this.dynamicForm.get(dependsOn);

    if (!dependencyControl) return false;

    return dependencyControl.value === valueEquals;
  }

  // get textCounter(): number {
  //   const description = this.dynamicForm.get('description')?.value;
  //   if (description) {
  //     return this.dynamicForm.get('description')?.value.length;
  //   } else {
  //     return 0;
  //   }
  // }
}
