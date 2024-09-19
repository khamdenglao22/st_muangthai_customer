import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NewsActivitiesService } from './news-activities.service';

@Component({
  selector: 'app-news-activities',
  templateUrl: './news-activities.component.html',
  styleUrls: ['./news-activities.component.scss'],
})
export class NewsActivitiesComponent implements OnInit {
  page = 0;
  size = 9;
  newsData: any;
  totalPages = 0;
  totalPagesNumber: number[] = [];
  element : any;


  constructor(
    // private route: ActivatedRoute,
    private service: NewsActivitiesService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }


  loadData() {
    this.service.findAllNews(this.page, this.size).subscribe((res: any) => {
      this.newsData = res.dataAll;
      // console.log(this.newsData)
      this.totalPages = res.totalPages;
      for (let i = 1; i <= this.totalPages; i++) {
        this.totalPagesNumber.push(i);
      }
    });
  }

  newPage(page: number, action: string) {
    if (action == 'back' || action == 'newPage') {
      if (page > 0) {
        this.page = page - 1;
        this.totalPagesNumber = [];
        this.loadData();
      }
    } else if (action == 'next') {
      if (this.totalPages - 1 == this.page) {
        return;
      }
      this.page = page + 1;
      this.totalPagesNumber = [];
      this.loadData();
    }
  }
}
