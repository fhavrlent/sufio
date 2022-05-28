export type Product = {
  id: number;
  name: string;
  unitPrice: number;
  vat: number;
  stock: number;
};

export type Products = Product[];

export type CartProduct = {
  product: Product;
  quantity: number;
};

export type CartProducts = CartProduct[];

export type CartVat = {
  vat: number;
  itemAmount: number;
  total: number;
};

export type Cart = {
  items: CartProducts;
  vats: CartVat[];
  total: number;
};
