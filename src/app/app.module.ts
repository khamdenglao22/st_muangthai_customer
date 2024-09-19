import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {FormsModule , ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdvertComponent } from './components/advert/advert.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ServiceComponent } from './service/service.component';
import { NewsActivitiesComponent } from './news-activities/news-activities.component';
import { NewsActivitiesDetailComponent } from './news-activities/news-activities-detail/news-activities-detail.component';
import { AboutHistoryComponent } from './about/about-history/about-history.component';
import { AboutVisionComponent } from './about/about-vision/about-vision.component';
import { AboutStructureComponent } from './about/about-structure/about-structure.component';
import { ContactComponent } from './contact/contact.component';
import { JobComponent } from './job/job.component';
import { ServiceThaiComponent } from './service/service-thai/service-thai.component';
import { ServiceLaoComponent } from './service/service-lao/service-lao.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { MessengerComponent } from './components/messenger/messenger.component';


import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

import {provideClientHydration} from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    AdvertComponent,
    FooterComponent,
    HeaderComponent,
    ServiceComponent,
    NewsActivitiesComponent,
    NewsActivitiesDetailComponent,
    AboutHistoryComponent,
    AboutVisionComponent,
    AboutStructureComponent,
    ContactComponent,
    JobComponent,
    ServiceLaoComponent,
    ServiceThaiComponent,
    ProductComponent,
    ProductDetailComponent,
    MessengerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent]
})
export class AppModule { }
