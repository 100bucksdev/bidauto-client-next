export type TRange<
  From extends number,
  To extends number,
  Acc extends number[] = [],
> = Acc["length"] extends To
  ? From | Acc[number]
  : TRange<From, To, [Acc["length"], ...Acc]>;
