import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginandregisterComponent } from './loginandregister.component';

describe('LoginandregisterComponent', () => {
  let component: LoginandregisterComponent;
  let fixture: ComponentFixture<LoginandregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginandregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginandregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
