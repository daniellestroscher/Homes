
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
}

export interface ITenancy{
  tenancyId?: string;
  unitId: string;
  establishedDate: string;
  rent: number | undefined;
  notes?: string;
  assignmentOfLease?: boolean;
  pet?: boolean;
  documents?: File[];

  tenants?: ITenant[];
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
  handleModal: (content: ReactNode | null) => void;
  modalContent?: ReactNode;
  title?: string;
}

