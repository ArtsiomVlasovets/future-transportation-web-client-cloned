import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NotificationModule } from "@progress/kendo-angular-notification";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { IntlModule } from "@progress/kendo-angular-intl";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { HttpClientModule } from "@angular/common/http";
import { FileSelectModule } from "@progress/kendo-angular-upload";
import { EditorModule } from "@progress/kendo-angular-editor";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { SchedulerModule } from "@progress/kendo-angular-scheduler";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { LabelModule } from "@progress/kendo-angular-label";
import { NgModule } from "@angular/core";
import { ExcelModule, GridModule } from "@progress/kendo-angular-grid";
import { PDFModule } from "@progress/kendo-angular-scheduler";
// TODO for loading spinner
// import { IndicatorsModule } from "@progress/kendo-angular-indicators";

@NgModule({
  declarations: [],
  imports: [
    GridModule,
    PDFModule,
    ExcelModule,
    LabelModule,
    LayoutModule,
    SchedulerModule,
    ButtonsModule,
    EditorModule,
    FileSelectModule,
    HttpClientModule,
    ChartsModule,
    IntlModule,
    DateInputsModule,
    InputsModule,
    DropDownsModule,
    NotificationModule,
    FormsModule,
    ReactiveFormsModule,
    // IndicatorsModule
  ],
  exports: [
    GridModule,
    PDFModule,
    ExcelModule,
    LabelModule,
    LayoutModule,
    SchedulerModule,
    ButtonsModule,
    EditorModule,
    FileSelectModule,
    HttpClientModule,
    ChartsModule,
    IntlModule,
    DateInputsModule,
    InputsModule,
    DropDownsModule,
    NotificationModule,
    FormsModule,
    ReactiveFormsModule,
    // IndicatorsModule
  ],
})
export class SharedModule {}
