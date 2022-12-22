import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() triggerLogout = new EventEmitter<void>();
  @Output() triggerProfile = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.triggerLogout.emit();
  }

  onDropdown() {
    this.triggerProfile.emit();
  }
}
