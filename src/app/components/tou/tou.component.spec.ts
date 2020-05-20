import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TOUComponent } from './tou.component';

describe('TOUComponent', () => {
  let component: TOUComponent;
  let fixture: ComponentFixture<TOUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TOUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TOUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
