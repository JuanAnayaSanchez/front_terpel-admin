import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  ngOnInit() {
      this.items = [
          { label: 'Puntajes', icon: 'pi pi-fw pi-users' },
          { label: 'Codigos', icon: 'pi pi-fw pi-receipt' }
      ];

      this.activeItem = this.items[0];
  }

  onActiveItemChange(event: MenuItem) {
      this.activeItem = event;
      console.log(this.activeItem);
  }

  activateLast() {
      this.activeItem = (this.items as MenuItem[])[(this.items as MenuItem[]).length - 1];
  }
}
