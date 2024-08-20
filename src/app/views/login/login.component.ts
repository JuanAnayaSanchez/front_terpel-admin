import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { SegurityService } from 'src/app/services/segurity.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username:any = null;
  password:any = null;

  constructor(private messageService:MessageService,
    private segurityService:SegurityService,
    private router:Router){}

  login(){
    if(this.username == null || this.password == null){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Debe ingresar un usuario y contraseña` })
      return
    }
    lastValueFrom(this.segurityService.login(this.username,this.password)).then(response => {
      if(response.data != null){
        this.segurityService.setSession(response.data);
        this.router.navigate(['main']);
        this.messageService.add({ severity: 'success', summary: 'Login', detail: `Se inicio sesión correctamente` });
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Usuario o contraseña incorrectos` })
      }
    }).catch(error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Usuario o contraseña incorrectos` })
    })
  }
}
