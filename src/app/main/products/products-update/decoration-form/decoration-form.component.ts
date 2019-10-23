import { Component, OnInit, OnDestroy, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { rootAnimations } from '@root/animations';

@Component({
  selector: 'decoration-form',
  templateUrl: './decoration-form.component.html',
  styleUrls: ['./decoration-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations
})
export class DecorationFormComponent implements OnInit {
  @Input() productDecorationForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  onClearLongDescription(event) {
    this.productDecorationForm.patchValue({
      longDescription: null
    });
  }
  
  onClearHighlights(event) {
    this.productDecorationForm.patchValue({
      highlights: null
    });
  }
}
