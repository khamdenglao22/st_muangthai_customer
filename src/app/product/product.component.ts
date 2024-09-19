import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
// import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  sub_id: any;
  dataProduct: Array<any> = [];
  loading = false;
  listMenuName:any;
  categoryName :any;

  constructor(private route: ActivatedRoute, private service: ProductService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.sub_id = Number(params.get('id'));
      // console.log(this.sub_id);
      this.service
        .findProductBySubCategoryId(this.sub_id)
        .subscribe((res: any) => {
          this.dataProduct= res.data;
          // console.log(res.data)
          if(this.dataProduct.length != 0){
            this.listMenuName = res.data[0].ProductCategorySub.name_la
            this.categoryName = res.data[0].ProductCategorySub.ProductCategory.name_la
          }
          // console.log(res.data)
        });
    });

    //Test Title
    // this.titleService.setTitle(`App Prefix - Test Title`);
  }
}
