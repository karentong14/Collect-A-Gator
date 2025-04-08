export interface JournalEntry {
 // _id: string; //do I need this? idk
  token: string;
  title: string;
  content: string;
  date: string;
  location: string;
  latitude: number;
  longitude:number
}