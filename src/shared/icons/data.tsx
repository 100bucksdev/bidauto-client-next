import { IcArrowRight } from "./svg/arrows/IcArrowRight";
import { IcCar_1 } from "./svg/car/IcCar_1";
import { IcCar_2 } from "./svg/car/IcCar_2";
import { IcCar_3 } from "./svg/car/IcCar_3";
import { IcChevronLeft } from "./svg/chevron/IcChevronLeft";
import { IcChevronRight } from "./svg/chevron/IcChevronRight";
import { IcBook } from "./svg/IcBook";
import { IcBookmark } from "./svg/IcBookmark";
import { IcCart } from "./svg/IcCart";
import { IcCircleUser } from "./svg/IcCircleUser";
import { IcClock } from "./svg/IcClock";
import { IcDollarCircle } from "./svg/IcDollarCircle";
import { IcExit } from "./svg/IcExit";
import { IcFacebook } from "./svg/IcFacebook";
import { IcFuel } from "./svg/IcFuel";
import { IcHeart } from "./svg/IcHeart";
import { IcHome } from "./svg/IcHome";
import { IcInstagram } from "./svg/IcInstagram";
import { IcLocation } from "./svg/IcLocation";
import { IcMail } from "./svg/IcMail";
import { IcMessage } from "./svg/IcMessage";
import { IcOdometr } from "./svg/IcOdometr";
import { IcPhone } from "./svg/IcPhone";
import { IcQuestionCircle } from "./svg/IcQuestionCircle";
import { IcSend } from "./svg/IcSend";
import { IcSettings } from "./svg/IcSettings";
import { IcShield } from "./svg/IcShield";
import { IcSmartphone } from "./svg/IcSmartphone";
import { IcTransmision } from "./svg/IcTransmision";
import { IcYouTube } from "./svg/IcYouTube";
import { IcSearch } from "./svg/search/IcSearch";
import { IcSearchSquare } from "./svg/search/IcSearchSquare";

export const iconMap = {
  arrowRight: IcArrowRight,
  car1: IcCar_1,
  car2: IcCar_2,
  car3: IcCar_3,
  chevronLeft: IcChevronLeft,
  chevronRight: IcChevronRight,
  book: IcBook,
  bookmark: IcBookmark,
  cart: IcCart,
  circleUser: IcCircleUser,
  clock: IcClock,
  dollarCircle: IcDollarCircle,
  exit: IcExit,
  facebook: IcFacebook,
  fuel: IcFuel,
  heart: IcHeart,
  home: IcHome,
  instagram: IcInstagram,
  location: IcLocation,
  mail: IcMail,
  message: IcMessage,
  odometer: IcOdometr,
  phone: IcPhone,
  questionCircle: IcQuestionCircle,
  send: IcSend,
  settings: IcSettings,
  shield: IcShield,
  smartphone: IcSmartphone,
  transmission: IcTransmision,
  youTube: IcYouTube,
  search: IcSearch,
  searchSquare: IcSearchSquare,
} as const;

export type TIcon = keyof typeof iconMap;
