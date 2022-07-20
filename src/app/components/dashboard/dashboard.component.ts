import { Component, Renderer2, ViewChild } from "@angular/core";
import { IntlService } from "@progress/kendo-angular-intl";
import { MessageService } from "@progress/kendo-angular-l10n";
import { CustomMessagesService } from "src/app/services/custom-messages.service";
import { orders } from "src/app/resources/orders";
import { Order } from "src/app/models/order.model";
import { Subject } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  AddEvent,
  CellClickEvent,
  GridComponent,
} from "@progress/kendo-angular-grid";
import { DataBindingDirective } from "@progress/kendo-angular-scheduler";
import { switchMap } from "rxjs/operators";
import { DASHBOARD_DATA } from "./data.constants";

const createFormGroup = (dataItem: any) =>
  new FormGroup({
    name: new FormControl(dataItem.name, Validators.required),
    latitude: new FormControl(dataItem.latitude, Validators.required),
    longitude: new FormControl(dataItem.longitude, Validators.required),
    google_map_place_id: new FormControl(
      dataItem.google_map_place_id,
      Validators.required
    ),
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
  selector: "app-dashboard-component",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  public customMsgService: CustomMessagesService;

  public currentDataItem: any;
  public loading: boolean = false;
  public gridData: any[] = [];
  public gridView: any[] = [];
  public saveSubject = new Subject();

  public mySelection: string[] = [];

  public formGroup!: FormGroup | null | undefined;
  public view!: unknown[];
  @ViewChild(GridComponent)
  public grid!: GridComponent;

  @ViewChild(DataBindingDirective) dataBinding?: DataBindingDirective;

  private editedRowIndex!: any;
  private isNew = false;
  currentCellClickEvent!: CellClickEvent | null;
  currentTarget!: any;
  selectedTarget: any;
  isEditMode = false;
  windowOpen = false;

  public get isInEditingMode(): boolean {
    return this.editedRowIndex !== undefined || this.isNew;
  }

  constructor(
    public intl: IntlService,
    public messages: MessageService,
    private renderer: Renderer2
  ) {
    this.customMsgService = this.messages as CustomMessagesService;
    (this.gridView = [...DASHBOARD_DATA]),
      this.renderer.listen("document", "click", ({ target }) => {
        this.currentTarget = target;

        if (
          this.isEditMode &&
          !isChildOf(target, "k-grid") &&
          !isChildOf(target, "k-command-cell") &&
          !isChildOf(target, "k-grid-toolbar")
        ) {
          setTimeout(() => {
            this.openConfirmationPopup();
          }, 200);
        }
      });

    //   this.saveSubject
    //     .pipe(
    //       switchMap(() => {
    //         if (this.isNew) {
    //           return this.httpService.saveCity(this.formGroup?.value, this.isNew);
    //         } else {
    //           return this.httpService.saveCity(
    //             this.formGroup?.value,
    //             this.isNew,
    //             this.currentDataItem.id,
    //             this.currentDataItem.version
    //           );
    //         }
    //       })
    //     )
    //     .subscribe((data) => {
    //     //   this.getCities();
    //       this.formGroup = null;
    //       // this.gridView = [...data.items]
    //     });
  }

  onTabSelect($event: any) {
    const e = $event;

    console.log("e :>> ", e);
  }

  public yes() {
    this.saveCurrent();
    this.windowOpen = false;
  }

  public no() {
    this.cancelHandler();
    this.windowOpen = false;
  }

  public close() {
    this.windowOpen = false;
    setTimeout(() => {
      this.isEditMode = true;
    }, 1000);
  }

  public cancelPopup() {
    this.close();
  }

  public editClick(rowIndex: any, dataItem: any) {
    const sender = this.grid;
    const columnIndex = 1;

    this.editHandler({
      sender,
      columnIndex,
      rowIndex,
      dataItem,
    });
  }

  public editHandler({ sender, columnIndex, rowIndex, dataItem }: any): void {
    this.currentDataItem = { ...dataItem };

    if (this.formGroup && !this.formGroup.valid) {
      return;
    }

    this.saveRow();
    this.formGroup = createFormGroup(dataItem);
    this.editedRowIndex = rowIndex;
    this.isEditMode = true;

    sender.editRow(rowIndex, this.formGroup, { columnIndex });
  }

  public cancelHandler(): void {
    this.isEditMode = false;
    this.currentCellClickEvent = null;

    this.closeEditor(this.grid, this.editedRowIndex);
  }

  public saveCurrent(): void {
    if (this.formGroup && !this.formGroup.valid) {
      return;
    }

    this.isEditMode = false;
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

  public openConfirmationPopup() {
    this.windowOpen = true;
    this.isEditMode = false;
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

    setTimeout(() => {
      this.isEditMode = true;
    }, 100);
    sender.addRow(this.formGroup);
  }

  public onClickEvent(event: CellClickEvent) {
    this.currentCellClickEvent = event;
  }

  public onDblClick() {
    if (
      this.currentCellClickEvent?.sender &&
      this.currentCellClickEvent.columnIndex &&
      this.currentCellClickEvent.rowIndex
    ) {
      this.editHandler(this.currentCellClickEvent);

      this.selectedTarget = this.currentTarget;
    }
  }
}
