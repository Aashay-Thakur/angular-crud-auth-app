import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  fname: string = '';
  lname: string = '';
  gender: string = '';
  city: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onGenderChange(input: string) {
    this.gender = input;
  }

  onSubmit() {
    this.userService.findIfAlreadyExists(this.email).subscribe((doesExist) => {
      if (doesExist) {
        alert('User already exists');
        return;
      } else {
        const newUser = {
          fname: this.fname,
          lname: this.lname,
          email: this.email,
          password: this.password,
          city: this.city,
          gender: this.gender,
        };
        this.userService.addNewUser(newUser).subscribe((user) => {
          this.router.navigate(['/login']);
        });
      }
    });
  }
}
