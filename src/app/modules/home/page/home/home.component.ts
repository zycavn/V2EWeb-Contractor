import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ApplicationSettings } from 'src/app/core/config/application-settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isIframe: boolean = false;
  isLoggedIn: boolean = false;
  displayName!: string;
  applicationName: string = ApplicationSettings.applicationName;

  constructor() {}

  ngOnInit(): void {
  }
}
