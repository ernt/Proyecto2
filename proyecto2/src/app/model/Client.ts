import {Region} from './Region';
import {Card} from './Card';

export class Client {
  id: number;
  numberID: string ;
  fistName: string;
  lastName: string;
  email: string;
  photoUrl: string;
  region: Region;
  cards: Card[];

  // tslint:disable-next-line:no-misused-new typedef max-line-length
  constructor(id: number , numberID: string , fistName: string , lastName: string , email: string , photoUrl:string , region: Region , cards : Card[]){
    this.id = id;
    this.numberID = numberID;
    this.fistName = fistName;
    this.lastName = lastName;
    this.email = email;
    this.photoUrl = photoUrl;
    this.region = region;
    this.cards = cards;
  } 
}
