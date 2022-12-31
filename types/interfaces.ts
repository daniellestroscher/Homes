export interface IUser{
  id: number;
  email: string;
}

export interface IUnit{
  id: number;
  number: number;
  tenantOne: ITenant;
  tenantTwo?: ITenant;
}

export interface ITenant{
  firstName: string;
  lastName: string;

}