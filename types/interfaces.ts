import { FilePondFile } from "filepond";
import { ReactNode } from "react";

export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
  randomKey: string;
}

interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}
export interface ICommunity {
  id?: string;
  name: string;
  address: string;
  image?: string | File | FilePondFile;
}

export interface IUnit {
  id?: string;
  communityId: string;
  number: string | undefined;

  tenancies?: ITenancy[];
}

export interface ITenancy {
  id?: string;
  unitId: string;
  //recordEffectiveDate: string;
  establishedDate: string;
  //increaseDate: string;
  //rent: number | undefined;
  notes?: string;
  assignmentOfLease?: boolean;
  pet?: boolean;
  documents?: File[] | null;
  activeStatus: boolean;
  previousTenancy: string | null;

  tenants?: ITenant[];
  tenancyVersions?: ITenancyVersions[];
}

export interface ITenancyVersions {
  id?: string;
  recordEffectiveDate: string | undefined;
  rent: number | undefined;
  increaseDate: string | undefined;

  tenancy: ITenancy;
}

export interface ITenant {
  id?: string;
  tenancyId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;

  tenancy: ITenancy
}

export interface ModalContextType {
  isOpen: boolean;
  handleModal: (content: ReactNode | null, title: string) => void;
  modalContent?: ReactNode;
  title?: string;
}
