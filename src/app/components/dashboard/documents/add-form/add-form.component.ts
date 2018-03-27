import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AgentService} from '../../../../services/agent/agent.service';
import {User} from '../../../../models/User';
import {typeOfDocument} from '../../../../data/data';
import {units} from '../../../../data/data';
import {Agent} from '../../../../models/Agent';
import {AddFormUtils} from './add-form-utils';
import {Product} from '../../../../models/Product';
import {DocumentService} from '../../../../services/document/document.service';
import {DriverService} from '../../../../services/driver/driver.service';
import {Driver} from '../../../../models/Driver';
import {MatButton, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent /*implements OnChanges*/ {

  @Input()
  user = new User();

  typeOfDocument = typeOfDocument;
  units = units;
  allAgents: Agent[] = [];
  allDrivers: Driver[] = [];

  index_: number;
  document_id: number;
  elementOfType: any;

  firstStepGroup: FormGroup;
  secondStepGroup: FormGroup;
  thirdStepGroup: FormGroup;


  createdDocument = {id: null, name: '', type: '', date: ''};
  pageurl: Uint8Array;
  url: any[] = [];

  onLoad = false;

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private agentService: AgentService,
              private documentService: DocumentService,
              private driverService: DriverService) {

    this.driverService.getAllDrivers()
      .then(data => {
        for (const driver of data) {
          this.allDrivers.push(driver);
        }
      });

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
      driverId: '',
      agentId: ['', Validators.required],
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
      successButton: new FormControl()
    });

  }

  /*  rebuildSecondStep() {
      console.log(this.works.value);
      this.secondStepGroup.reset({
        driverId: this.driverId,
        agentId: this.agentId,
        products: this.fb.array([(
            this.fb.group({
              name: this.products.value.name,
              measure: this.products.value.measure,
              number: this.products.value.number,
              price: this.products.value.price,
              packageNumber: this.products.value.packageNumber,
              weight: this.products.value.weight,
              note: this.products.value.note
            })
          )]
        ),
        works: this.fb.array([(
            this.fb.group({
              name: this.works.value.name,
              price: this.works.value.price
            })
          )]
        )
      });
    }*/
  /* works: this.fb.array([(
   this.fb.group({
     name: '',
     price: ''
   })
 )])
   this.setAddresses(this.hero.addresses);*/


  /*  ngOnChanges() {
      this.rebuildSecondStep();
    }*/

  get products(): FormArray {
    return this.secondStepGroup.get('products') as FormArray;
  }

  get agentId(): FormControl {
    return this.secondStepGroup.get('agentId') as FormControl;
  }

  get works(): FormArray {
    return this.secondStepGroup.get('works') as FormArray;
  }

  get driverId(): FormControl {
    return this.secondStepGroup.get('driverId') as FormControl;
  }

  removeItemById(i: number, array: FormArray) {
    array.removeAt(i);
  }

  searchTypeById() {
    this.firstStepGroup.get('elementOfType').setValue('');
    const nameControl = this.firstStepGroup.get('typeOfDocument');
    this.index_ = nameControl.value;
    const elementOfArray = this.typeOfDocument.find(i => i.id == nameControl.value);
    this.elementOfType = elementOfArray;
  }

  searchElementOfTypeById() {
    this.agentId.setValue('');

    AddFormUtils.resetDriverInformation(this.driverId);

    AddFormUtils.clearAllItems(this.products);
    AddFormUtils.clearAllItems(this.works);

    AddFormUtils.resetValidation(this.products, this.works);
    AddFormUtils.resetValues(this.products, this.works);

    for (let i = 0; i < this.products.length; i++) {
      this.products.controls[i].get('packageNumber').setValue('');
      this.products.controls[i].get('weight').setValue('');
    }

    const nameControl = this.firstStepGroup.get('elementOfType');
    this.document_id = nameControl.value.id;
    switch (this.document_id) {
      case 1:
        AddFormUtils.resetValuesOfProducts(this.products);
        AddFormUtils.addValidationOfProducts(this.products);

        this.driverId.setValidators(Validators.required);
        this.driverId.setValue('');

        for (let i = 0; i < this.products.length; i++) {
          this.products.controls[i].get('packageNumber').setValue('');
          this.products.controls[i].get('weight').setValue('');

          this.products.controls[i].get('packageNumber').setValidators(Validators.required);
          this.products.controls[i].get('weight').setValidators(Validators.required);
        }
        break;
      case 2:
        AddFormUtils.resetDriverInformation(this.driverId);

        AddFormUtils.resetValuesOfProducts(this.products);
        AddFormUtils.addValidationOfProducts(this.products);
        break;
      case 3:
        AddFormUtils.resetDriverInformation(this.driverId);

        AddFormUtils.resetValuesOfWorks(this.works);
        AddFormUtils.addValidationOfWorks(this.works);
        break;
      case 4:
        AddFormUtils.resetDriverInformation(this.driverId);

        AddFormUtils.resetValuesOfProducts(this.products);
        AddFormUtils.addValidationOfProducts(this.products);
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

  addNewDocument() {
    switch (this.document_id) {
      case 1:
        this.documentService.addDocumentTTN(this.agentId.value, this.driverId.value, this.products.value)
          .then(data => {
            if (data) {
              this.createdDocument = data;
              this.showDocumentInPdf();
            }
          })
          .catch(err => {
            console.log(err);
          });
        break;
      case 2:
        const saveArrayOfProducts: Product[] = [];
        for (let i = 0; i < this.secondStepGroup.value.products.length; i++) {
          const product = new Product();
          product.name = this.secondStepGroup.value.products[i].name;
          product.measure = this.secondStepGroup.value.products[i].measure;
          product.number = this.secondStepGroup.value.products[i].number;
          product.price = this.secondStepGroup.value.products[i].price;
          product.note = this.secondStepGroup.value.products[i].note;

          saveArrayOfProducts.push(product);
        }
        this.documentService.addDocumentTN(this.agentId.value, saveArrayOfProducts)
          .then(data => {
            if (data) {
              this.createdDocument = data;
              this.showDocumentInPdf();
            }
          })
          .catch(err => {
            console.log(err);
          });
        break;
      case 3:
        this.documentService.addDocumentASPR(this.agentId.value, this.works.value)
          .then(data => {
            if (data) {
              this.createdDocument = data;
              this.showDocumentInPdf();
            }
          })
          .catch(err => {
            console.log(err);
          });
        break;
      case 4:
        this.documentService.addDocumentTN(this.agentId.value, this.products.value)
          .then(data => {
            if (data) {
              this.createdDocument = data;
              this.showDocumentInPdf();
            }
          });
        break;
      default:
        alert('Problems');
    }
  }

  downloadDocumentInPdf() {
    this.documentService.getDocumentByIdInPDF(this.createdDocument.id, this.createdDocument.name, this.createdDocument.type)
      .then(data => {
        /*
                this.pageurl = data;
        */
        console.log(data);
      })
      .catch(err => console.log(err));
  }

  showDocumentInPng() {
    this.documentService.showDocumentInPng(this.createdDocument.id, this.createdDocument.name, this.createdDocument.type)
      .then(res => {
        console.log(res);
        this.url.push('data:image/png;base64,' + res);
      })
      .catch(err => err.toString());
  }

  showDocumentInPdf() {
    this.onLoad = true;
    this.documentService.showDocumentInPdf(this.createdDocument.id, this.createdDocument.name, this.createdDocument.type)
      .then(res => {
        this.pageurl = res;
        this.onLoad = false;
        this.snackBar.open('Файл успешно создан', 'Закрыть', {
          duration: 3000
        });

      })
      .catch(err => err.toString());
  }


  onSubmit() {
    /*
        this.rebuildSecondStep();
    */
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
