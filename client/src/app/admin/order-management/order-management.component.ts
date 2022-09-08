import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OrdersService} from "../../orders/orders.service";
import {IOrder, OrderStatus, OrderStatusDisplay} from "../../shared/Models/Order";
import {AdminService} from "../admin.service";
import {OrderParams, OrderSortType} from "../../shared/Models/OrderParams";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {IOrderHistory} from "../../shared/Models/OrderHistory";
import {map} from "rxjs";

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  orders!: IOrder[];
  modalRef!: BsModalRef;
  modalRef2!: BsModalRef;
  @ViewChild("options") sortSelectRef!: HTMLOptionsCollection;
  orderParams = new OrderParams();
  totalCount!: number;
  nextStep!:number | undefined;
  selectedOrderCurrentStep!: string[];
  sortOptions = [
    {name: "Order#: low to high",value: OrderSortType.IdAsc},
    {name: "Order#: high to low",value: OrderSortType.IdDesc},
    {name: "Price: low to high",value: OrderSortType.TotalPriceAsc},
    {name: "Price: high to low",value: OrderSortType.TotalPriceDesc},
    {name: "Date: oldest to newest",value: OrderSortType.DateAsc},
    {name: "Date: newest to oldest",value: OrderSortType.DateDesc},
  ]
  OrderStatus = OrderStatus;
  OrderStatusDisplay = OrderStatusDisplay;
  constructor(public ordersService: OrdersService,private adminService: AdminService,
              public bsmodalService: BsModalService) { }

  ngOnInit(): void {
    this.orderParams.pageSize = 5;

    this.getOrders();
  }


  getOrders(){
    this.adminService.getOrdersForAllUsers(this.orderParams).subscribe(response => {
      console.log(response);
      this.totalCount =  response.count;
      this.orderParams.pageSize = response.pageSize;
      this.orderParams.pageNumber = response.pageIndex;
      this.orders = response.data;
    })
  }

  StatusStyle(status: string) {
    if(status === OrderStatusDisplay.Pending || status === OrderStatusDisplay.InProgress||
      status === OrderStatusDisplay.InShipping|| status === OrderStatusDisplay.PaymentRecevied){
      return "bg-warning";
    }else if(   status === OrderStatusDisplay.Canceled|| status === OrderStatusDisplay.PaymentFailed){
      return 'bg-danger'
    }else if( status === OrderStatusDisplay.Delivered){
      return "bg-success";
    }else{
      return 'bg-light'
    }
  }

  onPageChanged($event: number) {
    if(this.orderParams.pageNumber !== $event){
      this.orderParams.pageNumber = $event;
      this.getOrders();
    }
  }

  openWindow(template: TemplateRef<any>, order: IOrder) {
    this.adminService.getHistoryListForOrder(order.id).subscribe((response) => {
      if(response.includes(OrderStatusDisplay.Canceled) || response.includes(OrderStatusDisplay.Delivered) ){
        this.selectedOrderCurrentStep = [response[response.indexOf(OrderStatusDisplay.Canceled)] || response[response.indexOf(OrderStatusDisplay.Delivered)] ]
      }else {
        this.selectedOrderCurrentStep = response;
      }
      this.nextStep = this.selectedOrderCurrentStep.length -1;
      this.modalRef = this.bsmodalService.show(template,{initialState: order});
       this.modalRef.setClass("modal-lg")
    } )

  }
  closeWindow(){
    this.modalRef.hide();
    // this.cancel = undefined;
  }

  onSortSelected(value: string) {
    this.orderParams.sort = +value;
    this.getOrders();
  }

  onDeliveredIncluded() {
    this.orderParams.isDeliveredIncluded = !this.orderParams.isDeliveredIncluded;
    this.getOrders();
  }

  cancelSelected(template: TemplateRef<any>, order: IOrder) {
   this.modalRef2 = this.bsmodalService.show(template, {initialState: order});
  }

  changeIndex($event: number) {
    console.log($event);
    setTimeout(() => {
      this.nextStep = $event
    },20)
  }

  statusChanged($event: string[]) {
    if($event.includes(OrderStatusDisplay.Canceled) || $event.includes(OrderStatusDisplay.Delivered) ){
      this.selectedOrderCurrentStep = [$event[$event.indexOf(OrderStatusDisplay.Canceled)] || $event[$event.indexOf(OrderStatusDisplay.Delivered)] ]
    }else {
      this.selectedOrderCurrentStep = $event;
    }
  }
}
