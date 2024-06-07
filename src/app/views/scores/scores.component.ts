import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { UserData } from 'src/app/models/select-users';
import { SelectUsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit{
  files: TreeNode[] = [];
  

  constructor(private userService: SelectUsersService, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    await this.getUsers();
  }

  async getUsers() {
    const response = await lastValueFrom(this.userService.getUsers());
    let rows = this.transformUsersToTreeNodes(response.data.data);
    
    // Crear un array de promesas para todas las llamadas a getChildren
    const promises = rows.map(row => this.getChildren(row.data.id));
    
    // Esperar a que todas las promesas se resuelvan
    const childrenArrays = await Promise.all(promises);
  
    // Asignar los resultados a cada fila
    rows.forEach((row, index) => {
      row.children = childrenArrays[index];
    });
    this.files = rows;
  }

  transformUsersToTreeNodes(users: UserData[]): TreeNode[] {
    return users.map(user => ({
      data: {
        id: user.id,
        name: user.name,
        mail: user.mail,
        phone:user.phone,
        city: user.city,
        identification_number:user.identification_number,
        total_points: user.total_points,
        date: user.date
      },
      children: [],
      leaf: (Number.parseInt(user.total_points) > 0) ? false : true
    }));
  }

  async getChildren(id: number): Promise<TreeNode[]> {
    const filter = { prmuser_id_input: id };
    let children: TreeNode[] = [];
    const response = await lastValueFrom(this.userService.getUserChildren(filter));
    children = response.data.map(child => ({
      data: {
        name: child.name,
        total_points: child.points,
        date: child.date
      },
      children: [],
      leaf: true,
    }));
    return children;
  }

  async reset(){
    await this.getUsers();
  }
}
