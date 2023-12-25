import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageNavComponent } from './homepage-nav.component';

describe('HomepageNavComponent', () => {
  let component: HomepageNavComponent;
  let fixture: ComponentFixture<HomepageNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
