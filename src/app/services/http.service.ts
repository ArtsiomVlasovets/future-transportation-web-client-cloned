import { environment } from "./../../environments/environment.prod";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  public fetchZones(payload: any): Observable<any> {
    return this.httpClient.get<any>(`catalogs/zones`, {
      params: {
        page: payload.page,
        limit: payload.limit,
      },
    });
  }

  public fetchCities(payload: any): Observable<any> {
    return this.httpClient.get<any>(`catalogs/cities`, {
      params: {
        page: payload.page,
        limit: payload.limit,
      },
    });
  }

  public fetchCountries(payload: any): Observable<any> {
    return this.httpClient.get<any>(`catalogs/countries`, {
      params: {
        page: payload.page,
        limit: payload.limit,
      },
    });
  }

  public fetchStates(payload: any): Observable<any> {
    return this.httpClient.get<any>(`catalogs/states`, {
      params: {
        page: payload.page,
        limit: payload.limit,
      },
    });
  }

  // TODO remove
  // public remove(zone: any): void {
  //   const index = this.data.findIndex(
  //     ({ ProductID }) => ProductID === zone.ProductID
  //   );
  //   this.data.splice(index, 1);
  // }

  public saveZone(
    formValue: any,
    isNew?: boolean,
    id?: string,
    version?: string
  ): Observable<any> {
    const payload = {
      item: {
        name: formValue?.name,
        id,
        version,
      },
    };

    // TODO will be replaced to one way
    if (isNew) {
      return this.httpClient.post<any>(`catalogs/zone`, { ...payload });
    } else {
      return this.httpClient.put<any>(`catalogs/zone`, { ...payload });
    }
  }

  public saveCity(
    formValue: any,
    isNew?: boolean,
    id?: string,
    version?: string
  ): Observable<any> {
    const state = {
      name: "State",
      id: "",
      veriosn: "",
    };

    const payload = {
      item: {
        name: formValue?.name,
        latitude: formValue?.latitude,
        longitude: formValue?.longitude,
        google_map_place_id: formValue?.google_map_place_id,
        state: state,
        id,
        version,
      },
    };

    // TODO will be replaced to one way
    if (isNew) {
      return this.httpClient.post<any>(`catalogs/city`, { ...payload });
    } else {
      return this.httpClient.put<any>(`catalogs/city`, { ...payload });
    }
  }

  public saveCountry(
    formValue: any,
    isNew?: boolean,
    id?: string,
    version?: string
  ): Observable<any> {
    const payload = {
      item: {
        name: formValue?.name,
        MC_DOT_required: formValue?.MC_DOT_required,
        alcohol_permission: formValue?.alcohol_permission,
        short_name: formValue?.short_name,
        id,
        version,
      },
    };

    // TODO will be replaced to one way
    if (isNew) {
      return this.httpClient.post<any>(`catalogs/country`, { ...payload });
    } else {
      return this.httpClient.put<any>(`catalogs/country`, { ...payload });
    }
  }
}
