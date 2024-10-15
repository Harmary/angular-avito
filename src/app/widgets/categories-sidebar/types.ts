export interface Category {
  guid: string;
  name: string;
  sections: Section[];
}

export interface Section {
  guid: string;
  name: string;
  subcategories: Subcategory[];
}

export type Subcategory = {
  guid: string;
  name: string;
}
