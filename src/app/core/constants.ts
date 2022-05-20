import { RouteName } from "./models/route-name.enum";

export const EMPTY_STRING = "";

export const ABSOLUTE_ROUTES_URLS = {
  SignIn: ["/", RouteName.Auth, RouteName.SignIn],
  CarrierProfileUpdate: [
    "/",
    RouteName.Portal,
    RouteName.Carrier,
    RouteName.CarrierProfileUpdate,
  ],
  CarrierInvoices: [
    "/",
    RouteName.Portal,
    RouteName.Carrier,
    RouteName.Invoices,
  ],
  FactoringСompanyInvoices: [
    "/",
    RouteName.Portal,
    RouteName.FactoringCompany,
    RouteName.Invoices,
  ],
  CarrierLoadsBoard: [
    "/",
    RouteName.Portal,
    RouteName.Carrier,
    RouteName.CarrierLoadsBoard,
  ],
};

export const NOTIFICATIONS = {
  NotAuthanticated:
    "Looks like you are not authenticated. Please, sign in to proceed.",
  SignUpSuccess:
    "Thank you for sign-up. You'll receive confirmation email shortly.",
  CarrierProfileUpdatePending: "Saving your profile information...",
  CarrierProfileUpdateSuccess:
    "Thank you for filling in your profile! Our team is looking forward to working with you",
  CarrierProfileStepUpdateSuccess: "information saved successfully",
  DocumentConfirmSuccess: "Document confirmed successfully",
  CarrierProfileUpdateFailure: (message: string) =>
    `Something went wrong! Error: ${message}`,
  SessionExpired: "Looks like your session has expired. Please, sign in again.",
  SubmitLoadOfferSuccess: "Your offer has been successfully submitted!",
  SubmitLoadOfferFailure: `Your offer hasn't been submitted! Please, try again.`,
  TracingSuccessMessage: `Information saved successfully.`,
};

export const PAGING_DEFAULT_OPTIONS = {
  PageSizeOptions: [5, 10, 25, 50],
  DefaultPageSize: 10,
};
