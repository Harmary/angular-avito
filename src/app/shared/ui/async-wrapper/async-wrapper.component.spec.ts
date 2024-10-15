import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncWrapperComponent } from './async-wrapper.component';

describe('AsyncWrapperComponent', () => {
  let component: AsyncWrapperComponent;
  let fixture: ComponentFixture<AsyncWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsyncWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsyncWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
