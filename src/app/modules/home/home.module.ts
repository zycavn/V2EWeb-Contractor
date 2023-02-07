import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { IconsModule } from '@progress/kendo-angular-icons';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { MenuModule, MenusModule } from '@progress/kendo-angular-menu';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { IntlModule } from '@progress/kendo-angular-intl';
import { UploadModule, FileSelectModule } from '@progress/kendo-angular-upload';
import { TooltipsModule } from '@progress/kendo-angular-tooltip';

import { HomeRoutes } from './home-routing-module';
import { DisplayModelComponent } from './page/display-model/display-model.component';
import { HomeComponent } from './page/home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    DisplayModelComponent
  ],
  imports: [
    HomeRoutes,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    GridModule,
    ButtonsModule,
    DateInputsModule,
    DropDownsModule,
    TreeViewModule,
    ExcelExportModule,
    InputsModule,
    LabelModule,
    PDFExportModule,
    PopupModule,
    IconsModule,
    LayoutModule,
    NavigationModule,
    IndicatorsModule,
    DialogsModule,
    NotificationModule,
    MenuModule,
    ToolBarModule,
    UploadModule,
    FileSelectModule,
    IntlModule,
    TooltipsModule
  ]
})
export class HomeModule { }
