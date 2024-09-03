import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { PointsData } from 'src/app/models/select-points';
import { Column } from 'src/app/models/tree-table';
import { PointsService } from 'src/app/services/points.service';


@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit{

  items: PointsData[] = [];

  constructor(private pointService: PointsService,private messageService:MessageService) {}

  columns:Column[] = [];

  visibleFilterPointsModal:boolean = false;
  valueNameOrPhone: any = null

  async ngOnInit() {
    this.columns = [
      {field:'id',header:'Id'},
      {field:'points',header:'Puntaje'},
      {field:'name',header:'Usuario'},
      {field:'locate',header:'Locación'},
      {field:'date',header:'Fecha'},
    ]
    await this.getPoints(null)
  }

  viewFilterModal(){
    this.visibleFilterPointsModal = true;
  }

  async getPoints(nameOrPhone:any){
    let filter:any = null;
    if(nameOrPhone == null){
      filter = {}
    }else{
      filter = {
        prmNameOrPhone:nameOrPhone
      }
    }
    lastValueFrom(this.pointService.getPoints(filter))
    .then(response => {
      this.items = response.data
    }).catch(response => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `error al ejecutar la peticion` });
    })
  }

  getFilterPoints(){
    if(this.valueNameOrPhone === null){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `debe ingresar un nombre o un número de teléfono.` });
       
    } else{
      this.getPoints(this.valueNameOrPhone).then(response => {
        this.visibleFilterPointsModal = false;
        this.messageService.add({ severity: 'success', summary: 'Consultado', detail: 'se consulto el puntaje con exito' });
      })
    }
  }

  reset(){
    let filter:any = null;
    lastValueFrom(this.pointService.getPoints(filter))
    .then(response => {
      this.items = response.data
    }).catch(response => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `error al ejecutar la peticion` });
    })
  }
}
