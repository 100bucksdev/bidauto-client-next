export interface ILotsQueryParams {
  make?: string;
  model?: string;
  fuel?: string;
  vehicle_type?: string;
  vehicle_condition?: string;
  year_from?: string;
  year_to?: string;
  buy_now_price_min?: string;
  buy_now_price_max?: string;
  is_buy_now?: boolean;
  odometer_min?: string;
  ododmeter_max?: string;
  auction?: "COPART" | "IAAI";
}
