import { Component, OnInit, OnDestroy, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { rootAnimations } from '@eps/animations';

@Component({
  selector: 'decoration-form',
  templateUrl: './decoration-form.component.html',
  styleUrls: ['./decoration-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class DecorationFormComponent implements OnInit {
  @Input() productsForm: FormGroup;

  get productDecorationForm(): FormGroup {
    if (this.productsForm) {
      return this.productsForm.get('productDocument') as FormGroup;
    }
  }

  constructor() {}

  ngOnInit(): void {}

  onClearLongDescription(event): void {
    this.productDecorationForm.patchValue({
      longDescription: null,
    });
  }

  onClearHighlights(event): void {
    this.productDecorationForm.patchValue({
      highlights: null,
    });
  }
}
