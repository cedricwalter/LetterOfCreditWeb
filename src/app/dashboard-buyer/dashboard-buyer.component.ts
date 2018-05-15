import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ApplyModalComponent } from './../modals/apply-modal.component';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
import { ShepherdService } from '../services/shepherd.service';
import { TourService } from '../services/tour.service';

@Component({
  selector: 'dashboard-buyer',
  templateUrl: './dashboard-buyer.component.html',
  styleUrls: ['./dashboard-buyer.component.css']
})
export class DashboardBuyerComponent implements OnInit {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService, private cookieService: CookieService,
    private tourService: TourService) { }

  public openModalWithComponent() {
    this.bsModalRef = this.modalService.show(ApplyModalComponent, Object.assign({}, { class: 'gray modal-lg' }));
    this.bsModalRef.content.title = 'Apply';
  }

  ngOnInit() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('background-image-2');

    let demoDone = this.cookieService.get('buyerDemoDone');
    if (demoDone != 'true') {
      this.tourService.buyerTour.start();
      this.cookieService.put('buyerDemoDone', 'true');
    }
  }
}
