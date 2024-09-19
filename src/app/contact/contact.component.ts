import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  sitekey = environment.recaptcha.siteKey
  showButton = true

  form = new FormGroup({
    fullName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    des: new FormControl('',[Validators.required]),
    cusPhone:new FormControl('',[Validators.required]),
    contact_phone:new FormControl('',[Validators.required]),
  });


  constructor(
    private service: ContactService
  ) {}


  ngOnInit(): void {
    // this.loadData();
  }



  submit(){

    if (this.form.invalid) {
      alert('ປ້ອນຂໍ້ມູນໃຫ້ຄົບ')
      return
    }

    this.service.createSendMail(this.form.value).subscribe((res:any) => {
      alert('Send Mail Successfully...!');
      this.clearForm();
    })
  }

  clearForm(){
    this.form.reset()
  }


  resolved(captchaResponse: any) {
    this.showButton = true;
    this.service.recaptcha(captchaResponse).subscribe((res:any) => {
      // console.log(res)
      if(res.success){
        this.showButton = false;
      }
    })
  }

}
