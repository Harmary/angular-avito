export interface CategoryDTO {
  guid: string;
  name: string;
  sections: Section[];
}

interface Section {
  guid: string;
  name: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  guid: string;
  name: string;
}
