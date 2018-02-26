import { Component, OnInit, Input } from '@angular/core';
import { ExchangeService } from "../../services/exchange.service";
import { Observable } from 'rxjs/Rx';

import createNumberMask from 'text-mask-addons/dist/createNumberMask'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [
    ExchangeService
  ]
})
export class HomeComponent implements OnInit {

  constructor(
    private exchangeService: ExchangeService,
  ) { }

  @Input() referenceText;
  @Input() exchangeText;

  public mask = createNumberMask({
    prefix: '',
    allowDecimal: true,
    decimalLimit: 4
  });
  public referenceSymbol = '$';
  public exchangeSymbol = '€';

  private referenceName = 'USD';
  private exchangeName = 'EUR'
  // 10 minutes
  private timeToOtherRequest = 10 * 60 * 1000;

  ngOnInit() {
  }

  public calculateExchangeCurrency() {

    let referenceNumber = parseFloat(this.referenceText.replace(/,/g,''))
    return Observable
      .interval(this.timeToOtherRequest)
      .startWith(0)
      .flatMap(() => this.exchangeService.getExchange(this.referenceName, this.exchangeName))
      .subscribe(response => {
        this.exchangeText = response.rates[this.exchangeName] * referenceNumber;
      });

   }

}
