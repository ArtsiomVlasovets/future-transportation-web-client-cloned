import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SignInResponse } from "../../models/responses/sign-in.response";
import { UserDetails } from "../../models/user-details.model";
import { UserInfo } from "../../models/user-info.model";

const apiUrlsTypeMap: Record<string, string> = {
  fc: "factoring-companies-signup-link",
};

@Injectable({
  providedIn: "root",
})
export class AuthHttpService {
  constructor(private httpClient: HttpClient) {}

  signIn(username: string, password: string): Observable<SignInResponse> {
    return this.httpClient.post<SignInResponse>("auth/login", {
      username,
      password,
    });
  }

  signUp(
    email: string,
    password: string,
    phone: string | null = null,
    carrierMcNumber: string | null = null,
    carrierId: string | null = null,
    uuid: string | null = null
  ): Observable<{ Message?: string }> {
    return this.httpClient.post<{ Message?: string }>("signup", {
      Email: email,
      Password: password,
      CarrierID: carrierId,
      Phone: phone,
      CarrierMC: carrierMcNumber,
      uuid,
    });
  }

  getUserDetails(userId: string): Observable<UserDetails> {
    return this.httpClient.get<UserDetails>("user-details", {
      params: {
        userId,
      },
    });
  }

  getUserInfo(type: string, uuid: string): Observable<UserInfo> {
    const requestApi = `${apiUrlsTypeMap[type]}`;
    return this.httpClient.get<UserInfo>(requestApi, {
      params: {
        uuid,
      },
    });
  }
}
