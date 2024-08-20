import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SegurityService } from '../services/segurity.service';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate{

  constructor(private segurityService:SegurityService,private router:Router){}

  async canActivate(): Promise<boolean> {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    const isExpired = new Date().getTime() >= expiresAt;
    const tokenLocal = localStorage.getItem('id_token') || '';
    let tokenStatus: boolean = false;

    if (tokenLocal) {
      try {
        const response = await lastValueFrom(this.segurityService.validateToken(tokenLocal));
        tokenStatus = response.data;
      } catch (error) {
        tokenStatus = false;
      }
    }

    if (isExpired || !tokenStatus) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
