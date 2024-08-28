import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ApiResponse } from '../models/api-response';
import { Router } from '@angular/router';
import { TokenDecode } from '../models/token-response';

@Injectable({
  providedIn: 'root'
})
export class SegurityService {
  private baseUrl = environment.segurityApi;
  constructor(private http: HttpClient,private router:Router) { }

  login(username:string,password:string):Observable<ApiResponse<string>>{
    const body:any = {
      username_input:username,
      password_input:password
    }
    return this.http.post<ApiResponse<string>>(`${this.baseUrl}CreateToken`,body)
  }

  validateToken(token: string): Observable<ApiResponse<TokenDecode>> {
    const body = {
      'Authorization_input': `Bearer ${token}`
    };
  
    return this.http.post<ApiResponse<TokenDecode>>(`${this.baseUrl}ValidateLogin`, body);
  }

  public setSession(authResult:any):void{
    sessionStorage.setItem('id_token',authResult);
    const expiresAt = new Date().getTime() + 10 * 60 * 1000;
    sessionStorage.setItem('expires_at', JSON.stringify(expiresAt));
  }

  public isLoggedIn(): boolean {
    const expiresAt = JSON.parse(sessionStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public async loginGuard(){
    const expiresAt = Date.parse(sessionStorage.getItem('expires_at') || '{}');
    const expiresBool = (new Date().getTime() < expiresAt) ? false : true;
    const tokenLocal = sessionStorage.getItem('id_token') || '{}';
    let tokenStatus:boolean = false;
    await lastValueFrom(this.validateToken(tokenLocal))
    .then(response => {tokenStatus = (response.data.data.id != 0) ? true : false})
    .catch(responsError => {tokenStatus = false})
    console.log(expiresBool)
    console.log(tokenStatus)
    if(expiresBool || !tokenStatus){
      this.router.navigate(['login']);
    }
  }
}
