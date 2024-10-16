import { Component, inject, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import validateInput from 'shared/lib/validateInput';
import { AddressService } from './address.service';

@Component({
  selector: 'app-address-input',
  standalone: true,
  imports: [ReactiveFormsModule, AutoCompleteModule],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
})
export class AddressInputComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  readonly validateInput = validateInput;
  private searchTerms = new Subject<string>();
  addressService = inject(AddressService);
  suggestions: any[] = [];

  ngOnInit() {
    this.searchTerms
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((term) => this.addressService.searchAddress(term))
      )
      .subscribe((suggestions) => (this.suggestions = suggestions));
  }

  onChange(event: any) {
    const query = event?.target?.value;
    this.searchTerms.next(query);
  }

  onSelect(event: any) {
    const selectedSuggestion = event?.value;
    this.formGroup.patchValue({ address: selectedSuggestion.value });
  }
}
