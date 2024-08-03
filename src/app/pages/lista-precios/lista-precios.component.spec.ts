import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPreciosComponent } from './lista-precios.component';

describe('ListaPreciosComponent', () => {
  let component: ListaPreciosComponent;
  let fixture: ComponentFixture<ListaPreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaPreciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
