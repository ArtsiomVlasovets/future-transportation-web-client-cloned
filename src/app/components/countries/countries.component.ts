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
    short_name: new FormControl(dataItem.short_name, Validators.required),
    alcohol_permission: new FormControl(dataItem.alcohol_permission, Validators.required),
    MC_DOT_required: new FormControl(dataItem.MC_DOT_required, Validators.required),
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
  selector: "app-countries-component",
  templateUrl: "./countries.component.html",
  styleUrls: ["./countries.component.scss"],
})
export class CountriesComponent {
  //TODO add types
  public customMsgService: CustomMessagesService;
  public countries = [];
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
    this.getCountries();

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

    this.saveSubject
      .pipe(
        switchMap(() => {
          if (this.isNew) {
            return this.httpService.saveCountry(this.formGroup?.value, this.isNew);
          } else {
            return this.httpService.saveCountry(
              this.formGroup?.value,
              this.isNew,
              this.currentDataItem.id,
              this.currentDataItem.version
            );
          }
        })
      )
      .subscribe((data) => {
        this.getCountries();
        this.formGroup = null;
        // this.gridView = [...data.items]
      });
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

  public getCountries(): void {
    this.loading = true;

    const payload = {
      page: 1,
      limit: 20,
      filters: "",
    };

    this.httpService.fetchCountries(payload).subscribe((data) => {
      this.countries = data;
      this.gridView = [...data.items];
      this.loading = false;
    });
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
}
