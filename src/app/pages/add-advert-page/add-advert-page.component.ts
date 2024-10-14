import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import validateInput from 'shared/lib/validateInput';
import { CascadeSelectChangeEvent, CascadeSelectModule } from 'primeng/cascadeselect';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ValidationMessageComponent } from 'shared/ui/validation-message/validation-message.component';
import { Category, Subcategory } from 'core/layout/categories-sidebar/types';
import { Subscription } from 'rxjs';
import { AdvertsService, CategoriesService } from 'shared/api/services';
import { RequestState } from 'shared/types/RequestState';
import { CommonModule } from '@angular/common';

import { MessageService } from 'primeng/api';
import { AddressInputComponent } from '../../shared/ui/address-input/address-input.component';
import { Router } from '@angular/router';
import { nonEmptyArrayValidator } from './image-array.validator';

@Component({
  selector: 'app-add-advert-page',
  standalone: true,
  imports: [
    ValidationMessageComponent,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    InputGroupModule,
    InputGroupAddonModule,
    CascadeSelectModule,
    FileUploadModule,
    ToastModule,
    CommonModule,
    AddressInputComponent,
  ],
  providers: [MessageService],
  templateUrl: './add-advert-page.component.html',
  styleUrl: './add-advert-page.component.scss',
})
export class AddAdvertPageComponent {
  readonly validateInput = validateInput;
  private _subscription: Subscription = new Subscription();
  private _router = inject(Router);

  newAdvertForm = new FormGroup({
    subcategory: new FormControl<Subcategory | null>(null, {
      validators: Validators.required,
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    address: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    images: new FormControl<string[]>([], {
      nonNullable: true,
      validators: [nonEmptyArrayValidator()],
    }),
  });
  categoriesService = inject(CategoriesService);
  advertService = inject(AdvertsService);
  categoriesRequestState: RequestState<any[]> = {
    data: [],
    isLoading: false,
    error: undefined,
  };
  formRequestState: RequestState<any> = {
    data: this.newAdvertForm.value,
    isLoading: false,
    error: undefined,
  };

  uploadedFiles: any[] = [];

  onFileSelect(event: any) {
    const fileReaders: FileReader[] = [];

    for (let file of event.files) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.uploadedFiles.push(base64String);
        const images = this.newAdvertForm.value.images || [];
        this.newAdvertForm.patchValue({
          images: [...images, base64String],
        });
      };
      reader.readAsDataURL(file);
      fileReaders.push(reader);
    }
  }

  constructor() {
    this._subscription.add(
      this.categoriesService.getCategories().subscribe({
        next: (data) => {
          this.categoriesRequestState.data = data;
          this.categoriesRequestState.isLoading = false;
        },
        error: (error) => {
          this.categoriesRequestState.isLoading = false;
          this.categoriesRequestState.error = error.statusText;
        },
      })
    );
  }

  onSubcategoryChange(event: CascadeSelectChangeEvent) {
    const newSelectedSubcategory = event.value;
    this.newAdvertForm.patchValue({ subcategory: newSelectedSubcategory });
  }

  handleFormSubmit() {
    if (this.newAdvertForm.valid) {
      this.formRequestState.isLoading = true;
      const formData = this.newAdvertForm.value;
      this.advertService
        .submitAdvert({ ...formData, subcategory: formData.subcategory?.guid })
        .subscribe({
          next: (response) => {
            this.formRequestState.isLoading = false;
            this._router.navigate(['ad', response.id]);
          },
          error: (error) => {
            this.formRequestState.isLoading = false;
            this.formRequestState.error = error;
          },
        });
    }
  }
}
