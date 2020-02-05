
export interface IUser {
  id: number;
  name: "Leanne Graham";
  username: "Bret";
  email: "Sincere@april.biz";
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  }
  geo?: {
    lat: string;
    lng: string;
  }
  lat: "-37.3159";
  lng: "81.1496";
  phone?: string;
  website?: string;
}
