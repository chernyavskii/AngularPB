import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/User';
import {Document} from '../../../models/Document';
import {Product} from '../../../models/Product';

import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DocumentService} from '../../../services/document/document.service';
import {AgentService} from '../../../services/agent/agent.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  pokemonControl = new FormControl();
  agent_id: number;
  typeDocument = [
    {value: 'value1', viewValue: 'Строгая отчетность'},
    {value: 'value2', viewValue: 'Нестрогая отчетность'}
  ];

  pokemonGroups = [
    {
      name: 'Масса',
      pokemon: [
        { value: 'кг', viewValue: 'килограмм' },
        { value: 'г', viewValue: 'грамм' },
        { value: 'т', viewValue: 'тонна' }
      ]
    },
    {
      name: 'Температура',
      pokemon: [
        { value: 'squirtle-3', viewValue: 'Squirtle' },
        { value: 'psyduck-4', viewValue: 'Psyduck' },
        { value: 'horsea-5', viewValue: 'Horsea' }
      ]
    },
    {
      name: 'Расстояние',
      disabled: true,
      pokemon: [
        { value: 'charmander-6', viewValue: 'Charmander' },
        { value: 'vulpix-7', viewValue: 'Vulpix' },
        { value: 'flareon-8', viewValue: 'Flareon' }
      ]
    },
    {
      name: 'Площадь',
      pokemon: [
        { value: 'mew-9', viewValue: 'Mew' },
        { value: 'mewtwo-10', viewValue: 'Mewtwo' },
      ]
    },
    {
      name: 'Объём',
      pokemon: [
        { value: 'mew-9', viewValue: 'Mew' },
        { value: 'mewtwo-10', viewValue: 'Mewtwo' },
      ]
    }
  ];

  allAgents = [];
  @Input()
  user = new User();
  firstFormGroup: FormGroup;
  pageurl: Uint8Array;
  document = new Document();
  product = new Product();

  constructor(private _formBuilder: FormBuilder,
              private documentService: DocumentService,
              private agentService: AgentService) {
    this.agentService.getAllAgents()
      .then(data => {
        for (let agent of data) {
          this.allAgents.push(agent);
        }
      })
      .catch(err => {console.log(err); });
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
  }

  testFunc(agent_id: number) {
    const saveProduct: Product[] = [{
      name: this.firstFormGroup.value.name,
      measure: this.firstFormGroup.value.measure,
      number: this.firstFormGroup.value.number,
      price: this.firstFormGroup.value.price,
      packageNumber: null,
      weight: null,
      note: this.firstFormGroup.value.note
    }];

    this.documentService.addDocumentTN(this.firstFormGroup.value.agent_id, saveProduct)
      .then(data => {console.log(data); })
      .catch(err => {console.log(err); });
  }

  savePdf() {
    this.documentService.getDocumentByIdInPDF(11, 'tn (15.03.2018 03.31.42)', 'xls');
  }
  print() {
    this.documentService.printDocument(11, 'tn (15.03.2018 03.31.42)', 'xls');
  }

  showDocumentInPdf() {
    this.documentService.showDocumentInPdf(11, 'tn (15.03.2018 03.31.42)', 'xls')
      .then(res => { this.pageurl = res; })
      .catch(err => err.toString());
  }

}
