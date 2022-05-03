import { HttpService } from "./../../services/http.service";
import { Component } from "@angular/core";
import { MessageService } from "@progress/kendo-angular-l10n";
import { CustomMessagesService } from "src/app/services/custom-messages.service";

@Component({
  selector: "app-info-component",
  templateUrl: "./info.component.html",
})
export class InfoComponent {
  public customMsgService: CustomMessagesService;
  public zones = [];

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
    });
  }
}
