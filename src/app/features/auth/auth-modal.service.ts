import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthModalService {
  private isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();

  open() {
    console.log('auth service')
    this.isOpen.next(true);
  }

  close() {
    this.isOpen.next(false);
  }
}
