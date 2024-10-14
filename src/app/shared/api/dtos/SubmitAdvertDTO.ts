import { Subcategory } from "core/layout/categories-sidebar/types";

export type SubmitAdvertDTO = Partial<{
  subcategory: Subcategory | null | string;
  title: string;
  description: string;
  price: number;
  address: string;
  images: string[];
}>;
