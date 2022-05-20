import { BaseId } from "./base-id.model";

export interface Zones extends BaseId {
  InvoiceNumber: string;
  InvoiceDate: string;
  CarrierInvoiceNumber: string;
  DueDate: string;
  InvoiceCurrency: string;
  InvoiceSum: number;
  PayableDate: string;
  PayableCheck: string | null;
  PayableCurrency: string | null;
  PayableSum: number | null;
  Address: string;
  Country: string;
  State: string;
  City: string;
  PostalCode: string;
}
