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
  valueNameOrPhone: any = null;
  viewFilter:boolean = false;

  async ngOnInit() {
    this.columns = [
      {field:'id',header:'Id'},
      {field:'points',header:'Puntaje'},
      {field:'user_name',header:'Usuario'},
      {field:'referral_name',header:'Referido'},
      {field:'locate',header:'Locación'},
      {field:'date',header:'Fecha'},
    ]
    await this.getReferals(null);
  }

  async reset(){
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

  viewFilterModal(){
    this.viewFilter = true;
  }

  async getFilterPoints(){
    if(this.valueNameOrPhone == null){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `debe ingresar un nombre o un número de teléfono.` });
    }else{
      this.getReferals(this.valueNameOrPhone);
      this.valueNameOrPhone = null;
      this.viewFilter = false;
    }
  }
}
