import { __values } from "tslib";
import { IForm } from "../interface/form.interface";

export const rsvpFormConfig: IForm = {
  formTitle: 'RSVP Form',
  saveBtnLabel: 'Invia',
  resetBtnLabel: 'Cancella',
  formControls: [
    {
      "name": "fullname",
      "label": "Nome e Cognome",
      "value": "",
      "placeholder": "",
      "class": "col-12",
      "type": "text",
      "validators": [{
        "validatorName": "required",
        "required": true,
        "message": "Il campo è obbligatorio"
      },
      {
        "validatorName": "minlength",
        "required": true,
        "message": "Il campo deve avere almeno 2 caratteri",
        "minLength": 2
      },
      ]
    },
    {
      "name": "menu",
      "label": "Menu",
      "placeholder": "",
      "class": "col-md-6",
      "type": "radio",
      "radioOptions": [
        "Vegano", "Vegetariano", "Onnivoro"],
      "validators": [{
        "validatorName": "required",
        "required": true,
        "message": "Il campo è obbligatorio"
      }]
    },
    {
      "name": "hasAllergies",
      "label": "Allergie/Intolleranze",
      "placeholder": "",
      "class": "col-md-6",
      "type": "radio",
      "radioOptions": [
        "Sì", "No"],
      "validators": [{
        "validatorName": "required",
        "required": true,
        "message": "Indicare se ci sono allergie o intolleranze è obbligatorio"
      }]
    },
    {
      "name": "allergies",
      "label": "Indica le allergie/intolleranze",
      "value": "",
      "placeholder": "",
      "class": "col-12",
      "type": "text",
      "validators": [{
        "validatorName": "required",
        "required": true,
        "message": "Il campo è obbligatorio"
      },
      {
        "validatorName": "minlength",
        "required": true,
        "message": "Il campo deve avere almeno 2 caratteri",
        "minLength": 2
      },
      ],
      "conditional": {
        "dependsOn": "hasAllergies",
        "valueEquals": "Sì"
      }
    },
    {
      "name": "hasPlusone",
      "label": "Plus One?",
      "placeholder": "",
      "class": "col-md-4",
      "type": "radio",
      "radioOptions": [
        "Sì", "No"],
      "validators": [{
        "validatorName": "required",
        "required": true,
        "message": "Indicare se ci sarà qualcuno ad accompagnarti è obbligatorio"
      }]
    },
    {
      "name": "fullnamePlusone",
      "label": "Nome e Cognome Plus One",
      "value": "",
      "placeholder": "",
      "class": "col-12",
      "type": "text",
      "validators": [{
        "validatorName": "required",
        "required": true,
        "message": "Il campo è obbligatorio"
      },
      {
        "validatorName": "minlength",
        "required": true,
        "message": "Il campo deve avere almeno 2 caratteri",
        "minLength": 2
      },
      ],
      "conditional": {
        "dependsOn": "hasPlusone",
        "valueEquals": "Sì"
      }
    },
    {
      "name": "menuPlusOne",
      "label": "Menu Plus One",
      "placeholder": "",
      "class": "col-md-6",
      "type": "radio",
      "radioOptions": [
        "Vegano", "Vegetariano", "Onnivoro"],
      "validators": [{
        "validatorName": "required",
        "required": true,
        "message": "Il campo è obbligatorio"
      }],
      "conditional": {
        "dependsOn": "hasPlusone",
        "valueEquals": "Sì"
      }
    },
    {
      "name": "plusOneHasAllergies",
      "label": "Allergie/Intolleranze del Plus One",
      "placeholder": "",
      "class": "col-md-4",
      "type": "radio",
      "radioOptions": [
        "Sì", "No"],
      "validators": [{
        "validatorName": "required",
        "required": true,
        "message": "Indicare se ci sono allergie o intolleranze è obbligatorio"
      }],
      "conditional": {
        "dependsOn": "hasPlusone",
        "valueEquals": "Sì"
      }
    },
    {
      "name": "plusoneAllergies",
      "label": "Indica le allergie/intolleranze del Plus One",
      "value": "",
      "placeholder": "",
      "class": "col-12",
      "type": "text",
      "validators": [{
        "validatorName": "required",
        "required": true,
        "message": "Il campo è obbligatorio"
      },
      {
        "validatorName": "minlength",
        "required": true,
        "message": "Il campo deve avere almeno 2 caratteri",
        "minLength": 2
      },
      ],
      "conditional": {
        "dependsOn": "plusOneHasAllergies",
        "valueEquals": "Sì"
      }
    },
    {
      "name": "message",
      "label": "Lascia un messaggio agli Sposi",
      "value": "",
      "placeholder": "",
      "class": "col-12",
      "type": "textarea",
      "validators": [
      ]
    },
  ]
};