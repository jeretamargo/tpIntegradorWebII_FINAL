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
