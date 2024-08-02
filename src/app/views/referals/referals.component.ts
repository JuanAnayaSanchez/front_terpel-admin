import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { ReferalsData } from 'src/app/models/select-referals';
import { Column } from 'src/app/models/tree-table';
import { ReferalsService } from 'src/app/services/referals.service';

@Component({
  selector: 'app-referals',
  templateUrl: './referals.component.html',
  styleUrls: ['./referals.component.css']
})
export class ReferalsComponent implements OnInit{

  items: ReferalsData[] = [];

  constructor(private referalsService:ReferalsService,private messageService:MessageService){}

  columns:Column[] = [];

  async ngOnInit() {
    this.columns = [
      {field:'id',header:'Id'},
      {field:'points',header:'Puntaje'},
      {field:'user_name',header:'Usuario'},
      {field:'referral_name',header:'Referido'},
      {field:'date',header:'Fecha'},
    ]
    await this.getReferals(null);
  }

  async getReferals(nameOrPhone:any){
    let filter:any = null;
    if(nameOrPhone == null){
      filter = {}
    }else{
      filter = {
        prmNameOrPhone:nameOrPhone
      }
    }
    lastValueFrom(this.referalsService.getReferals(filter))
    .then(resp => {
      this.items = resp.data;
    }).catch(resp => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `error al ejecutar la peticion` });
    })
  }
}
