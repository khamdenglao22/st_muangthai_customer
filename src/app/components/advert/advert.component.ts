import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ComponentsService } from '../components.service';


@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss']
})
export class AdvertComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 100,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  }

  dataBannerAdvertising : any;
  showSlide = false;

  constructor(private service: ComponentsService) {}


  ngOnInit(): void {
    this.service.findAllBannerAdvertising().subscribe((res:any) => {
      this.dataBannerAdvertising = res.data;
      this.showSlide = true;
    })
  }

}
