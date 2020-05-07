import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatCardModule } from  '@angular/material';
import { ClientComponent } from './client/client.component';
import { SitesComponent } from './sites/sites.component';
import { LocationComponent } from './location/location.component';
import { EmployeeComponent } from "./employee/employee.component";
import { ClientAddComponent } from './client-add/client-add.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ShiftDetailsComponent } from './shift-details/shift-details.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TicketsComponent } from './tickets/tickets.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { JobComponent } from './job/job.component';
import { JobAddComponent } from './job-add/job-add.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import {PaginatorModule} from 'primeng/paginator';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MatPaginatorModule} from '@angular/material/paginator';
import {Message} from 'primeng//api';
import {MessageService} from 'primeng/api';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { BasicAuthHtppInterceptorService } from './services/basic-auth-htpp-interceptor.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MainComponent } from './main/main.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    ClientComponent,
    SitesComponent,
    LocationComponent,
    EmployeeComponent,
    ClientAddComponent,
    AttendanceComponent,
    ShiftDetailsComponent,
    TicketsComponent,
    EmployeeAddComponent,
    JobComponent,
    JobAddComponent,
    FeedbackComponent,
    EmployeeEditComponent,
    LoginComponent,
    LogoutComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    HighchartsChartModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    PaginatorModule,
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule,
    MatPaginatorModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatCardModule
  ],

  providers: [MessageService,{  
    provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
