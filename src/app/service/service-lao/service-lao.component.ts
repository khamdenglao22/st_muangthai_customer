import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ServicesService } from '../services.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-service-lao',
  templateUrl: './service-lao.component.html',
  styleUrls: ['./service-lao.component.scss'],
})
export class ServiceLaoComponent implements OnInit {
  service_country_id: any;
  dataProvince: any;
  dataLaoByProvCountry: any;
  activeItem: any;
  province_id: any;
  loading = false;
  imageMapUrl: any;

  constructor(
    private route: ActivatedRoute,
    private service: ServicesService,
    private titleService: Title,
    private metaTagService: Meta
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.service_country_id = Number(params.get('id'));
      // console.log(this.service_country_id);
      this.service
        .findCountryById(this.service_country_id)
        .subscribe((res: any) => {
          if (res.data) {
            // console.log(res.data)
            this.titleService.setTitle(res.data.seo_title);
            this.metaTagService.addTags([
              {
                name: 'keywords',
                content: res.data.seo_key_word,
              },
              {
                name: 'description',
                content: res.data.seo_description,
              },
            ]);
          }
        });
    });
    this.loadDataProvince();
  }

  loadDataProvince() {
    this.loading = false;
    this.service
      .findAllProvinceByCountry(this.service_country_id)
      .subscribe((res: any) => {
        // this.dataProvince = res.data;
        this.dataProvince = res.data.sort((p1: any, p2: any) =>
          p2.prov_cd < p1.prov_cd ? 1 : p2.prov_cd > p1.prov_cd ? -1 : 0
        );
        // console.log(res.data)
        this.loading = true;

        if (this.activeItem === undefined) {
          this.province_id = this.dataProvince[0].prov_cd;
          this.activeItem = this.dataProvince[0].prov_cd;
          this.loadLaoByProv(this.province_id);
          // this.loadLaoByProvinceID(this.province_id);
        }
      });
  }

  loadLaoByProv(province_id: any) {
    this.activeItem = province_id;
    this.service
      .findByProvAndCountry(this.service_country_id, province_id)
      .subscribe((res: any) => {
        this.dataLaoByProvCountry = res.data;
        // console.log(this.dataLaoByProvCountry)
      });
    this.loadLaoByProvinceID(province_id);
  }

  loadLaoByProvinceID(province_id: any) {
    this.service
      .findLocationMapByProvinceId(province_id)
      .subscribe((res: any) => {
        this.imageMapUrl = res.data.image;
        // console.log(res)
      });
  }
}
