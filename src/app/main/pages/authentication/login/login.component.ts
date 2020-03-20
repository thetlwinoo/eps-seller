import { Component, OnInit, ViewEncapsulation, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RootConfigService } from '@eps/services';
import { rootAnimations } from '@eps/animations';
import { JhiEventManager } from 'ng-jhipster';

import { LoginService } from '@eps/core/login/login.service';
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
    private loginService: LoginService,
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
    // this.loginService
    //   .login({
    //     username: this.loginForm.get('username').value,
    //     password: this.loginForm.get('password').value,
    //     rememberMe: this.loginForm.get('rememberMe').value,
    //   })
    //   .subscribe(
    //     () => {
    //       this.authenticationError = false;
    //       // this.activeModal.dismiss('login success');
    //       if (
    //         this.router.url === '/account/register' ||
    //         this.router.url.startsWith('/account/activate') ||
    //         this.router.url.startsWith('/account/reset/')
    //       ) {
    //         this.router.navigate(['']);
    //       }
    //       this.eventManager.broadcast({
    //         name: 'authenticationSuccess',
    //         content: 'Sending Authentication Success',
    //       });
    //       // previousState was set in the authExpiredInterceptor before being redirected to login modal.
    //       // since login is successful, go to stored previousState and clear previousState
    //       const redirect = this.stateStorageService.getUrl();
    //       if (redirect) {
    //         this.stateStorageService.storeUrl(null);
    //         this.router.navigateByUrl(redirect);
    //       } else {
    //         this.router.navigate(['']);
    //       }
    //     },
    //     () => (this.authenticationError = true)
    //   );
  }
}
