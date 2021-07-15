import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TagChipsComponent } from './components/tag-chips/tag-chips.component';

const materialModules = [
  MatIconModule,
  MatCardModule,
  MatBadgeModule,
  MatInputModule,
  MatChipsModule,
  MatTableModule,
  MatButtonModule,
  MatToolbarModule,
  MatDividerModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatSelectModule
];

@NgModule({
  declarations: [
    TagChipsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    materialModules
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    TagChipsComponent,
    materialModules
  ]
})
export class SharedModule { }
