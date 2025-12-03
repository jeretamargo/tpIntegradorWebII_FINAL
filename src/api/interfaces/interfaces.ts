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

export interface CartItem {
  id: number;
  name: string;
  price: number;
  picture: string;
  quantity: number;
}

export interface SelectedItem {
  type: string;
  title: string;
  id: number;
}

export interface ProdFormFields {
  id: number;
  title: string;
  description: string;
  image: File;
  tag_ids?: (string | number)[];
  category_id: number;
  price: number;
}

export interface CatFormFields {
  id: number;
  title: string;
  description: string;
  image: File;
}

export interface TagFormFields {
  id: number;
  title: string;
}
export interface GoogleJwt {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
}