import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesaFlowComponent } from './pesa-flow.component';

describe('PesaFlowComponent', () => {
  let component: PesaFlowComponent;
  let fixture: ComponentFixture<PesaFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesaFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesaFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
