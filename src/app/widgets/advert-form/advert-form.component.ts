import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subcategory } from 'core/layout/categories-sidebar/types';
import { isNil } from 'lodash';
import { nonEmptyArrayValidator } from 'pages/add-advert-page/image-array.validator';
import { MessageService } from 'primeng/api';
import {
  CascadeSelectChangeEvent,
  CascadeSelectModule,
} from 'primeng/cascadeselect';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import {
  distinctUntilChanged,
  map,
  of,
  Subscription,
  switchMap,
} from 'rxjs';
import { CategoriesService, AdvertsService } from 'shared/api/services';
import validateInput from 'shared/lib/validateInput';
import { RequestState } from 'shared/types/RequestState';
import { AddressInputComponent } from 'shared/ui/address-input/address-input.component';
import { ValidationMessageComponent } from 'shared/ui/validation-message/validation-message.component';
import { AsyncWrapperComponent } from "../../shared/ui/async-wrapper/async-wrapper.component";

@Component({
  selector: 'app-advert-form',
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
    AsyncWrapperComponent
],
  providers: [MessageService],
  templateUrl: './advert-form.component.html',
  styleUrl: './advert-form.component.scss',
})
export class AdvertFormComponent implements OnInit {
  readonly validateInput = validateInput;
  private _subscription: Subscription = new Subscription();
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _categoriesService = inject(CategoriesService);
  private _advertService = inject(AdvertsService);

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

  categoriesRequestState: RequestState<any[]> = {
    data: [],
    isLoading: false,
    error: undefined,
  };
  formRequestState: RequestState<any> = {
    data: [],
    isLoading: false,
    error: undefined,
  };

  uploadedFiles: any[] = [];

  readonly advertId$ = this._activatedRoute.params.pipe(
    map((params) => params['advertId'] as string | undefined),
    distinctUntilChanged()
  );
  fileUpload: any;
  images?: string[];

  constructor() {
    this.categoriesRequestState.isLoading = true;
    this._subscription.add(
      this._categoriesService.getCategories().subscribe({
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

  ngOnInit(): void {
    this.formRequestState.isLoading = true;
    this.formRequestState.error = undefined;
    this.advertId$
      .pipe(
        switchMap((adId) => {
          if (!adId) {
            this.formRequestState.isLoading = false;
            return of(null);
          }
          return this._advertService.getAdvertByID(adId).pipe(
            switchMap(([advert]) => {
              return this._categoriesService
                .getCategoryById(advert.subcategory)
                .pipe(
                  map((category) => {
                    let defaultValues = {
                      ...advert,
                      subcategory: category,
                      price: Number(advert.price),
                    };
                    return defaultValues;
                  })
                );
            })
          );
        })
      )
      .subscribe({
        next: (advert) => {
          if (!isNil(advert)) {
            this.formRequestState.isLoading = false;
            this.formRequestState.data = advert;
            this.newAdvertForm.patchValue(advert);
            this.images = advert.images;
          }
        },
        error: () => {
          this.formRequestState.isLoading = false;
          this.formRequestState.error = "Что-то пошло не так";
        },
      });
  }

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

  removeImage(index: number) {
    this.images?.splice(index, 1);
    const images = this.newAdvertForm.value.images || [];
    images.splice(index, 1);
    this.newAdvertForm.patchValue({
      images: images,
    });
  }

  onSubcategoryChange(event: CascadeSelectChangeEvent) {
    const newSelectedSubcategory = event.value;
    this.newAdvertForm.patchValue({ subcategory: newSelectedSubcategory });
  }

  handleFormSubmit() {
    if (this.newAdvertForm.valid) {
      this.formRequestState.isLoading = true;

      const subcategoryGuid = this.newAdvertForm.value.subcategory?.guid;

      if (subcategoryGuid) {
        this._categoriesService.getBreadcrumbs(subcategoryGuid).subscribe({
          next: (breadcrumbs) => {
            if (breadcrumbs) {
              const formData = {
                ...this.formRequestState.data,
                ...this.newAdvertForm.value,
                subcategory: breadcrumbs.subcategory.guid,
                category: breadcrumbs.category.guid,
                section: breadcrumbs.section.guid,
              };

              if (this.formRequestState.data?.id) {
                this._advertService.updateAdvert(formData).subscribe({
                  next: (response) => {
                    this.formRequestState.isLoading = false;
                    this._router.navigate(['ad', response.id]);
                  },
                  error: (error) => {
                    this.formRequestState.isLoading = false;
                    this.formRequestState.error = error;
                  },
                });
              } else {
                this._advertService.submitAdvert(formData).subscribe({
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
            } else {
              this.formRequestState.isLoading = false;
              this.formRequestState.error =
                'Не удалось найти данные для подкатегории';
            }
          },
          error: (error) => {
            this.formRequestState.isLoading = false;
            this.formRequestState.error = error;
          },
        });
      } else {
        this.formRequestState.isLoading = false;
        this.formRequestState.error = 'Подкатегория не выбрана';
      }
    }
  }
}
