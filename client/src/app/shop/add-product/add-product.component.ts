import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgModel, Validators} from "@angular/forms";
import {ShopService} from "../shop.service";
import {IProductType, IProductTypeDto} from "../../shared/Models/productType";
import {IBrand, IBrandDto} from "../../shared/Models/brand";
import {IProduct} from "../../shared/Models/product";
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbService} from "xng-breadcrumb";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {map} from "rxjs";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  productToUpdate!: IProduct;
  types!: IProductType[];
  brands!: IBrand[];
  file!: File;
  oldTypeId!: number;
  addTypeOrBrand!: string;
  imageBeforeUpdate!: string;
  @Input() isEdit: boolean = false;
  modalRef!: BsModalRef;

  constructor(private shopService: ShopService
              ,private activeRoute: ActivatedRoute
              ,private breadCrumbService: BreadcrumbService,
              private bsmodalService:BsModalService,
              private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params['id'] || null;
    if(id) {
      this.isEdit = true;
      this.breadCrumbService.set('@productEdit', '');
    }
    this.getTypes();
    this.initForm(id);

  }

  initForm(id: number){
    if(!this.isEdit || !id) {
      this.productForm = new FormGroup({
        productName: new FormControl(null, Validators.required),
        productDescription: new FormControl(null, Validators.required),
        productPrice: new FormControl(null, Validators.required),
        productPictureUrl: new FormControl(null, Validators.required),
        productTypeId: new FormControl(0, [Validators.required,Validators.min(1)]),
        productBrandId: new FormControl(0, [Validators.required,Validators.min(1)]),
      });
    }else {
      this.productForm = new FormGroup({
        productName: new FormControl(null, Validators.required),
        productDescription: new FormControl(null, Validators.required),
        productPrice: new FormControl(null, Validators.required),
        productPictureUrl: new FormControl(null),
        productTypeId: new FormControl(0, [Validators.required,Validators.min(1)]),
        productBrandId: new FormControl(0, [Validators.required,Validators.min(1)]),
      })


      this.shopService.getProduct(id).pipe(
        map(x => {
          this.oldTypeId = x.productTypeId;
          this.getBrandsRelativeToTypes(x.productTypeId)

          return x;
        })
      ).subscribe(product => {
        this.productToUpdate = product;
        this.productForm.patchValue({
          productName: product.name,
          productDescription: product.description,
          productPrice: product.price,
          productPictureUrl: "",
          productTypeId: product.productTypeId,
          productBrandId: product.productBrandId
        });
        this.cd.detectChanges();
        this.imageBeforeUpdate = product.pictureUrl;
        this.breadCrumbService.set('@productEdit', `Update ${product.name} `);
      })
    }
    console.log(this.productForm);
  }

  private getTypes() {
   this.shopService.getTypes().subscribe(res => {
     this.types = res;
   });
  }
  private getBrands() {
    this.shopService.getBrands().subscribe(res => {
      this.brands = res;
    });
  }

  private getBrandsRelativeToTypes(typeId: number) {
    this.shopService.getBrands(typeId).subscribe(res => {
      this.brands = res;
    });
  }


  onSubmit() {
    console.log(this.file);
    const formData = new FormData();
    if(this.file !== null)
      formData.append('File', this.file);
    formData.append('ProductToAddDto', JSON.stringify(this.productForm.value));
    if(!this.isEdit)
      this.shopService.addProduct(formData);
    else
      this.shopService.updateProduct(formData, this.productToUpdate.id);

  }

  DisplayFieldCss(field: string){
    if(this.productForm.get(field)?.invalid && this.productForm.get(field)?.touched){
      return 'is-invalid'
    }else if (this.productForm.get(field)?.valid && this.productForm.get(field)?.touched){
      return 'is-valid'
    }else{
      return '';
    }

  }

  onFileChosen($event: any) {

    if($event?.target?.files[0]){
      this.file = $event?.target?.files[0]
    }

    let reader = new FileReader();
    reader.onload = () =>{
      this.imageBeforeUpdate = reader.result as string;
    }

    reader.readAsDataURL(this.file);
  }

  openWindow(template: TemplateRef<any>,name?: string) {
    if(name) this.addTypeOrBrand = name;
    this.modalRef = this.bsmodalService.show(template);
  }

  AddTypeOrBrand(value: string,productTypeId: number) {
    if(productTypeId === 0){
      console.log("There is no type selected")
      return;
    }
    const object: IBrandDto | IProductTypeDto = { name: value, productTypeId: productTypeId}

    if(this.addTypeOrBrand === "Brand"){

      this.shopService.addBrand(object).subscribe((brand) => {
        this.brands.push(brand);
        this.productForm.patchValue({
          productBrandId: brand.id
        })
        this.modalRef.hide();
      },error => this.modalRef.hide())
    }else{
      this.shopService.addType(object).subscribe((type) => {
        this.types.push(type);
        this.productForm.patchValue({
          productBrandId: type.id
        })
        this.modalRef.hide();

      },error => this.modalRef.hide())
    }
  }

  onTypeChanges(value: string) {
    let currentVal = +value;
    if(currentVal === 0){
      this.brands = [];
      return;
    }
    this.oldTypeId = currentVal;
      this.getBrandsRelativeToTypes(currentVal);
  }

}
