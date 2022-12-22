import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-overlay-form',
  templateUrl: './overlay-form.component.html',
  styleUrls: ['./overlay-form.component.scss'],
})
export class OverlayFormComponent implements OnInit {
  email: string = '';
  fname: string = '';
  lname: string = '';
  gender: string = '';
  city: string = '';
  id: number = 0;

  password: string = '';
  confirmPassword: string = '';

  @Input() isEdit: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onUpdate() {
    const newData = {
      email: this.email,
      fname: this.fname,
      lname: this.lname,
      gender: this.gender,
      city: this.city,
      id: this.id,
    };

    this.userService.updateUser(newData).subscribe((user) => {
      location.reload();
    });
  }

  onGenderChange(input: string) {
    this.gender = input;
  }

  @ViewChild('select') select!: ElementRef;
  @ViewChild('male') male!: ElementRef;
  @ViewChild('female') female!: ElementRef;

  populateInfo(data: any) {
    this.email = data.email;
    this.fname = data.fname;
    this.lname = data.lname;
    this.gender = data.gender;
    this.city = data.city;
    this.id = data.id;

    // Sets the select city option
    const options = this.select.nativeElement.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value.toLowerCase() === data.city.toLowerCase()) {
        options[i].selected = true;
        this.select.nativeElement.value = data.city;
        break;
      }
    }

    // Sets the gender option
    if (data.gender.toLowerCase() === 'male') {
      this.male.nativeElement.checked = true;
    } else {
      this.female.nativeElement.checked = true;
    }
  }

  clearInfo() {
    this.email = '';
    this.fname = '';
    this.lname = '';
    this.gender = '';
    this.city = '';
    this.id = 0;

    // Sets the select city option
    const options = this.select.nativeElement.options;
    for (let i = 0; i < options.length; i++) {
      options[i].selected = false;
    }

    // Sets the gender option
    this.male.nativeElement.checked = false;
    this.female.nativeElement.checked = false;
  }

  onAdd() {
    this.userService.findIfAlreadyExists(this.email).subscribe((doesExit) => {
      if (doesExit) {
        alert('User already exists');
        return;
      } else {
        const newData = {
          email: this.email,
          fname: this.fname,
          lname: this.lname,
          gender: this.gender,
          city: this.city,
          password: this.password,
        };
        this.userService.addNewUser(newData).subscribe((user) => {
          location.reload();
        });
      }
    });
  }
}
