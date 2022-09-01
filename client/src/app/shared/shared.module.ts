import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from "ngx-bootstrap/pagination";
import { PagingFooterComponent } from './Components/paging-footer/paging-footer.component';
import { PagingHeaderComponent } from './Components/paging-header/paging-header.component';
import {CarouselModule} from "ngx-bootstrap/carousel";
import { OrderTotalsComponent } from './Components/order-totals/order-totals.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CdkStepperModule} from "@angular/cdk/stepper";
import { StepperComponent } from './Components/stepper/stepper.component';
import { BasketSummaryComponent } from './Components/basket-summary/basket-summary.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    PagingFooterComponent,
    PagingHeaderComponent,
    OrderTotalsComponent,
    StepperComponent,
    BasketSummaryComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    CdkStepperModule,
    RouterModule
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagingFooterComponent,
    OrderTotalsComponent,
    ReactiveFormsModule,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent
  ]
})
export class SharedModule { }
