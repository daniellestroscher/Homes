import { FilePondFile } from "filepond";

export interface IUser{
  id?: number;
  email: string;
}

export interface IUnit{
  id?: number;
  number: number;
  tenantOne: ITenant;
  tenantTwo?: ITenant;
}

export interface ITenant{
  firstName: string;
  lastName: string;

}

interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}
export interface ICommunity{
  id?: number;
  name: string;
  address: string;
  image?: string | File | FilePondFile ;
}
