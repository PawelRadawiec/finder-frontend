import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {

  articleForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setArticleForm();
  }

  onSubmit() {
    
  }

  setArticleForm() {
    this.articleForm = this.formBuilder.group({
        url: [''],
        title: [''],
        author: [''],
        pictureUrl: [''],
        description: ['']
    })
  }

}
