import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewHistoryPage } from './review-history.page';

describe('ReviewHistoryPage', () => {
  let component: ReviewHistoryPage;
  let fixture: ComponentFixture<ReviewHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
