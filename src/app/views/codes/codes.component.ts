import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { CodesData } from 'src/app/models/select-codes';
import { CodesService } from 'src/app/services/codes.service';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css']
})
export class CodesComponent implements OnInit {
  codes: CodesData[] = [];

  first = 0;

  rows = 10;
  valueCodeGenerate: number = 0;
  visible: boolean = false;

  constructor(private codesService:CodesService, private messageServices:MessageService) {}

  async ngOnInit() {
    await this.getCodes()
  }

  async getCodes(){
    this.codesService.getCodes().subscribe(response => {
      this.codes = response.data.data;
    });
  }

  next() {
      this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  async reset() {
    await this.getCodes();
    this.first = 0;
  }

  pageChange(event:any) {
      this.first = event.first;
      this.rows = event.rows;
  }

  isLastPage(): boolean {
      return this.codes ? this.first === this.codes.length - this.rows : true;
  }

  isFirstPage(): boolean {
      return this.codes ? this.first === 0 : true;
  }

  showDialog() {
    this.visible = true;
  }

  async createCodes(){
    lastValueFrom(this.codesService.createCodes(this.valueCodeGenerate))
    .then(response => {
      if(response.data){
        this.getCodes();
        this.valueCodeGenerate = 0;
        this.messageServices.add({ severity: 'success', summary: 'Creado', detail: 'se crearon los codigos con exito' });
        this.visible = false;
      }
    })
  }

  async deleteCode(id:number,name:string){
    lastValueFrom(this.codesService.deleteCode(id))
    .then(response => {
      this.getCodes()
      this.messageServices.add({ severity: 'success', summary: 'Eliminado', detail: `se elimino el codigos ${name}` });
    })
  }
}
