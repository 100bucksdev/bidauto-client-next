export interface ICustomInvoiceFields {
  invoice_to: Partial<
    Record<
      | "full_name"
      | "address"
      | "state"
      | "city"
      | "country"
      | "zip_code"
      | "phone"
      | "email",
      string | number
    >
  >;
  invoice_details: Partial<
    Record<"invoice_number" | "invoice_date" | "lot_number", string | number>
  >;
  auction_details: Partial<
    Record<"auction_city" | "auction_name" | "terminal" | "destination", string>
  >;
  items: Partial<Record<string, number | undefined>>[];
}

export interface ICreateCustomInvoiceFields
  extends Omit<ICustomInvoiceFields, "items" | "auction_details"> {
  items: Partial<{ name: string; amount: number | undefined }>[];
  auction_details: ICustomInvoiceFields["auction_details"] & {
    vehicle_type: "CAR" | "MOTO";
  };
}
