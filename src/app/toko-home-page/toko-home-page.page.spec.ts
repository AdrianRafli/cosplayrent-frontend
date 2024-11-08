import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TokoHomePagePage } from './toko-home-page.page';

describe('TokoHomePagePage', () => {
  let component: TokoHomePagePage;
  let fixture: ComponentFixture<TokoHomePagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TokoHomePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
