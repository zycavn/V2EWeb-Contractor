import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthAppLayoutComponent } from './layout/auth-app-layout/auth-app-layout.component';
import { PublicAppLayoutComponent } from './layout/public-app-layout/public-app-layout.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { DashboardMenuComponent } from './layout/dashboard-menu/dashboard-menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavComponent } from './layout/nav/nav.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { ListViewModule } from '@progress/kendo-angular-listview';
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
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { TooltipsModule } from '@progress/kendo-angular-tooltip';


@NgModule({
  declarations: [
    AppComponent,
    AuthAppLayoutComponent,
    PublicAppLayoutComponent,
    AppLayoutComponent,
    DashboardMenuComponent,
    FooterComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    ButtonsModule,
    DateInputsModule,
    DropDownsModule,
    TreeViewModule,
    ListViewModule,
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
    UploadsModule,
    HttpClientModule,
    TooltipsModule
  ],
  providers: [
  ],
  bootstrap: [
		AppComponent
	],
})
export class AppModule {}
