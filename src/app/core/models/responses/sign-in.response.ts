import { UserDetails } from "../user-details.model";

export interface SignInResponse {
  access_token: string;
  token_type: string;
  username: string;
}
