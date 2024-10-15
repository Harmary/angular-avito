export interface BreadcrumbsDTO {
  category: Breadcrumb;
  section: Breadcrumb;
  subcategory: Breadcrumb;
}

export interface Breadcrumb {
  guid: string;
  name: string;
}
