import { HttpService } from "../../services/http.service";
import { Component, ViewChild } from "@angular/core";
import { MessageService } from "@progress/kendo-angular-l10n";
import { CustomMessagesService } from "src/app/services/custom-messages.service";
import { DataBindingDirective } from "@progress/kendo-angular-scheduler";

@Component({
  selector: "app-zones-component",
  templateUrl: "./zones.component.html",
})
export class ZonesComponent {
  public customMsgService: CustomMessagesService;
  public zones = [];

  @ViewChild(DataBindingDirective) dataBinding?: DataBindingDirective;

  public gridData: any[] = [];
  public gridView: any[] = [];

  public mySelection: string[] = [];

  constructor(
    public msgService: MessageService,
    public httpService: HttpService
  ) {
    this.customMsgService = this.msgService as CustomMessagesService;
    this.getZones();
  }

  public getZones() {
    const payload = {
      page: 1,
      limit: 20,
      filters: "",
    };

    this.httpService.fetchZones(payload).subscribe((data) => {
      this.zones = data;

      this.gridView = [...data.items]

      console.log('this.gridView', this.gridView)
    });
  }
}
