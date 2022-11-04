import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from '@firebase/util';

import { ListEmpleadoComponent } from './list-empleado.component';

describe('ListEmpleadoComponent', () => {
  let component: ListEmpleadoComponent;
  let fixture: ComponentFixture<ListEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
