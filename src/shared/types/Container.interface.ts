import { IOrder } from "./Order.interface";

export interface IContainer {
  orders: IOrder[];
  id: number;
  destination: string;
  container_key: string;
  ship_line: string;
  vessel: string;
}

export interface ICreateContainer extends Omit<IContainer, "id" | "orders"> {
  order_vins: string[];
}

export interface IChangeContainer extends Omit<IContainer, "orders" | "id"> {
  order_vins: string[];
}
