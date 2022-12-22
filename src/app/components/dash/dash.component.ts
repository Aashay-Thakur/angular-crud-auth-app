import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/User';
import {
  faTrash,
  faPen,
  faCirclePlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { OverlayFormComponent } from '../overlay-form/overlay-form.component';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
})
export class DashComponent implements OnInit {
  userData: User = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    city: '',
    gender: '',
  };

  //* Type of Overlay
  isEdit: boolean = true;

  //* Font Awesome Icons
  faTrash = faTrash;
  faPen = faPen;
  faCirclePlus = faCirclePlus;
  faXmark = faXmark;

  //* Overlay Form
  shouldShowOverlay: boolean = false;

  constructor(
    public localService: LocalService,
    public userService: UserService,
    private router: Router
  ) {
    if (!this.localService.checkLoggedIn()) this.router.navigate(['/login']); // If not logged in, redirect to login page
    const user: User | null = this.localService.getUser();
    if (user === null) this.router.navigate(['/login']); // If user is null, redirect to login page
    if (user !== null) {
      this.userData = user;
    }
  }
  allUserData: User[] = [];

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((allUsers) => {
      this.allUserData = allUsers;
      console.log(this.allUserData);
    });
  }

  onDelete(id: Number, fname: string, lname: string) {
    if (
      confirm(
        `Are you sure you want to delete this user?\r\r${fname} ${lname}`
      ) === false
    )
      return;
    if (id === this.userData.id) {
      if (
        confirm(
          'You are about to delete your own account.\rAre you sure you want to proceed?'
        ) === false
      )
        return;
    }

    this.userService.deleteUser(id).subscribe(() => {
      this.allUserData = this.allUserData.filter((user) => user.id !== id);
      if (id === this.userData.id) {
        this.localService.logoutUser();
        this.router.navigate(['/login']);
      }
    });
  }

  @ViewChild(OverlayFormComponent) overlayForm!: OverlayFormComponent;
  onEdit(id: Number, user: User) {
    this.shouldShowOverlay = true;
    this.isEdit = true;
    this.overlayForm.populateInfo(user);
  }

  onAdd() {
    this.shouldShowOverlay = true;
    this.isEdit = false;
    this.overlayForm.clearInfo();
  }

  onLogout() {
    this.localService.logoutUser();
    this.router.navigate(['/login']);
  }

  @ViewChild('dropdown') dropdown!: ElementRef;
  onDropdownClick() {
    console.log('Dropdown Clicked');
    this.dropdown.nativeElement.classList.toggle('active');
  }
}
