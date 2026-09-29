export type ProductImage = {
  url: string;
  alt: string;
};

export type ProductVariant = {
  size: string;
  color: string;
  stock: number;
};

export type Product = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  images: ProductImage[];
  category: string;
  variants: ProductVariant[];
};
