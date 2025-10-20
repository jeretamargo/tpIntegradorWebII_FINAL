export interface Products {
  title: string;
  description: string;
  price: number;
  category_id: number;
  id: number;
  pictures: string[];
  category: Category;
  tags?: Tag[];
}

export interface Category {
  title: string;
  description: string;
  id: number;
  picture: string;
}

export interface Tag {
  title: string;
  id: number;
}
//agrege interface para que lo retorne el fetch de products.ts
export interface Product {
  title: string;
  description: string;
  price: number;
  category_id: number;
  id: number;
  pictures: string[];
  category: {
    title: string;
    description: string;
    id: number;
    picture: string;
  };
  tags: [];
}