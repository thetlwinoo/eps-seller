import { Component, Inject } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { RootConfigService, RootTranslationLoaderService } from '@eps/services';
import { RootNavigationService } from '@eps/components/navigation/navigation.service';
import { navigation } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationMyanmar } from 'app/navigation/i18n/mm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'eps-seller';
  rootConfig: any;
  navigation: any;
  private _unsubscribeAll: Subject<any>;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private _rootConfigService: RootConfigService,
    private _rootNavigationService: RootNavigationService,
    private _translateService: TranslateService,
    private _rootTranslationLoaderService: RootTranslationLoaderService,
    private _platform: Platform,
    private router: Router,
  ) {
    this.navigation = navigation;
    this._rootNavigationService.register('main', this.navigation);
    this._rootNavigationService.setCurrentNavigation('main');
    this._translateService.addLangs(['en', 'mm']);
    this._translateService.setDefaultLang('en');
    this._rootTranslationLoaderService.loadTranslations(navigationEnglish, navigationMyanmar);
    this._translateService.use('en');

    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }

    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._rootConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.rootConfig = config;
      for (let i = 0; i < this.document.body.classList.length; i++) {
        const className = this.document.body.classList[i];

        if (className.startsWith('theme-')) {
          this.document.body.classList.remove(className);
        }
      }

      this.document.body.classList.add(this.rootConfig.colorTheme);
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
