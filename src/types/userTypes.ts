export interface getBalanceData {
  balance: number;
}

interface ProductContentDescription {
  description: string;
}

interface ItemData {
  image: string;
  amount: number;
  customFlag: boolean;
}

interface ProductContentDetailsData {
  time: number;
  alert: string;
  label: string;
  itemData: ItemData[];
}

interface ProductContentDetails {
  data: ProductContentDetailsData[];
  rade: number;
  delay: number;
  setHome: number;
  imageModal: string;
  descriptionModal: string;
}

export interface ProductItem {
  id: number;
  name_ru: string;
  name_en: string;
  nameID: string;
  description_ru: null;
  description_en: null;
  image: string;
  type: string;
  productContent: ProductContentDescription | ProductContentDetails;
  serverTypeId: number;
  amount: number;
  isChangeAmount: boolean;
  price: number;
  discount: null;
  saleDiscount: null;
  saleDeadline: null;
  maxCountOfSale: null;
  hidden: boolean;
  number: null;
  autoactivation: boolean;
  isBackgroundColor: boolean;
  blockSize: number;
  isBackgroundImage: boolean;
  buttonColor: string;
  textButton: null;
  iconButton: null;
  height: null;
}

interface ServerType {
  description: string;
  hidden: false;
  id: number;
  name: string;
  number: number;
}

export interface getInventoryDataItem {
  id: number;
  amount: number;
  status: string;
  dateOfReceive: null;
  historyOfPurchaseId: number;
  userId: number;
  serverTypeId: number;
  serverId: number;
  serverName: string;
  productId: number;
  createdAt: string;
  isCanBeRefund: boolean;
  isPartOfPack: null | any;
  packId: null | any;
  product: ProductItem;
  serverType: ServerType;
  description: null;
  name: string;
}

export interface getInventoryData {
  pages: number;
  result: getInventoryDataItem[];
}

// ======================= Details

export interface DetailsItem {
  id: number;
  userId: number;
  amount: number;
  createdAt: string;
  lostMainBalance: number;
  lostBonusBalance: number;
  refund: false;
  productId: number;
  product: ProductItem;
  type: string;
}

export interface getDetailsDataItem {
  id: number;
  userId: number;
  method?: string;
  amount: number;
  createdAt: string;
  status?: boolean;
  name: string;
  lostMainBalance?: number;
  lostBonusBalance?: number;
  refund?: boolean;
  productId?: number;
  dateOfPurchase?: string;
  product?: ProductItem;
  type: string;
}

export interface getDetailsData {
  result: getDetailsDataItem[];
  pages: number;
}

export interface getLeadersItem {
  [key: string]: Player;
}

type PlayerStats = {
  p_score: number;
  kp_total: number;
  d_player: number;
  p_lastjoin: number;
};

type PlayerData = {
  name: string;
  avatar: string;
};

type Player = {
  stats: PlayerStats;
  data: PlayerData;
  pos: number;
};

export type CurrentPlayer = {
  data: Player;
  pos: number;
};

export interface getLeaders {
  leaderboard: getLeadersItem[];
  pages: number;
  userData: CurrentPlayer;
}

export interface buyProductParams {
  productId: number;
  amount: number;
  serverId: number;
  isPack?: boolean;
}

export interface getDetailsParams {
  page: number;
  count: number;
  sort: string;
}

export interface getInventoryParams {
  page: number;
  count: number;
}

export interface Refill {
  status: string;
  data: object;
  message: string;
}

export interface RefillProps {
  productId: number;
  amount: number;
  serverId: number;
}

export interface getPriceProductParams {
  amount: number;
  id: number;
}
export interface getPriceCurrencyParams {
  amount?: number;
  id: number;
  rubs?: number;
  isPack?: boolean;
}

export interface getPriceCurrencyData {
  amount?: number;
  finalPrice?: number;
  type: "currency" | "money";
}

export interface IGetCode {
  data: string;
  status: string;
}

export interface Contact {
  id: number;
  url: string;
  icon: string;
  name: string;
}

export interface activateServiceParams {
  id: number;
  serverId: number;
}

export interface user {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
  name: string | null;
  family: string | null;
  dateOfBirth: string | null;
  city: string | null;
  logo: string | null;
  balance: number | null;
  contact: string | null;
  custoremInfo: {
    id: string;
    userId: string;
    rating: number | null;
  };
  executorInfo: {
    id: string;
    userId: string;
    rating: number | null;
    description: null;
    classification: null;
    tags: string[];
    expirience: string;
    costType: string;
    cost: null | number;
  };
}
