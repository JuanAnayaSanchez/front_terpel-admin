import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SegurityService } from '../services/segurity.service';
import { lastValueFrom, Observable, delay } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate{

  constructor(private segurityService:SegurityService,private router:Router){}

  async canActivate(): Promise<boolean> {
    const expiresAt = JSON.parse(sessionStorage.getItem('expires_at') || '{}');
    const isExpired = new Date().getTime() >= expiresAt;
    const tokenLocal = sessionStorage.getItem('id_token') || '';
    let tokenStatus: boolean = false;

    if (tokenLocal) {
      await lastValueFrom(this.segurityService.validateToken(tokenLocal))
        .then(response => {
          tokenStatus = (response.data.data.id != 0) ? true : false
          console.log(response)
        })
        .catch(response => {
          console.log(response)
          tokenStatus = false
        })
    }

    if (isExpired || !tokenStatus) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
