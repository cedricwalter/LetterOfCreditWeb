import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { Invoice } from './../invoice';
import { DocsService } from './../services/docs.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StatusService } from '../services/status.service';
import { RefreshService } from '../services/refresh.service';
import { TourService } from '../services/tour.service';
import { IdentityService } from '../services/identity.service';
import { SelectItem } from 'ng2-select';
import { PeersComponent } from '../peers/peers.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { GraphicalTransactionsService } from '../services/graphical-transactions.service';

@Component({
  selector: 'create-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceCreateComponent {
  @ViewChild('Invoice', { read: ViewContainerRef }) vc: ViewContainerRef;
  inv = new Invoice();
  submitted = false;
  bsModalRef: BsModalRef;
  buyerNameArray: SelectItem[];
  error: boolean;
  glow: boolean;

  constructor(
    private docsService: DocsService,
    private dialog: MatDialog,
    private modalService: BsModalService,
    public statusService: StatusService,
    public refreshService: RefreshService,
    public identityService: IdentityService,
    private tourService: TourService,
    private dialog2: MatDialogRef<InvoiceCreateComponent>,
    private gtService: GraphicalTransactionsService) { }

  lookupBuyer() {
    let dialogRef = this.dialog.open(PeersComponent, { viewContainerRef: this.vc });
    dialogRef.afterClosed().subscribe(result => {
      this.inv.buyerName = this.identityService.peer.name;
      this.glow = false;
    });
  }

  createInvoice(): void {
    if (!this.inv.buyerName) {
      this.error = true;
      return;
    }
    this.error = false;
    this.refreshService.loading = true;
    this.gtService.setMarkers(this.inv.sellerName, this.inv.buyerName);
    this.docsService.createInvoice(this.inv).then(result => this.callResponse(result));
    this.close();
  }

  autoComplete(): void {
    this.identityService.getMe().then(response => this.inv.sellerName = response.json().me);
    let d = new Date();
    this.inv.invoiceDate = d;
    this.inv.invoiceId = Math.round(Math.random() * 1000000).toString();
    this.inv.sellerAddress = 'Dong Men Street';
    this.inv.buyerName = '';
    this.inv.buyerAddress = '3 Smithdown Road. Liverpool, L2 6RE';
    this.inv.term = 5;
    this.inv.goodsDescription = 'OLED 6" Screens';
    this.inv.goodsPurchaseOrderRef = 'REF' + Math.round(Math.random() * 1000000).toString();
    this.inv.goodsQuantity = 100000;
    this.inv.goodsUnitPrice = 13;
    this.inv.goodsGrossWeight = 1000;

    this.glow = true;
  }

  callResponse(result: string): void {
    this.statusService.status = result;
    this.refreshService.confirmMission();
    setTimeout(() => this.tourService.sellerTour.show('invoice-created'), 5000);
    this.refreshService.loading = false;
  }

  close() {
    this.dialog2.close();
  }

  onSubmit() {
    this.submitted = true;
    this.createInvoice();
  }
}
