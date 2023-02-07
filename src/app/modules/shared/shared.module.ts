import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { PopupModule } from '@progress/kendo-angular-popup';
import { IconsModule } from '@progress/kendo-angular-icons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { MenuModule } from '@progress/kendo-angular-menu';
import { UploadModule, FileSelectModule } from '@progress/kendo-angular-upload';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { IntlModule } from '@progress/kendo-angular-intl';
import { TooltipsModule } from '@progress/kendo-angular-tooltip';

import { HomeDisplayModelComponent } from './components/home-display-model/home-display-model.component';
import { HomeDisplayModelLayoutComponent } from './containers/home-display-model-layout/home-display-model-layout.component';

@NgModule({
  declarations: [
    HomeDisplayModelLayoutComponent,
    HomeDisplayModelComponent
  ],
  imports: [
    CommonModule,
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
  ],
  exports: [
    HomeDisplayModelLayoutComponent,
    HomeDisplayModelComponent
  ]
})
export class SharedModule { }
