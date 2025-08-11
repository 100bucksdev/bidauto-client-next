import { ITerminalsPrices } from "./Terminals.interface";

export interface ILotCalculator {
  broker_fee: number;
  transportation_price: Partial<ITerminalsPrices>;
  ocean_ship: Partial<ITerminalsPrices>;
  additional: number;
  totals: Partial<ITerminalsPrices>;
}

export interface ILotEuCalculator extends ILotCalculator {
  vats: { eu_vats: Partial<ITerminalsPrices>; vats: Partial<ITerminalsPrices> };
}
