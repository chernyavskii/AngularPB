import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Agent} from '../../../../models/Agent';
import {AgentService} from '../../../../services/agent/agent.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-delete-agent',
  templateUrl: './delete-agent.component.html',
  styleUrls: ['./delete-agent.component.css']
})
export class DeleteAgentComponent implements OnChanges {
  @Input()
  agents: Agent[] = [];

  @Output() deleteArray = new EventEmitter<any>();
  @Output() deleteArrayAdmin = new EventEmitter<any>();

  constructor(private agentService: AgentService,
              private snackBar: MatSnackBar) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.agents) {
      this.agentService.deleteAllAgents(this.agents)
        .then(data => {
          this.deleteArray.emit(data);
          this.deleteArrayAdmin.emit(data);
          this.snackBar.open('Удаление успешно выполнено', 'Закрыть', {
            duration: 3000
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
