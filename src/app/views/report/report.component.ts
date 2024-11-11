import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ReportData } from 'src/app/models/select-report';
import { Column } from 'src/app/models/tree-table';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  columns:Column[] = [];
  items: ReportData[] = [];

  constructor(private reportsService:ReportsService){}

  async ngOnInit() {
    this.columns = [
      {field:'id',header:'Id'},
      {field:'name',header:'Nombre'},
      {field:'mail',header:'Correo'},
      {field:'phone',header:'Celular'},
      {field:'identification_number',header:'Numero Identificacion'},
      {field:'userDate',header:'Fecha Usuario'},
      {field:'cityName',header:'Ciudad'},
      {field:'documentType',header:'Tipo Documento'},
      {field:'code',header:'Codigo'},
      {field:'codeDate',header:'Fecha Redimido'},
      {field:'codeRegistered',header:'Estado Registro Codigo'},
      {field:'codeRegisteredLocate',header:'Locacion Registro Codigo'},
      {field:'Type',header:'Tipo'},
      {field:'scorePoints',header:'Puntaje'},
      {field:'scoreDate',header:'Fecha Puntaje'},
      {field:'scoreLocate',header:'Punto de Venta'},
      {field:'invoiceName',header:'Factura'},
      {field:'codeRegistered',header:'Codigo Registrado'}
    ]

    await this.getReports()
  }

  async getReports(){
    lastValueFrom(this.reportsService.getReport()).then(response =>{
      this.items = response.data
    })
  }
}
