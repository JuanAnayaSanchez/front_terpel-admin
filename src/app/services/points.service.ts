import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import {PointsData } from '../models/select-points';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(private http:HttpClient) { }
  baseUrl: string = 'https://terpel.evirtual.live/mobil_API/';

  getPoints(filter:any):Observable<ApiResponse<PointsData[]>>{
    return this.http.post<ApiResponse<PointsData[]>>(
      `${this.baseUrl}SelectScores`,
      filter
    )
  }
}
