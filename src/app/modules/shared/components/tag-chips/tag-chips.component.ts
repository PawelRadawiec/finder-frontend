import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ErrorStateMatcherHelperService } from 'src/app/service/error-state-matcher-helper.service';
import { Store } from '@ngxs/store';
import { ErrorState } from 'src/app/store/error/error.state';
import { ErrorSelectors } from 'src/app/store/error/error.selector';

@Component({
  selector: 'app-tag-chips',
  templateUrl: './tag-chips.component.html',
  styleUrls: ['./tag-chips.component.css'],
  providers: [ErrorStateMatcherHelperService]
})
export class TagChipsComponent implements OnInit {
  @Input() form: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = ['Car', 'landspace', 'funny'];
  private subscription: Subscription;

  @ViewChild('chipList') chipList;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public errorHelper: ErrorStateMatcherHelperService
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTags.slice()));
  }

  ngOnInit() {
    this.subscription = this.store.select(ErrorSelectors.errors).subscribe(
      () => this.hasError()
    )
    this.form = this.formBuilder.group({});
    this.form.addControl('tags', this.formBuilder.array([
      this.tagCtrl
    ]));
  }

  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.tags.push(`#${value.trim()}`);
    }
    if (input) {
      input.value = '';
    }
    this.tagCtrl.setValue(this.tags);
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.tagCtrl.setValue(this.tags);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: any): string[] {
    if (Array.isArray(value)) {
      return [];
    }
    return this.allTags.filter(fruit => fruit.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

  hasError() {
    if (this.chipList) {
      this.chipList.errorState = this.errorHelper?.getMatcher('article.tags')?.hasError;
    }

  }

}
