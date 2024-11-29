import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmoneyHistoryPage } from './emoney-history.page';

describe('EmoneyHistoryPage', () => {
  let component: EmoneyHistoryPage;
  let fixture: ComponentFixture<EmoneyHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmoneyHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
