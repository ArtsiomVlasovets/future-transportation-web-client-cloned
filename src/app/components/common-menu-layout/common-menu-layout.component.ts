import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
const is = (fileName: string, ext: string) =>
  new RegExp(`.${ext}\$`).test(fileName);

@Component({
  selector: "app-common-menu-layout",
  templateUrl: "./common-menu-layout.component.html",
  styleUrls: ["./common-menu-layout.component.scss"],
})
export class CommonMenuLayoutComponent implements OnInit {
  items: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log("this.router.url :>> ", this.router.url);

    if (this.router.url.includes("data-library")) {
      this.items = [
        {
          text: "Tracing board",
        },
        {
          text: "Companies",
          items: [
            { text: "Customer" },
            {
              text: "Carrier",
            },
          ],
        },
        {
          text: "Catalogues",
          items: [
            { text: "Zones", path: "data-library/zones" },
            { text: "Cities", path: "data-library/cities" },
            { text: "Countries", path: "data-library/countries" },
            { text: "States", path: "data-library/states" },
          ],
        },
        {
          text: "Poll",
          items: [
            { text: "Poll" },
            {
              text: "Questions",
            },
          ],
        },
        {
          text: "Taxes",
          items: [
            { text: "Consumption taxes" },
            {
              text: "Taxes",
            },
          ],
        },
      ];
    } else if (this.router.url.includes("quotes")) {
      this.items = [
        {
          text: "Quotes",
        },
        {
          text: "Carrier quotes",
        },
        {
          text: "Address classifiers",
        },
        {
          text: "Commodities",
        },
        {
          text: "RFQ",
        },
        {
          text: "Spot quotes",
        },
      ];
    }

    // this.items = this.mapItems(this.router.config);
  }

  public onSelect({ item }: any): void {
    // debugger;
    // console.log("item :>> ", item);
    if (!item.items) {
      // debugger;
      this.router.navigate([item.path]);
    }
  }

  // private mapItems(routes: any[], path?: string): any[] {
  //   return routes.map((item) => {
  //     const result: any = {
  //       text: item.text,
  //       path: (path ? `${path}/` : "") + item.path,
  //     };

  //     if (item.children) {
  //       result.items = this.mapItems(item.children, item.path);
  //     }

  //     return result;
  //   });
  // }

  public iconClass({ text, items }: any): any {
    return {
      "k-i-file-pdf": is(text, "pdf"),
      "k-i-folder": items !== undefined,
      "k-i-html": is(text, "html"),
      "k-i-image": is(text, "jpg|png"),
      "k-icon": true,
    };
  }
}
