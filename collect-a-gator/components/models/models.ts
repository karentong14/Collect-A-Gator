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