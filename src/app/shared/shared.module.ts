import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
import { FormConfirmationComponent } from '../components/form-confirmation/form-confirmation.component';

const sharedModules = [
  CommonModule, RouterModule, DynamicFormComponent, RouterOutlet, FormConfirmationComponent
];

@NgModule({
  declarations: [],
  imports: [
    ...sharedModules
  ],
  exports: [
    ...sharedModules
  ]
})
export class SharedModule { }
