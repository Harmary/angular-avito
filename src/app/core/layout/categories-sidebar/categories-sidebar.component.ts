import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Subscription } from 'rxjs';
import { Category } from './types';
import { CategoriesService } from 'shared/api/services';
import { RequestState } from 'shared/types/RequestState';

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
  requestState: RequestState<Category[]> = {
    data: [],
    isLoading: false,
    error: undefined
  };
  showCategories: boolean = false;
  showSections: boolean = false;
  selectedCategory?: Category;

  constructor() {
    this.requestState.isLoading = true;
    this.requestState.error = undefined;

    this.subscription.add(
      this.categoriesService.getCategories().subscribe({
        next: (data) => {
          this.requestState.data = data;
          this.requestState.isLoading = false;
        },
        error: (error) => {
          this.requestState.isLoading = false;
          this.requestState.error = error.statusText;
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

  openSections(event: any) {
    const { option } = event;
    this.showSections = true;
    this.selectedCategory = this.requestState?.data?.find(
      (category) => category.guid === option.guid
    );
  }
}
