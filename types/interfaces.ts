
import { FilePondFile } from "filepond";
import { ReactNode } from "react";

interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}
export interface ICommunity{
  communityId?: number;
  name: string;
  address: string;
  image?: string | File | FilePondFile ;
}

export interface IUnit{
  unitId?: number;
  communityId: string;
  number: number | undefined;
  // tenancy?: ITenancy;
}

export interface ITenancy{
  //unitId
  tenantOne: ITenant; //tenantOneId
  tenantTwo?: ITenant; //tenantTwoId
  rent: number | null;
  notes?: string;
  assignmentOfLease?: boolean;
  pet?: boolean;
  documents?: File | File[];

}

export interface ITenant{
  //tenantId
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

