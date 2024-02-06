export interface ICreateAccountFormInputValues {
  name: string;
  email: string;
  password: string;
}

export interface ILoginFormInputValues {
  email: string;
  password: string;
}

export interface IBookType {
  name: string;
  description: string;
  price: number;
  lager: number;
  id: string;
  category: string;
}

export interface ICategoryType {
  name: string;
  id: string;
}

export interface IOrderType {
  user: string;
  products: IProductType[];
}

export interface IProductType {
  productId: string;
  quantity: number;
}

export interface IModalType {
  lightbox: boolean;
  login: boolean;
  create: boolean;
  order: boolean;
}
