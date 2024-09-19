import { Component, OnInit } from '@angular/core';
import { AboutService } from '../about.service';

@Component({
  selector: 'app-about-structure',
  templateUrl: './about-structure.component.html',
  styleUrls: ['./about-structure.component.scss'],
})
export class AboutStructureComponent implements OnInit {
  image_url: any;
  data: any;

  constructor(private service: AboutService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.findAllAboutStructure().subscribe((res: any) => {
      this.data = res.data;
      this.image_url = res.data[0].image;
      // console.log(res.data);
    });
  }
}
