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

  constructor(private pointService:PointsService,private messageServices:MessageService){}

  columns:Column[] = [];

  async ngOnInit() {
    this.columns = [
      {field:'id',header:'Id'},
      {field:'points',header:'Puntaje'},
      {field:'name',header:'Usuario'},
      {field:'date',header:'Fecha'},
    ]
    await this.getPoints(null)
  }

  async getPoints(nameOrPhone:any){
    let filter:any = null;
    if(nameOrPhone == null){
      filter = {}
    }
    lastValueFrom(this.pointService.getPoints(filter))
    .then(response => {
      this.items = response.data
    }).catch(response => {
      this.messageServices.add({ severity: 'error', summary: 'Error', detail: `error al ejecutar la peticion` });
    })
  }
}
