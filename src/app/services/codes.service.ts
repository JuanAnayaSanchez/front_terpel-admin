import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { DataSelectCodes, DataCodeGenerate, DataCodeDelete } from '../models/select-codes';

@Injectable({
  providedIn: 'root'
})
export class CodesService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://terpel.evirtual.live/mobil_API/';

  getCodes():Observable<ApiResponse<DataSelectCodes>>{
    return this.http.get<ApiResponse<DataSelectCodes>>(`${this.baseUrl}SelectCodes`)
  }

  createCodes(codeNumbers:number):Observable<ApiResponse<boolean>>{
    const body:DataCodeGenerate = {
      prmnumber_codes:codeNumbers
    }
    return this.http.post<ApiResponse<boolean>>(`${this.baseUrl}InsertCodes`,body)
  }

  deleteCode(Id:number):Observable<ApiResponse<boolean>>{
    const body:DataCodeDelete = {
      prmCodeId:Id
    }
    return this.http.post<ApiResponse<boolean>>(`${this.baseUrl}DeleteCode`,body)
  }

  deleteAllCodes():Observable<ApiResponse<boolean>>{
    return this.http.get<ApiResponse<boolean>>(`${this.baseUrl}DeleteAllCodes`)
  }
}
