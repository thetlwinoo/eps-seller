import { Directive, ElementRef, OnDestroy, OnInit, Renderer2, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RootMatchMediaService } from '@epm/services';


@Directive({
    selector: '.header-scroll'
})
export class HeaderScrollDirective implements OnInit, OnDestroy {
    private _parent: any;
    private _grandParent: any;
    private _nativeElement: any;
    private _unsubscribeAll: Subject<any>;
    isMobile: boolean = false;

    constructor(
        private _elementRef: ElementRef,
        private _rootMediaMatchService: RootMatchMediaService,
        private _renderer: Renderer2
    ) {
        this._unsubscribeAll = new Subject();
    }


    ngOnInit(): void {
        console.log('>>>> Header Scroll.l....')
        this._nativeElement = this._elementRef.nativeElement;
        this._parent = this._renderer.parentNode(this._elementRef.nativeElement);
        if (!this._parent) {
            return;
        }
        this._grandParent = this._renderer.parentNode(this._parent);

        this._rootMediaMatchService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((alias) => {
                if (alias === 'xs') {
                    this.isMobile = true;
                    this._renderer.removeClass(this._nativeElement, 'sticky-top');
                    this._renderer.removeClass(this._nativeElement, 'bg-dark');
                    this._renderer.addClass(this._nativeElement, 'fixed-top');
                }
                else {
                    this.isMobile = false;
                    this._renderer.removeClass(this._nativeElement, 'fixed-top');
                    this._renderer.addClass(this._nativeElement, 'sticky-top');
                    this._renderer.addClass(this._nativeElement, 'bg-dark');
                }
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    @HostListener('window:scroll', ['$event'])
    onScroll($event: Event): void {
        if (this.isMobile) {
            if (window.pageYOffset >= 100) {
                this._renderer.addClass(this._nativeElement, 'bg-dark');
            }
            else {
                this._renderer.removeClass(this._nativeElement, 'bg-dark');
            }
        }
    }
}