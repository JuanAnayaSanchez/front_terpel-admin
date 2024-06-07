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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabMenuModule,
    BrowserAnimationsModule,
    CardModule,
    HttpClientModule,
    TreeTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
