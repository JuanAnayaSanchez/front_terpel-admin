import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { DataSelectUsers, UserData } from 'src/app/models/select-users';
import { SelectUsersService } from 'src/app/services/users.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit{
  
  items: UserData[] = [] 

  constructor(private userService: SelectUsersService, private cdr: ChangeDetectorRef) {}

  columns:Column[] = [];

  async ngOnInit() {
    await this.getUsers();
  }

  async getUsers() {
    await lastValueFrom(this.userService.getUsers()).then(data => this.items = data.data.data);

    this.columns = [
      {field:'id',header:'Id'},
      {field:'name',header:'Nombre'},
      {field:'mail',header:'Correo'},
      {field:'phone',header:'Telefono'},
      {field:'identification_number',header:'Identificacion'},
      {field:'total_points',header:'Puntaje'},
      {field:'cityName',header:'Locación'},
      {field:'date',header:'Fecha'},
    ]
  }

  transformUsersToTreeNodes(users: UserData[]): TreeNode[] {
    return users.map(user => ({
      data: {
        id: user.id,
        name: user.name,
        mail: user.mail,
        phone:user.phone,
        city: user.cityName,
        identification_number:user.identification_number,
        total_points: user.total_points,
        date: user.date
      },
      children: [],
      leaf: true 
    }));
  }

  async reset(){
    await this.getUsers();
  }
}
