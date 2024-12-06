import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PesanandetailPage } from './pesanandetail.page';

describe('PesanandetailPage', () => {
  let component: PesanandetailPage;
  let fixture: ComponentFixture<PesanandetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PesanandetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
