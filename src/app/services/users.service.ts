import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ApiResponse } from '../models/api-response';
import { DataSelectUsers, UserGroupData } from '../models/select-users';
import {DataScoreReferrals} from '../models/select-score-referrals';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SelectUsersService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.infoApi;

  getUsers():Observable<ApiResponse<DataSelectUsers>>{
    return this.http.get<ApiResponse<DataSelectUsers>>(`${this.baseUrl}SelectUsers`)
  }

  getUserChildren(filter:any): Observable<ApiResponse<DataScoreReferrals[]>>{
    return this.http.post<ApiResponse<DataScoreReferrals[]>>(
      `${this.baseUrl}SelectScoreReferrals`,
      filter
    )
  }

  getGroupUsers():Observable<ApiResponse<UserGroupData[]>>{
    return this.http.get<ApiResponse<UserGroupData[]>>(
      `${this.baseUrl}SelectGroupUsers`
    )
  }
}
