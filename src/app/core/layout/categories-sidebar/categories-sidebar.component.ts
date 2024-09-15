import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CategoriesService } from './categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories-sidebar',
  standalone: true,
  imports: [
    OverlayPanelModule,
    MenuModule,
    ButtonModule,
    ListboxModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './categories-sidebar.component.html',
  styleUrl: './categories-sidebar.component.scss',
})
export class CategoriesSidebarComponent {
  private subscription: Subscription = new Subscription();
  categoriesService = inject(CategoriesService);
  categories: any[] = [];
  showCategories: boolean = false;
  showSubcategories: boolean = false;
  subcategories: any = [];

  constructor() {
    this.subscription.add(
      this.categoriesService.getCategories().subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (error) => {
          console.error('Error fetching categories:', error);
        },
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }

  openSubcategories(event: any) {
    const { option } = event;
    this.showSubcategories = true;
    this.subcategories = this.categories.find(
      (category) => category.guid === option.guid
    ).subcategories;
  }
}