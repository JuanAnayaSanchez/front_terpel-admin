import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import {TabMenuModule} from 'primeng/tabmenu';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { ScoresComponent } from './views/scores/scores.component';
import { HttpClientModule } from '@angular/common/http';
import { TreeTableModule } from 'primeng/treetable';
import { CodesComponent } from './views/codes/codes.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { PointsComponent } from './views/points/points.component';
import { ReferalsComponent } from './views/referals/referals.component';
import { LoginComponent } from './views/login/login.component';
import { ReportComponent } from './views/report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScoresComponent,
    CodesComponent,
    PointsComponent,
    ReferalsComponent,
    LoginComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabMenuModule,
    BrowserAnimationsModule,
    CardModule,
    HttpClientModule,
    TreeTableModule,
    TableModule,
    ButtonModule,
    TagModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    KeyFilterModule,
    ToastModule,
],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
