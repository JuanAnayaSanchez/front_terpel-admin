import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class SegurityService {
  private baseUrl = environment.segurityApi;
  constructor(private http: HttpClient) { }

  login(username:string,password:string):Observable<ApiResponse<string>>{
    const body:any = {
      username_input:username,
      password_input:password
    }
    return this.http.post<ApiResponse<string>>(`${this.baseUrl}CreateToken`,body)
  }
}
