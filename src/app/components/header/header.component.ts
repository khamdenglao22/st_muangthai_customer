import { Component, OnInit } from '@angular/core';
import { ComponentsService } from '../components.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showDropdownProduct = false;
  showDropdownProductDetail = false;
  showDropdownServices = false;
  showDropdownServicesDetail = false;
  showDropdownAbout = false;

  dataNewMenu: any;
  dataServiceType: any;
  dataServiceCountry: any;
  dataProductCategory: any;
  dataProductSubCategory: any;

  menuId: number = 0;
  menuSubId: number = 0;

  constructor(private service: ComponentsService, private router: Router) {}

  ngOnInit(): void {
    this.service.findAllServiceType().subscribe((res: any) => {
      this.dataServiceType = res.data;
      // console.log(res.data)

      res.data.map((e: any) => {
        // console.log(e.service_type_la);
      });
    });

    // Product Category
    this.loadProductCategoryMenu();
  }

  clickShowDropdownProduct(id: number) {
    this.menuId = id;
    this.showDropdownAbout = false;
    this.showDropdownServices = false;
    this.showDropdownServicesDetail = false;
    this.showDropdownProduct = !this.showDropdownProduct;
    if (!this.showDropdownProduct) {
      this.showDropdownProductDetail = false;
    }

    const active = document.querySelector('.titleAc');
    if (active != null) {
      active.classList.toggle('active');
    }
  }

  clickShowDropdownProductDetail(cate_id: any) {
    this.showDropdownProductDetail = false;
    this.menuSubId = cate_id;

    console.log(this.menuSubId);

    this.service.findAllSubCategoryOnChange(cate_id).subscribe((res: any) => {
      this.dataProductSubCategory = res.data;
    });
    this.showDropdownProductDetail = !this.showDropdownProductDetail;

    const active = document.querySelector(`.nav-sub.detail`);
    const activeC = document.querySelector(`.active_${this.menuSubId}.active`);
    if (active != null) {
      active.classList.toggle(`active_${this.menuSubId}`);
      if (activeC != null) {
        this.showDropdownProductDetail = !this.showDropdownProductDetail;
      }
    }
  }

  clickShowDropdownService(id: number) {
    this.menuId = id;
    this.showDropdownAbout = false;
    this.showDropdownProduct = false;
    this.showDropdownProductDetail = false;
    this.showDropdownServices = !this.showDropdownServices;
    if (!this.showDropdownServices) {
      this.showDropdownServicesDetail = false;
    }

    const active = document.querySelector('.titleAc');
    if (active != null) {
      active.classList.toggle('active');
    }
  }

  clickShowDropdownServiceDetail(type_id: number | null) {
    // this.showDropdownServices = false;
    this.service.findAllServiceCountry(type_id).subscribe((res: any) => {
      this.dataServiceCountry = res.data;
      if (res.data.length > 1) {
        this.showDropdownServicesDetail = !this.showDropdownServicesDetail;
        // this.clickShowDropdownClose();
      } else {
        this.showDropdownServicesDetail = false;
        this.clickShowDropdownClose();
        this.router.navigate(['/service', res.data[0].id]);
      }
    });
  }

  clickShowDropdownServiceRouter(country_id: any) {
    if (country_id == 4) {
      this.router.navigate(['/service/thai', country_id]);
    } else {
      this.router.navigate(['/service/lao', country_id]);
    }
  }

  clickShowDropdownClose() {
    this.showDropdownProduct = false;
    this.showDropdownProductDetail = false;
    this.showDropdownServices = false;
    this.showDropdownServicesDetail = false;
    this.showDropdownAbout = false;
    this.showDropdownProductDetail = false;
    this.showDropdownProduct = false;
    const active = document.querySelector('.titleAc ');
    if (active != null) {
      active.classList.remove('active');
    }

    this.activeMenuRes();
  }

  clickShowDropdownAbout(id: number) {
    this.menuId = id;
    this.showDropdownProduct = false;
    this.showDropdownProductDetail = false;
    this.showDropdownServices = false;
    this.showDropdownServicesDetail = false;
    this.showDropdownAbout = !this.showDropdownAbout;

    const active = document.querySelector('.titleAc');
    if (active != null) {
      active.classList.toggle('active');
    }
  }

  loadProductCategoryMenu() {
    this.service.findAllProductCategory().subscribe((res: any) => {
      this.dataProductCategory = res.data;
      // console.log(res.data)
    });
  }

  menuActive(id: number) {
    this.menuId = id;
    this.clickShowDropdownClose();

    // this.activeMenuRes();
  }

  activeMenuRes() {
    var titleResMenu = document.querySelector('.navs.res-title');
    var barsRes = document.querySelector('.bars-svg');

    if (titleResMenu != null) {
      titleResMenu.classList.toggle('activeRes');
    }
    if (barsRes != null) {
      barsRes.classList.toggle('activeRes');
    }
  }

  bgCloseMenu() {
    this.activeMenuRes();
  }
}
