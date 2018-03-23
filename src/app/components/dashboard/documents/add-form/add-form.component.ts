import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {AgentService} from '../../../../services/agent/agent.service';
import {User} from '../../../../models/User';
import {typeOfDocument} from '../../../../data/data';
import {units} from '../../../../data/data';
import {Agent} from '../../../../models/Agent';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  @Input()
  user = new User();
  typeOfDocument = typeOfDocument;
  units = units;
  elementOfType: any;
  index_: number;

  firstStepGroup: FormGroup;
  secondStepGroup: FormGroup;

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
      typeOfDocument: '',
      elementOfType: '',
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
      )
    });
  }

  ngOnInit() {
  }

  get products(): FormArray {
    return this.secondStepGroup.get('products') as FormArray;
  }

  searchTypeById() {
    const nameControl = this.firstStepGroup.get('typeOfDocument');
    this.index_ = nameControl.value;
    const elementOfArray = this.typeOfDocument.find(i => i.id == nameControl.value);
    this.elementOfType = elementOfArray;
  }

  addProduct() {
    this.products.push(this.fb.group({
        name: '',
        measure: '',
        number: '',
        price: '',
        packageNumber: '',
        weight: '',
        note: ''
      }
    ));
  }

  removeProduct(i: number) {
    this.products.removeAt(i);
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
