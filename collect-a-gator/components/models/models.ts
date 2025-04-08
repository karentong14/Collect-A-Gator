export interface JournalEntry {
  _id: string; 
  token: string;
  title: string;
  content: string;
  date: string;
  location: string;
  latitude: number;
  longitude:number
}

export interface Collectibles{
  restaurantCounter: number;
  cafeCounter: number;
  natureCounter: number;
  artCounter: number;
  ufCounter: number;
  germainesBool: boolean;
  depotParkBool: boolean;
  karmaCreamBool: boolean;
  butterflyGardenBool: boolean;
  marstonBool: boolean;

}