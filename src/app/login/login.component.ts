import { VoitureService } from './../voiture.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private router: Router, private voitureService: VoitureService) {}

  ngOnInit(): void {}

  loginCheck() {
    if (this.username === 'moez' && this.password === '123') {
      this.voitureService.isAdmin = true;
      this.router.navigate(['/Client']);
    }
  }
}
