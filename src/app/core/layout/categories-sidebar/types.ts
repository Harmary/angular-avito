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

export interface Subcategory {
  guid: string;
  name: string;
}
