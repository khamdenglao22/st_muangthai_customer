import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewportScroller } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  sitekey = environment.recaptcha.siteKey;
  showButton = true;

  p_id: any;
  dataProductDetail: any;
  loading = false;
  listMenuName: any;
  categoryName: any;

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private scroller: ViewportScroller,
    private titleService: Title,
    private metaTagService: Meta
  ) {}

  form = new FormGroup({
    full_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.loading = false;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.p_id = Number(params.get('id'));
      // console.log(this.p_id);
      this.service.findProductById(this.p_id).subscribe((res: any) => {
        this.dataProductDetail = res.data;
        this.loading = true;
        // console.log(res.data)

        //Test Title
        if(this.dataProductDetail){
          this.titleService.setTitle(this.dataProductDetail.seo_title);
          this.metaTagService.addTags([
            {
              name: 'keywords',
              content: this.dataProductDetail.seo_key_word,
            },
            {
              name: 'description',
              content: this.dataProductDetail.seo_description,
            },
          ]);
        }

      });
    });
  }

  submit() {
    if (this.form.invalid) {
      alert('ປ້ອນຂໍ້ມູນໃຫ້ຄົບ');
      return;
    }

    this.service
      .createProductOrder({
        full_name: this.form.value.full_name,
        email: this.form.value.email,
        phone: this.form.value.phone,
        p_id: this.p_id,
      })
      .subscribe((res: any) => {
        // console.log(res)
        if (res.ResCode == 200) {
          alert(res.ResMessage);
          this.clearForm();
        } else {
          alert(res.ResError);
        }
      });
  }
  clearForm() {
    this.form.reset();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  }

  resolved(captchaResponse: any) {
    this.showButton = true;
    this.service.recaptcha(captchaResponse).subscribe((res: any) => {
      // console.log(res);
      if (res.success) {
        this.showButton = false;
      }
    });
  }
}
