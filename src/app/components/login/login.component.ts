import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private local: LocalService
  ) {
    if (this.local.checkLoggedIn()) this.router.navigate(['/']); // If logged in, redirect to home page
  }

  email: string = '';
  password: string = '';

  ngOnInit(): void {}

  onLogin() {
    const USERS = this.userService.getUsers().subscribe((users) => {
      if (
        users.find((user) => {
          if (user.email === this.email) {
            if (user.password === this.password) {
              this.local.saveUser(user);
              this.router.navigate(['/']);
              return;
            } else {
              alert('Incorrect password');
              return;
            }
          }
        })
      ) {
      }
    });
  }
}
