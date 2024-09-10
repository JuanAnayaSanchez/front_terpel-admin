import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ApiResponse } from '../models/api-response';
import { ReportData } from '../models/select-report';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private baseUrl = environment.infoApi;
  constructor(private http:HttpClient){}

  getReport():Observable<ApiResponse<ReportData[]>>{
    return this.http.get<ApiResponse<ReportData[]>>(`${this.baseUrl}SelectReport`)
  }
}
