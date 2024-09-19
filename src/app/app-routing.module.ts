import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { NewsActivitiesComponent } from './news-activities/news-activities.component';
import { NewsActivitiesDetailComponent } from './news-activities/news-activities-detail/news-activities-detail.component';
import { AboutHistoryComponent } from './about/about-history/about-history.component';
import { AboutStructureComponent } from './about/about-structure/about-structure.component';
import { AboutVisionComponent } from './about/about-vision/about-vision.component';
import { ContactComponent } from './contact/contact.component';
import { JobComponent } from './job/job.component';
import { ServiceThaiComponent } from './service/service-thai/service-thai.component';
import { ServiceLaoComponent } from './service/service-lao/service-lao.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path:'',
        component:HomeComponent,
        title:"ST-Muang Thai Insurance"
      },
      {
        path:'service/:id',
        component:ServiceComponent,
      },

      {
        path:'service/thai/:id',
        component:ServiceThaiComponent,
      },

      {
        path:'service/lao/:id',
        component:ServiceLaoComponent,
        title:"ST-Muang Thai Insurance"
      },
      {
        path:'news-activities',
        component:NewsActivitiesComponent,
        title:"ST-Muang Thai Insurance"
      },
      {
        path:'news-activities/detail/:id',
        component:NewsActivitiesDetailComponent
      },
      {
        path:'about/history',
        component:AboutHistoryComponent,
        title:"ST-Muang Thai Insurance"
      },
      {
        path:'about/structure',
        component:AboutStructureComponent,
        title:"ST-Muang Thai Insurance"
      },
      {
        path:'about/vision',
        component:AboutVisionComponent,
        title:"ST-Muang Thai Insurance"
      },
      {
        path:'contact',
        component:ContactComponent,
        title:"ST-Muang Thai Insurance"
      },
      {
        path:'job',
        component:JobComponent,
        title:"ST-Muang Thai Insurance"
      },
      {
        path:'product/:id',
        component:ProductComponent,
        title:"ST-Muang Thai Insurance"
      },
      {
        path:'product/product-detail/:id',
        component:ProductDetailComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
