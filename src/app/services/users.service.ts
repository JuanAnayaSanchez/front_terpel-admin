import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ApiResponse } from '../models/api-response';
import { DataSelectUsers } from '../models/select-users';
import {DataScoreReferrals} from '../models/select-score-referrals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectUsersService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://terpel.evirtual.live/mobil_API/';

  getUsers():Observable<ApiResponse<DataSelectUsers>>{
    return this.http.get<ApiResponse<DataSelectUsers>>(`${this.baseUrl}SelectUsers`)
  }

  getUserChildren(filter:any): Observable<ApiResponse<DataScoreReferrals[]>>{
    return this.http.post<ApiResponse<DataScoreReferrals[]>>(
      `${this.baseUrl}SelectScoreReferrals`,
      filter
    )
  }
}
