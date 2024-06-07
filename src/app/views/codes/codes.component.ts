import { Component, OnInit } from '@angular/core';
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
  valueCodeGenerate: number | undefined;
  visible: boolean = false;

  constructor(private codesService:CodesService) {}

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

  createCodes(){
    console.log(this.valueCodeGenerate);
  }
}
