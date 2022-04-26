import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { VoitureService } from './voiture.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';
import { AppRoutingModule } from './app-routing.module';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './Client/client/client.component';

@NgModule({
  declarations: [AppComponent, ViewComponent, ListComponent, LoginComponent, ClientComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
  providers: [VoitureService],
  bootstrap: [AppComponent],
})
export class AppModule {}
