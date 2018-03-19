import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Document} from '../../../../models/Document';
import {AgentService} from '../../../../services/agent/agent.service';
import {Product} from '../../../../models/Product';
import {DocumentService} from '../../../../services/document/document.service';
import {User} from '../../../../models/User';
import {units} from '../../../../data/data';
import {typeOfDocument} from '../../../../data/data';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  @Input()
  user = new User();
  allAgents = [];
  agent_id: number;
  typeOfDocument_id: number;
  units_ = units;
  typeOfDocument_ = typeOfDocument;
  pageurl: Uint8Array;
  product = new Product();
  unitsControl = new FormControl();
  firstFormGroup: FormGroup;
  initFormGroup: FormGroup;
  onSelect = false;

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
      typeOfDocument_id: this.typeOfDocument_id
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
}