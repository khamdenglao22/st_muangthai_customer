import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NewsActivitiesService } from '../news-activities.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-news-activities-detail',
  templateUrl: './news-activities-detail.component.html',
  styleUrls: ['./news-activities-detail.component.scss'],
  host: { ngSkipHydration: 'true' },
})
export class NewsActivitiesDetailComponent implements OnInit {
  @Input() showCount = false;

  news_id: any;
  dataNewsDetail: any;
  loading = false;

  showMaskVideo = false;
  previewVideoUrl = '';

  previewImage = false;
  showMask = false;
  currentLightboxImage = '';
  currentIndex = 0;
  controls = true;
  totalImageCount = 0;

  constructor(
    private route: ActivatedRoute,
    private service: NewsActivitiesService,
    private titleService: Title,
    private metaTagService: Meta
  ) {}

  customOptions: OwlOptions = {
    loop: true,
    center: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 100,
    navText: [
      '<img src="assets/images/icon-back.svg" alt="image-news-detail">',
      '<img src="assets/images/icon-next.svg" alt="image-news-detail">',
    ],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    this.loading = false;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.news_id = Number(params.get('id'));
      this.service.findNewsById(this.news_id).subscribe((res: any) => {
        this.dataNewsDetail = res.data;
        // console.log(res.data);
        // console.log('=' + (this.dataNewsDetail.gallery.length == 0));
        if (res.data.gallery.length != 0) {
          this.currentLightboxImage = res.data.gallery[0].image;
        }
        this.totalImageCount = res.data.gallery.length;
        this.previewVideoUrl = res.data.news_video;

        //Test Title
        if (this.dataNewsDetail) {
          this.titleService.setTitle(this.dataNewsDetail.seo_title);
          this.metaTagService.addTags([
            {
              name: 'keywords',
              content: this.dataNewsDetail.seo_key_word,
            },
            {
              name: 'description',
              content: this.dataNewsDetail.seo_description,
            },
          ]);
        }
        this.loading = true;
      });
    });
  }

  onPreviewImage(index: number) {
    this.showMask = true;
    this.previewImage = true;
    this.controls = true;
    this.showCount = true;
    this.currentIndex = index;
    this.currentLightboxImage = this.dataNewsDetail.gallery[index].image;
  }

  onPreviewVideo() {
    this.showMaskVideo = true;
  }

  onClosePreview() {
    this.showMask = false;
    this.showMaskVideo = false;
  }

  next() {
    this.currentIndex = this.currentIndex + 1;
    if (this.currentIndex > this.dataNewsDetail.gallery.length - 1) {
      this.currentIndex = 0;
    }
    this.currentLightboxImage =
      this.dataNewsDetail.gallery[this.currentIndex].image;
  }

  prev() {
    this.currentIndex = this.currentIndex - 1;
    if (this.currentIndex < 0) {
      this.currentIndex = this.dataNewsDetail.gallery.length - 1;
    }
    this.currentLightboxImage =
      this.dataNewsDetail.gallery[this.currentIndex].image;
  }

  getData(data: any) {
    // console.log(data.slides);
  }
}
