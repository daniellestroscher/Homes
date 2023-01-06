
import { FilePondFile } from "filepond";


export interface IUnit{
  id?: number;
  communityId: string;
  number: number | undefined;
  // tenancy?: ITenancy;
}

export interface ITenancy{
  tenantOne: ITenant;
  tenantTwo?: ITenant;
}

export interface ITenant{
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  pet?: boolean;

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
