import { Component, OnInit } from '@angular/core';
import { ComponentsService } from '../components.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  dataSocial : any;

  constructor(private service: ComponentsService) {}


  ngOnInit(): void {
    this.service.findAllSocial().subscribe((res:any) => {
      this.dataSocial = res.data;
      // console.log(res.data)
    })
  }

}
