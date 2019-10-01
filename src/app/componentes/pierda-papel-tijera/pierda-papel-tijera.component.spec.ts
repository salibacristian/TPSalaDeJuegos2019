import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PierdaPapelTijeraComponent } from './pierda-papel-tijera.component';

describe('PierdaPapelTijeraComponent', () => {
  let component: PierdaPapelTijeraComponent;
  let fixture: ComponentFixture<PierdaPapelTijeraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PierdaPapelTijeraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PierdaPapelTijeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
