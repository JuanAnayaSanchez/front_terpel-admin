import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import {PointsData } from '../models/select-points';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(private http:HttpClient) { }
  baseUrl: string = environment.infoApi;

  getPoints(filter:any):Observable<ApiResponse<PointsData[]>>{
    return this.http.post<ApiResponse<PointsData[]>>(
      `${this.baseUrl}SelectScores`,
      filter
    )
  }
}
