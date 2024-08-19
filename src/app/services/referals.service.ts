import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { ReferalsData } from '../models/select-referals';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReferalsService {

  constructor(private http:HttpClient) { }
  baseUrl: string = environment.infoApi;

  getReferals(filter:any):Observable<ApiResponse<ReferalsData[]>>{
    return this.http.post<ApiResponse<ReferalsData[]>>(
      `${this.baseUrl}SelectReferrals`,
      filter
    )
  }
}
