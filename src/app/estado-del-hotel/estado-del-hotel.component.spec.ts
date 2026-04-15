import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoDelHotelComponent } from './estado-del-hotel.component';

describe('EstadoDelHotelComponent', () => {
  let component: EstadoDelHotelComponent;
  let fixture: ComponentFixture<EstadoDelHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoDelHotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoDelHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
