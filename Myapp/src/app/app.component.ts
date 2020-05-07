import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  title = 'Myapp';
  user;
  constructor(private authentocationService: AuthenticationService,private router: Router) { }

  ngOnInit() {
    this.user = sessionStorage.getItem('username');
  }
  ngOnChanges(){
    this.user = sessionStorage.getItem('username');
  }
  logout()
  {
    this.authentocationService.logOut();
    // this.router.navigate(['login']);
    this.router.navigateByUrl('/login');
    //
  }
}
