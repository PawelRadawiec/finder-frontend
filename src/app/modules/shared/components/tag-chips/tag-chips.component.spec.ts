import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxsModule } from '@ngxs/store';
import { ArticleState } from 'src/app/store/article/article.state';

import { TagChipsComponent } from './tag-chips.component';

describe('TagChipsComponent', () => {
  let component: TagChipsComponent;
  let fixture: ComponentFixture<TagChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagChipsComponent ],
      imports: [
        NgxsModule.forRoot([ArticleState]),
        ReactiveFormsModule,
        HttpClientModule,
        MatAutocompleteModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
