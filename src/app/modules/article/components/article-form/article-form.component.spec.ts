import { TextFieldModule } from '@angular/cdk/text-field';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ArticleState } from 'src/app/store/article/article.state';

import { ArticleFormComponent } from './article-form.component';

describe('ArticleFormComponent', () => {
  let component: ArticleFormComponent;
  let fixture: ComponentFixture<ArticleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleFormComponent ],
      imports: [
        NgxsModule.forRoot([ArticleState]),
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        TextFieldModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
