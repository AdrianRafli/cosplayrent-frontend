import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopupPage } from './topup.page';

describe('TopupPage', () => {
  let component: TopupPage;
  let fixture: ComponentFixture<TopupPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
