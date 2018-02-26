import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { ExchangeService } from "../../services/exchange.service";
import { HomeComponent } from './home.component';

let testExchange = {
  rates: {
    EUR: 1
  }
};

describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let exchangeService: ExchangeService;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TextMaskModule, HttpModule],
      declarations: [ HomeComponent ],
      providers: [ ExchangeService ]
    })

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    exchangeService = TestBed.get(ExchangeService);

  });

  it('should calculate number', () => {
    fixture.detectChanges();
    component.referenceText = '456.5';
    let spy = spyOn(exchangeService, 'getExchange').and.returnValue(of(testExchange));
    component.calculateExchangeCurrency();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('.result-exchange'));
      expect(el.nativeElement.value).toBe('396.259');
    })

  });

});
