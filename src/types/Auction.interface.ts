export type TAuctionSocet = ISocetNewBid | ISocetLastBid | ISocetEnded;

export interface ISocetEnded {
  type: "auction_ended";
  final_bid: number;
  user_id: number;
}

export interface ISocetNewBid {
  type: "new_bid";
  bid: number;
  percentage: number;
  duration: number;
}

export interface ISocetLastBid {
  type: "last_bid";
  last_bid: ISocetLastBid;
  is_bid_made: boolean;
}

export interface ISocetLastBid {
  amount: number;
  time: string | null;
  percentage: number;
  duration: number;
}
