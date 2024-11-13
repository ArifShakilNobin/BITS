import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequiredPermissionDirective } from './required-permission.directive';
import { ReplaceNullWithText } from './replace-null-with-text.pipe';
import { InputTrimDirective } from './input-trim.directive';
@NgModule({
  imports: [],
  declarations: [RequiredPermissionDirective, ReplaceNullWithText, InputTrimDirective],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RequiredPermissionDirective,
    ReplaceNullWithText,
  ],
})
export class SharedModule {}
