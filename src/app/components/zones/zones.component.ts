import { HttpService } from "../../services/http.service";
import { Component, Renderer2, ViewChild } from "@angular/core";
import { MessageService } from "@progress/kendo-angular-l10n";
import { CustomMessagesService } from "src/app/services/custom-messages.service";
import { DataBindingDirective } from "@progress/kendo-angular-scheduler";
import {
  AddEvent,
  CellClickEvent,
  GridComponent,
} from "@progress/kendo-angular-grid";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { switchMap, take } from "rxjs/operators";
import { Subject } from "rxjs";

const createFormGroup = (dataItem: any) =>
  new FormGroup({
    name: new FormControl(dataItem.name, Validators.required),
  });

const hasClass = (el: { className: string }, className: string | RegExp) =>
  new RegExp(className).test(el.className);

const isChildOf = (el: { parentElement: any }, className: string) => {
  while (el && el.parentElement) {
    if (hasClass(el.parentElement, className)) {
      return true;
    }
    el = el.parentElement;
  }

  return false;
};

@Component({
  selector: "app-zones-component",
  templateUrl: "./zones.component.html",
})
export class ZonesComponent {

  //TODO add types
  public customMsgService: CustomMessagesService;
  public zones = [];
  public currentDataItem: any;
  public loading: boolean = false;
  public gridData: any[] = [];
  public gridView: any[] = [];
  public saveSubject = new Subject();

  public mySelection: string[] = [];

  public formGroup!: FormGroup | null | undefined;
  public view!: unknown[];
  @ViewChild(GridComponent)
  private grid!: GridComponent;

  @ViewChild(DataBindingDirective) dataBinding?: DataBindingDirective;


  private editedRowIndex!: any;
  private isNew = false;

  public get isInEditingMode(): boolean {
    return this.editedRowIndex !== undefined || this.isNew;
  }

  // TODO - loading spinner
  // public loader = {
  //   type: <LoaderType>"pulsing",
  //   themeColor: <LoaderThemeColor>"primary",
  //   size: <LoaderSize>"medium",
  // }

  constructor(
    public msgService: MessageService,
    public httpService: HttpService,
    private renderer: Renderer2
  ) {
    this.customMsgService = this.msgService as CustomMessagesService;
    this.getZones();

    this.renderer.listen("document", "click", ({ target }) => {
      if (!isChildOf(target, "k-grid")) {
        this.saveCurrent();
        // this.closeEditor();
      }
    });

    this.saveSubject
      .pipe(
        switchMap(() => {
          if (this.isNew) {
            return this.httpService.save(this.formGroup?.value, this.isNew);
          } else {
            return this.httpService.save(
              this.formGroup?.value,
              this.isNew,
              this.currentDataItem.id,
              this.currentDataItem.version
            );
          }
        })
      )
      .subscribe((data) => {
        this.getZones();
        this.formGroup = null;
        // this.gridView = [...data.items]
      });
  }

  public addHandler({ sender }: AddEvent): void {
    this.closeEditor(sender);

    this.formGroup = createFormGroup({
      Discontinued: false,
      ProductName: "",
      UnitPrice: 0,
      UnitsInStock: "",
    });

    this.isNew = true;
    sender.addRow(this.formGroup);
  }

  public editHandler({
    sender,
    columnIndex,
    rowIndex,
    dataItem,
  }: CellClickEvent): void {
    this.currentDataItem = { ...dataItem };

    if (this.formGroup && !this.formGroup.valid) {
      return;
    }

    this.saveRow();
    this.formGroup = createFormGroup(dataItem);
    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup, { columnIndex });
  }

  public cancelHandler(): void {
    this.closeEditor(this.grid, this.editedRowIndex);
  }

  public saveCurrent(): void {
    if (this.formGroup && !this.formGroup.valid) {
      return;
    }

    this.saveRow();
  }

  private closeEditor(
    grid: GridComponent,
    rowIndex: number = this.editedRowIndex
  ): void {
    this.isNew = false;
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  private saveRow(): void {
    if (this.isInEditingMode) {
      this.saveSubject.next();
    }
    this.closeEditor(this.grid);
  }

  public getZones(): void {
    this.loading = true;

    const payload = {
      page: 1,
      limit: 20,
      filters: "",
    };

    this.httpService.fetchZones(payload).subscribe((data) => {
      this.zones = data;
      this.gridView = [...data.items];
      this.loading = false;
    });
  }
}
