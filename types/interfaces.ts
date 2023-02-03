
import { FilePondFile } from "filepond";
import { ReactNode } from "react";

interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}
export interface ICommunity{
  communityId?: string;
  name: string;
  address: string;
  image?: string | File | FilePondFile ;
}

export interface IUnit{
  unitId?: string;
  communityId: string;
  number: number | undefined;

  tenancies?: ITenancy[];
}

export interface ITenancy{
  tenancyId?: string;
  unitId: string;
  //recordEffectiveDate: string;
  establishedDate: string;
  //increaseDate: string;
  //rent: number | undefined;
  notes?: string;
  assignmentOfLease?: boolean;
  pet?: boolean;
  documents?: File[];

  tenants?: ITenant[];
  tenancy_versions?: ITenancyVersions[];
}

export interface ITenancyVersions{
  tenancyId: string;
  recordEffectiveDate: string | undefined;
  rent: number | undefined;
  increaseDate: string | undefined;
}

export interface ITenant{
  tenantId?: string;
  tenancyId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
}

export interface ModalContextType {
  isOpen: boolean;
  handleModal: (content: ReactNode | null, title: string) => void;
  //(content: ReactNode, title: string) => void
  modalContent?: ReactNode;
  title?: string;
}

