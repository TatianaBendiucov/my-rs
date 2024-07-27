export interface DetailResult {
  uid: string;
  name: string;
  earthAnimal: boolean;
  earthInsect: boolean;
  avian: boolean;
  canine: boolean;
  feline: boolean;
}

export interface ItemDetailParams {
  uid: string;
}

export interface ItemDetailFullResponse {
  animal: DetailResult;
}