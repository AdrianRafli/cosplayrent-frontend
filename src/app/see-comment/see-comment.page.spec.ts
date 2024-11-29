import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeeCommentPage } from './see-comment.page';

describe('SeeCommentPage', () => {
  let component: SeeCommentPage;
  let fixture: ComponentFixture<SeeCommentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
