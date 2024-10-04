import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ReportData } from 'src/app/models/select-report';
import { Column } from 'src/app/models/tree-table';
import { ReportsService } from 'src/app/services/reports.service';
import { SelectUsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent {
  columns:Column[] = [];
  items: ReportData[] = [];

  constructor(private userService:SelectUsersService){}

  async ngOnInit() {
    this.columns = [
      {field:'id',header:'Id'},
      {field:'name',header:'Nombre'},
      {field:'mail',header:'Correo'},
      {field:'phone',header:'Celular'},
      {field:'identification_number',header:'Numero Identificacion'},
      {field:'date',header:'Fecha Usuario'},
      {field:'cityName',header:'Ciudad'},
      {field:'documentType',header:'Tipo Documento'},
      {field:'total_points',header:'Puntos'},
      {field:'type',header:'Tipo'},
      {field:'cdlMasterlub',header:'Masterlub'},
    ]

    await this.getGrupos()
  }

  async getGrupos(){
    lastValueFrom(this.userService.getGroupUsers()).then(response =>{
      this.items = response.data
    })
  }
}
