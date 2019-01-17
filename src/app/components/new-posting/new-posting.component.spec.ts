import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostingComponent } from './new-posting.component';

describe('NewPostingComponent', () => {
  let component: NewPostingComponent;
  let fixture: ComponentFixture<NewPostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
