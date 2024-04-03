import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchInputComponent } from './search-input/search-input.component';
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';
import { CardsComponent } from './cards/cards.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { BrowserModule } from '@angular/platform-browser';
import { ShortenTextPipe } from '../pipes/shorten-text.pipe';
import { AddButtonDirective } from './directives/add-button.directive';
import { FormatPricePipe } from '../pipes/format-price.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    CardsComponent,
    ContentWrapperComponent,
    SearchInputComponent,
    TableComponent,
    FormComponent,
    ShortenTextPipe,
    FormatPricePipe,
    AddButtonDirective,
  ],
  imports: [FormsModule, MatIconModule, BrowserModule],
  exports: [
    HeaderComponent,
    CardsComponent,
    ContentWrapperComponent,
    SearchInputComponent,
  ],
})
export class ComponentsModule {}
