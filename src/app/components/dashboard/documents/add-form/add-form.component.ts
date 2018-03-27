'use strict';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormControl, NgForm, Validators} from '@angular/forms';
import {AgentService} from '../../../../services/agent/agent.service';
import {User} from '../../../../models/User';
import {typeOfDocument} from '../../../../data/data';
import {units} from '../../../../data/data';
import {Agent} from '../../../../models/Agent';
import {MatSelect, MatStep, MatStepper} from '@angular/material';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent {
  @Input()
  user = new User();

  typeOfDocument = typeOfDocument;
  units = units;

  index_: number;
  document_id: number;
  elementOfType: any;

  firstStepGroup: FormGroup;
  secondStepGroup: FormGroup;
  thirdStepGroup: FormGroup;

  allAgents: Agent[] = [];

  constructor(private fb: FormBuilder,
              private agentService: AgentService) {
    this.agentService.getAllAgents()
      .then(data => {
        for (const agent of data) {
          this.allAgents.push(agent);
        }
      })
      .catch(err => {
        console.log(err);
      });

    this.firstStepGroup = this.fb.group({
      typeOfDocument: ['', Validators.required],
      elementOfType: ['', Validators.required]
    });

    this.secondStepGroup = this.fb.group({
      agentId: '',
      products: this.fb.array([(
        this.fb.group({
            name: '',
            measure: '',
            number: '',
            price: '',
            packageNumber: '',
            weight: '',
            note: ''
          }
        ))]
      ),
      works: this.fb.array([(
        this.fb.group({
          name: '',
          price: ''
        })
      )])
    });

    this.thirdStepGroup = this.fb.group({
      testContr: ''
    });

  }

  get products(): FormArray {
    return this.secondStepGroup.get('products') as FormArray;
  }

  get works(): FormArray {
    return this.secondStepGroup.get('works') as FormArray;
  }

  searchTypeById() {
    this.firstStepGroup.get('elementOfType').setValue('');
    const nameControl = this.firstStepGroup.get('typeOfDocument');
    this.index_ = nameControl.value;
    const elementOfArray = this.typeOfDocument.find(i => i.id == nameControl.value);
    this.elementOfType = elementOfArray;
  }

  resetValidationOfProducts(array: FormArray) {
    for (let i = 0; i < array.length; i++) {
      array.controls[i].get('name').setValidators(Validators.nullValidator);
      array.controls[i].get('name').setValidators(Validators.nullValidator);
      array.controls[i].get('measure').setValidators(Validators.nullValidator);
      array.controls[i].get('number').setValidators(Validators.nullValidator);
      array.controls[i].get('price').setValidators(Validators.nullValidator);
     // array.controls[i].get('packageNumber').setValidators(Validators.nullValidator);
     // array.controls[i].get('weight').setValidators(Validators.nullValidator);
      array.controls[i].get('note').setValidators(Validators.nullValidator);
    }
  }

  resetValidationOfWorks(array: FormArray) {
    for (let i = 0; i < array.length; i++) {
      array.controls[i].get('name').setValidators(Validators.nullValidator);
      array.controls[i].get('price').setValidators(Validators.nullValidator);
    }
  }

  addValidationOfProducts(array: FormArray) {
    for (let i = 0; i < array.length; i++) {
      array.controls[i].get('name').setValidators(Validators.required);
      array.controls[i].get('name').setValidators(Validators.required);
      array.controls[i].get('measure').setValidators(Validators.required);
      array.controls[i].get('number').setValidators(Validators.required);
      array.controls[i].get('price').setValidators(Validators.required);
      // array.controls[i].get('packageNumber').setValidators(Validators.nullValidator);
      // array.controls[i].get('weight').setValidators(Validators.nullValidator);
      array.controls[i].get('note').setValidators(Validators.required);
    }
  }

  addValidationOfWorks(array: FormArray) {
    for (let i = 0; i < array.length; i++) {
      array.controls[i].get('name').setValidators(Validators.required);
      array.controls[i].get('price').setValidators(Validators.required);
    }
  }

  resetValuesOfProducts(array: FormArray) {
    for (let i = 0; i < array.length; i++) {
      array.controls[i].get('name').setValue('');
      array.controls[i].get('measure').setValue('');
      array.controls[i].get('number').setValue('');
      array.controls[i].get('price').setValue('');
     // array.controls[i].get('packageNumber').setValue('');
     // array.controls[i].get('weight').setValue('');
      array.controls[i].get('note').setValue('');
    }
  }

  resetValuesOfWorks(array: FormArray) {
    for (let i = 0; i < array.length; i++) {
      array.controls[i].get('name').setValue('');
      array.controls[i].get('price').setValue('');
    }
  }

  searchElementOfTypeById() {
    /*for (let i = 0; i < this.products.length; i++) {
     this.products.controls[i].get('name').setValue('');
     this.products.controls[i].get('name').setValidators(Validators.nullValidator);
     this.products.controls[i].get('measure').setValidators(Validators.nullValidator);
     this.products.controls[i].get('number').setValidators(Validators.nullValidator);
     this.products.controls[i].get('price').setValidators(Validators.nullValidator);
     this.products.controls[i].get('packageNumber').setValidators(Validators.nullValidator);
     this.products.controls[i].get('weight').setValidators(Validators.nullValidator);
     this.products.controls[i].get('note').setValidators(Validators.nullValidator);

     this.products.controls[i].get('name').setValue('');
     this.products.controls[i].get('measure').setValue('');
     this.products.controls[i].get('number').setValue('');
     this.products.controls[i].get('price').setValue('');
     this.products.controls[i].get('packageNumber').setValue('');
     this.products.controls[i].get('weight').setValue('');
     this.products.controls[i].get('note').setValue('');
     }*/

    /*for (let i = 0; i < this.works.length; i++) {
     this.works.controls[i].get('name').setValidators(Validators.nullValidator);
     this.works.controls[i].get('price').setValidators(Validators.nullValidator);

     this.works.controls[i].get('name').setValue('');
     this.works.controls[i].get('price').setValue('');
     }*/

/* code */
    this.clearAllItems(this.products);
    this.clearAllItems(this.works);

    this.resetValidationOfProducts(this.products);
    this.resetValuesOfProducts(this.products);

    this.resetValidationOfWorks(this.works);
    this.resetValuesOfWorks(this.works);

    for (let i = 0; i < this.products.length; i++) {
      this.products.controls[i].get('packageNumber').setValue('');
      this.products.controls[i].get('weight').setValue('');

      this.products.controls[i].get('packageNumber').setValidators(Validators.nullValidator);
      this.products.controls[i].get('weight').setValidators(Validators.nullValidator);
    }

    const nameControl = this.firstStepGroup.get('elementOfType');
    this.document_id = nameControl.value.id;
    switch (this.document_id) {
      case 1:
        this.resetValuesOfProducts(this.products);
        this.addValidationOfProducts(this.products);
        for (let i = 0; i < this.products.length; i++) {
          this.products.controls[i].get('packageNumber').setValue('');
          this.products.controls[i].get('weight').setValue('');

          this.products.controls[i].get('packageNumber').setValidators(Validators.required);
          this.products.controls[i].get('weight').setValidators(Validators.required);
        }
       /* for (let i = 0; i < this.products.length; i++) {
          this.products.controls[i].get('name').setValue('');
          this.products.controls[i].get('measure').setValue('');
          this.products.controls[i].get('number').setValue('');
          this.products.controls[i].get('price').setValue('');
          this.products.controls[i].get('packageNumber').setValue('');
          this.products.controls[i].get('weight').setValue('');
          this.products.controls[i].get('note').setValue('');

          this.products.controls[i].get('name').setValidators(Validators.required);
          this.products.controls[i].get('measure').setValidators(Validators.required);
          this.products.controls[i].get('number').setValidators(Validators.required);
          this.products.controls[i].get('price').setValidators(Validators.required);
          this.products.controls[i].get('packageNumber').setValidators(Validators.required);
          this.products.controls[i].get('weight').setValidators(Validators.required);
          this.products.controls[i].get('note').setValidators(Validators.required);
        }*/
        break;
      case 2:
        this.resetValuesOfProducts(this.products);
        this.addValidationOfProducts(this.products);
        /*for (let i = 0; i < this.products.length; i++) {
          this.products.controls[i].get('name').setValue('');
          this.products.controls[i].get('measure').setValue('');
          this.products.controls[i].get('number').setValue('');
          this.products.controls[i].get('price').setValue('');
          this.products.controls[i].get('note').setValue('');

          this.products.controls[i].get('name').setValidators(Validators.required);
          this.products.controls[i].get('measure').setValidators(Validators.required);
          this.products.controls[i].get('number').setValidators(Validators.required);
          this.products.controls[i].get('price').setValidators(Validators.required);
          this.products.controls[i].get('note').setValidators(Validators.required);
        }*/
        break;
      case 3:
        this.resetValuesOfWorks(this.works);
        this.addValidationOfWorks(this.works);
        /*for (let i = 0; i < this.works.length; i++) {
          this.works.controls[i].get('name').setValue('');
          this.works.controls[i].get('price').setValue('');

          this.works.controls[i].get('name').setValidators(Validators.required);
          this.works.controls[i].get('price').setValidators(Validators.required);
        }*/
        break;
      case 4:
        this.resetValuesOfProducts(this.products);
        this.addValidationOfProducts(this.products);
        /*for (let i = 0; i < this.products.length; i++) {
          this.products.controls[i].get('name').setValue('');
          this.products.controls[i].get('measure').setValue('');
          this.products.controls[i].get('number').setValue('');
          this.products.controls[i].get('price').setValue('');
          this.products.controls[i].get('note').setValue('');

          this.products.controls[i].get('name').setValidators(Validators.required);
          this.products.controls[i].get('measure').setValidators(Validators.required);
          this.products.controls[i].get('number').setValidators(Validators.required);
          this.products.controls[i].get('price').setValidators(Validators.required);
          this.products.controls[i].get('note').setValidators(Validators.required);
        }*/
        break;
      default:
        alert('Problems');
    }
  }

  addProduct() {
    switch (this.document_id) {
      case 1:
        this.products.push(this.fb.group({
            name: ['', Validators.required],
            measure: ['', Validators.required],
            number: ['', Validators.required],
            price: ['', Validators.required],
            packageNumber: ['', Validators.required],
            weight: ['', Validators.required],
            note: ['', Validators.required]
          }
        ));
        break;
      case 2:
        this.products.push(this.fb.group({
            name: ['', Validators.required],
            measure: ['', Validators.required],
            number: ['', Validators.required],
            price: ['', Validators.required],
            packageNumber: ['', Validators.nullValidator],
            weight: ['', Validators.nullValidator],
            note: ['', Validators.required]
          }
        ));
        break;
      case 4:
        this.products.push(this.fb.group({
            name: ['', Validators.required],
            measure: ['', Validators.required],
            number: ['', Validators.required],
            price: ['', Validators.required],
            packageNumber: ['', Validators.nullValidator],
            weight: ['', Validators.nullValidator],
            note: ['', Validators.required]
          }
        ));
        break;
      default:
        alert('Problems');
    }
  }

  addWork() {
    this.works.push(this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required]
    }));
  }

  removeItemById(i: number, array: FormArray) {
    array.removeAt(i);
  }

  clearAllItems(array: FormArray) {
    while (array.length !== 1) {
      array.removeAt(0);
    }
  }



  /*  allAgents = [];
   agent_id: number;
   typeOfDocument_id: number;
   typeOfStrictDocument_id: number;
   typeOfNotStrictDocument_id: number;
   units_ = units;
   typeOfDocument_ = typeOfDocument;
   /!*  typeOfStrictReportingDocument_ = typeOfStrictReportingDocument;
   typeOfNotStrictReportingDocument_ = typeOfNotStrictReportingDocument;*!/
   pageurl: Uint8Array;
   product = new Product();
   unitsControl = new FormControl();
   firstFormGroup: FormGroup;
   initFormGroup: FormGroup;
   onSelect = false;
   selected: string;
   secondBlockCheck = false;
   secondBlockStrictCheck = false;
   secondBlockNotStrictCheck = false;
   createdDocument = {id: null, name: '', type: '', date: ''};
   constructor(private _formBuilder: FormBuilder,
   private documentService: DocumentService,
   private agentService: AgentService) {
   this.agentService.getAllAgents()
   .then(data => {
   for (let agent of data) {
   this.allAgents.push(agent);
   }
   })
   .catch(err => {
   console.log(err);
   });
   }
   ngOnInit() {
   this.firstFormGroup = this._formBuilder.group({
   name: this.product.name,
   measure: this.product.measure,
   number: this.product.number,
   price: this.product.price,
   note: this.product.note,
   agent_id: this.agent_id
   });
   this.initFormGroup = this._formBuilder.group({
   typeOfDocument_id: this.typeOfDocument_id,
   typeOfStrictDocument: this.typeOfStrictDocument_id,
   typeOfNotStrictDocument_id: this.typeOfNotStrictDocument_id
   });
   }
   addDocumentTN() {
   const saveProduct: Product[] = [{
   name: this.firstFormGroup.value.name,
   measure: this.unitsControl.value,
   number: this.firstFormGroup.value.number,
   price: this.firstFormGroup.value.price,
   packageNumber: null,
   weight: null,
   note: this.firstFormGroup.value.note
   }];
   this.documentService.addDocumentTN(this.firstFormGroup.value.agent_id, saveProduct)
   .then(data => {
   this.createdDocument = data;
   this.onSelect = true;
   })
   .catch(err => {
   console.log(err);
   });
   }
   saveDocumentInPdf() {
   this.documentService.getDocumentByIdInPDF(this.createdDocument.id, this.createdDocument.name, this.createdDocument.type);
   }
   printDocument() {
   this.documentService.printDocument(this.createdDocument.id, this.createdDocument.name, this.createdDocument.type);
   }
   showDocumentInPdf() {
   this.documentService.showDocumentInPdf(this.createdDocument.id, this.createdDocument.name, this.createdDocument.type)
   .then(res => {
   this.pageurl = res;
   })
   .catch(err => err.toString());
   }
   checkTypeOfDocument(event: MatOptionSelectionChange) {
   this.secondBlockCheck = true;
   if (event.source.value === 0) {
   this.secondBlockStrictCheck = true;
   this.secondBlockNotStrictCheck = false;
   }
   if (event.source.value === 1) {
   this.secondBlockNotStrictCheck = true;
   this.secondBlockStrictCheck = false;
   }
   }*/
}
