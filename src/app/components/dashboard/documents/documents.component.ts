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

  @Input()
  user = new User();

  ngOnInit() {
  }

}
