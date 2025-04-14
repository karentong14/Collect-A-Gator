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
  counters: {
    restaurant: number;
    cafe: number;
    nature: number;
    art: number;
    uf: number;
  };
  booleans: {
    germaines: boolean;
    depotPark: boolean;
    karmaCream: boolean;
    butterflyGarden: boolean;
    marston: boolean;
  }

}