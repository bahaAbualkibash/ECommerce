import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OrdersService} from "../../orders/orders.service";
import {IOrder, OrderStatus, OrderStatusDisplay} from "../../shared/Models/Order";
import {AdminService} from "../admin.service";
import {OrderParams, OrderSortType} from "../../shared/Models/OrderParams";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  orders!: IOrder[];
  modalRef!: BsModalRef;
  @ViewChild("options") sortSelectRef!: HTMLOptionsCollection;
  orderParams = new OrderParams();
  totalCount!: number;
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
    let x: string =OrderStatus.InProgress.valueOf();
    let y: string =OrderStatus.PaymentRecevied.valueOf();
    switch (status){
      case OrderStatus.Pending.valueOf() ||x || OrderStatus.InShipping.valueOf() || y :
        return "bg-warning";

      case OrderStatus.Canceled.valueOf() || OrderStatus.PaymentFailed.valueOf():
        return "bg-danger";
      case OrderStatus.Delivered.valueOf():
        return "bg-success";
      default : {
        break;
      }
    }
    return  "bg-danger";
  }

  onPageChanged($event: number) {
    if(this.orderParams.pageNumber !== $event){
      this.orderParams.pageNumber = $event;
      this.getOrders();
    }
  }

  openWindow(template: TemplateRef<any>, order: IOrder) {

    this.modalRef = this.bsmodalService.show(template,{initialState: order});
    this.modalRef.setClass("modal-lg")

  }

  onSortSelected(value: string) {
    this.orderParams.sort = +value;
    this.getOrders();
  }

  onDeliveredIncluded() {
    this.orderParams.isDeliveredIncluded = !this.orderParams.isDeliveredIncluded;
    this.getOrders();
  }
}
