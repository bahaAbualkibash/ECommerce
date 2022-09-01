import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AccountService} from "../../account/account.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkoutForm!:FormGroup;

  constructor(private accountService: AccountService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  DisplayFieldCss(field: string){
    const group = "addressForm";
    if(this.checkoutForm.get(group)!.get(field)?.invalid && this.checkoutForm.get(group)!.get(field)?.touched){
      return 'is-invalid'
    }else if (this.checkoutForm.get(group)!.get(field)?.valid && this.checkoutForm.get(group)!.get(field)?.touched){
      return 'is-valid'
    }else{
      return '';
    }

  }

  saveUserAddress(){
    this.accountService.updateUserAddress(this.checkoutForm.get('addressForm')?.value).subscribe(() => {
      this.toastr.success('Address saved')
    }, error => this.toastr.error(error))
  }
}
