import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ServicesService } from '../services.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-service-thai',
  templateUrl: './service-thai.component.html',
  styleUrls: ['./service-thai.component.scss'],
})
export class ServiceThaiComponent implements OnInit {
  service_country_id: any;
  dataSection: any;
  dataLaoByProvCountry: any;
  activeItem: any;
  section_id: any;
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
      this.service.findCountryById(this.service_country_id).subscribe((res:any) => {
        if(res.data){
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
      })
    });
    this.loadDataSection();
  }

  loadDataSection() {
    this.loading = false;
    this.service.findAllSection().subscribe((res: any) => {
      this.dataSection = res.data.sort((p1: any, p2: any) =>
        p2.section_position < p1.section_position
          ? 1
          : p2.section_position > p1.section_position
          ? -1
          : 0
      );
      // console.log(res.data)
      this.loading = true;

      if (this.activeItem === undefined) {
        this.section_id = this.dataSection[0].id;
        this.activeItem = this.dataSection[0].id;
        this.loadThaiBySection(this.section_id);
      }
    });
  }

  loadThaiBySection(section_id: any) {
    this.activeItem = section_id;
    this.service
      .findBySectionAndCountry(this.service_country_id, section_id)
      .subscribe((res: any) => {
        this.dataLaoByProvCountry = res.data;
        // console.log(this.dataLaoByProvCountry)
      });

    this.service
      .findLocationMapBySectionId(section_id)
      .subscribe((res: any) => {
        this.imageMapUrl = res.data.image;
        // console.log(res)
      });
  }
}
