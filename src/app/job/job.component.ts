import { Component, OnInit } from '@angular/core';
import { JobService } from './job.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  sitekey = environment.recaptcha.siteKey;
  showButton = true;
  dataJob: any;
  fileChoose: any;
  fileName = '';
  ImgName: any;
  showInputFile = true;
  dataFormWork: any;

  constructor(
    // private route: ActivatedRoute,
    private service: JobService
  ) {}

  form = new FormGroup({
    full_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    work_id: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.loadData();
    this.loadFormWork();
  }

  onLogoChange(event: any) {
    this.fileName = '';
    this.fileChoose = event.target.files[0];
    this.fileName = event.target.files[0].name;
    console.log(this.fileChoose.name);
  }

  loadData() {
    this.service.findAllJob().subscribe((res: any) => {
      this.dataJob = res.data;
      // console.log(this.dataJob);
    });
  }

  loadFormWork() {
    this.service.findFormWork().subscribe((res: any) => {
      this.dataFormWork = res.file_name;
      // console.log(res);
    });
  }

  submit() {
    if (this.form.invalid) {
      alert('ປ້ອນຂໍ້ມູນໃຫ້ຄົບ');
      return;
    }
    let formData: any = new FormData();
    formData.append('full_name', this.form.value.full_name);
    formData.append('email', this.form.value.email);
    formData.append('phone', this.form.value.phone);
    formData.append('work_id', this.form.value.work_id);
    formData.append('file_name', this.fileChoose);
    this.showInputFile = false;
    this.service.createApplyWork(formData).subscribe((res: any) => {
      // alert('Successfully...?');
      // this.clearForm();
      if (res.ResCode == 200) {
        alert(res.ResMessage);
        this.clearForm();
        this.showInputFile = true;
      } else {
        alert(res.ResError);
      }
    });
  }

  clearForm() {
    this.form.reset();
    this.fileName = '';
  }

  clickImg(e: any) {
    const staffList = document.querySelector('.staff-lists ');
    const staffImg = document.querySelector('.img-staff-lists');
    this.ImgName = e;
    if (staffList != null) {
      staffList.classList.add('disNone');
    }

    if (staffImg != null) {
      staffImg.classList.add('disBlock');
    }
  }

  backStaffList() {
    const staffList = document.querySelector('.staff-lists ');
    const staffImg = document.querySelector('.img-staff-lists');
    if (staffList != null) {
      staffList.classList.remove('disNone');
    }

    if (staffImg != null) {
      staffImg.classList.remove('disBlock');
    }
  }

  resolved(captchaResponse: any) {
    this.showButton = true;
    this.service.recaptcha(captchaResponse).subscribe((res: any) => {
      // console.log(res)
      if (res.success) {
        this.showButton = false;
      }
    });
  }
}
