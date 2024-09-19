import { Component, OnInit } from '@angular/core';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { HomeService } from './home.service';
import { NewsActivitiesService } from '../news-activities/news-activities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { ngSkipHydration: 'true' },
})
export class HomeComponent implements OnInit {
  // showDropdownProduct = false;
  // showDropdownProductDetail = false;
  dataBanner: Array<any> = [];
  imageUrl: any;
  loading = false;

  // dataProductMenu = [
  //   {
  //     product_id: 1,
  //     menu_name: 'ປະກັນຊີວິດ ແບບຕະຫຼອດຊີບ',
  //   },
  //   {
  //     product_id: 1,
  //     menu_name: 'ປະກັນຊີວິດ ແບບອອມຊີບ',
  //   },
  //   {
  //     product_id: 1,
  //     menu_name: 'ປະກັນຊີວິດຜູ້ກູ້',
  //   },
  //   {
  //     product_id: 1,
  //     menu_name: 'ປະກັນກຸ່ມ',
  //   },
  //   {
  //     product_id: 2,
  //     menu_name: 'ປະກັນໄພລົດ',
  //   },
  //   {
  //     product_id: 2,
  //     menu_name: 'ປະກັນໄພຊັບສິນ',
  //   },
  //   {
  //     product_id: 2,
  //     menu_name: 'ປະກັນອຸປະຕີເຫດສ່ວນບຸກຄົນ',
  //   },
  //   {
  //     product_id: 2,
  //     menu_name: 'ປະກັນໄພກໍ່ສ້າງ',
  //   },
  //   {
  //     product_id: 2,
  //     menu_name: 'ປະກັນການຂົນສົ່ງ',
  //   },
  // ];

  dataNewMenu: any;

  dataNews: Array<any> = [];
  page = 0;
  size = 9;
  showSlide = false;
  showNews = false;

  constructor(
    // private route: ActivatedRoute,
    private service: HomeService,
    private newsService: NewsActivitiesService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.loadNewsData();
  }

  loadData() {
    this.service.findAllBanner().subscribe((res: any) => {
      this.dataBanner = res.data;
      this.showSlide = true;
      this.imageUrl = this.dataBanner[0].image;
      this.loading = true;
    });
  }

  loadNewsData() {
    this.newsService.findAllNewsActive().subscribe((res: any) => {
      this.dataNews = res.data;
      this.showNews = true;
      // console.log(res.data)
    });
  }

  // customOptions: OwlOptions = {
  //   center: true,
  //   loop: true,
  //   autoplay: true,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: true,
  //   navSpeed: 600,
  //   // items:2,
  //   navText: ['&#8249', '&#8250;'],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 2
  //     },
  //     740: {
  //       items: 3
  //     }
  //   },
  //   nav: false,
  // };

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 100,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };

  getPassedData(data: any) {
    for (let i = 0; i < data.slides.length; i++) {
      const element = data.slides[i];
      if (element.center) {
        var num = element.id * 1;

        for (let index = 0; index < this.dataBanner.length; index++) {
          const element = this.dataBanner[index];
          if (element.id == num) {
            this.imageUrl = element.image;
          }
        }
      }
    }
  }

  // clickShowDropdownProduct() {
  //   this.showDropdownProduct = !this.showDropdownProduct;
  //   if (!this.showDropdownProduct) {
  //     this.showDropdownProductDetail = false;
  //   }
  // }

  // clickShowDropdownProductDetail(product_id: any) {
  //   // console.log(this.dataProductMenu)
  //   this.showDropdownProductDetail = false;
  //   this.dataNewMenu = this.dataProductMenu.filter(
  //     (item: any) => item.product_id == product_id
  //   );
  //   console.log(this.dataNewMenu);
  //   this.showDropdownProductDetail = !this.showDropdownProductDetail;
  // }
}
