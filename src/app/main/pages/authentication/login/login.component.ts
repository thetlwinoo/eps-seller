import { Component, OnInit, ViewEncapsulation, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RootConfigService } from '@eps/services';
import { rootAnimations } from '@eps/animations';
import { JhiEventManager } from 'ng-jhipster';

import { AuthService } from '@eps/core';
import { StateStorageService } from '@eps/core/auth/state-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;

  authenticationError: boolean;
  password: string;
  rememberMe: boolean;
  username: string;
  credentials: any;

  constructor(
    private _rootConfigService: RootConfigService,
    private _formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private eventManager: JhiEventManager,
    private authService: AuthService,
    private stateStorageService: StateStorageService,
    private router: Router
  ) {
    this._rootConfigService.config = {
      layout: {
        alert: {
          hidden: true,
        },
        header: {
          hidden: true,
        },
        subnav: {
          hidden: true,
        },
        sidenav: {
          hidden: true,
        },
        toolbar: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        sidepanel: {
          hidden: true,
        },
      },
    };
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.elementRef.nativeElement.querySelector('#username').focus(), 0);
  }

  login(): void {
    this.authService.login();
  }
}
