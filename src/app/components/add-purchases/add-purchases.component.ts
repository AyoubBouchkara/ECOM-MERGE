import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-purchases',
  templateUrl: './add-purchases.component.html',
  styleUrls: ['./add-purchases.component.css']
})
export class AddPurchasesComponent implements OnInit {
  @Input() purchasesShow!: boolean;
  @Output() addP = new EventEmitter<FormData>();
  purchasesForm!: FormGroup;

  imgFiles: { [key: string]: File | null } = {
    img1_P: null,
    img2_P: null,
    img3_P: null
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.purchasesForm = this.fb.group({
      nameP: ['', Validators.required],
      titleP: ['', Validators.required],
      descriP: ['', Validators.required],
      feature1_P: [''],
      feature2_P: [''],
      feature3_P: [''],
      quantityP: [0, [Validators.required, Validators.min(1)]],
      priceP: [0, [Validators.required, Validators.min(0)]],
      promoPriceP: [0, [Validators.min(0)]]
    });
  }

  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      this.imgFiles[field] = file;
    }
  }

  onSubmit(): void {
    if (this.purchasesForm.invalid) return;

    const formValue = this.purchasesForm.value;
    const formData = new FormData();

    formData.append('productName', formValue.nameP);
    formData.append('productTitle', formValue.titleP);
    formData.append('productDescription', formValue.descriP);
    formData.append('productFeature1', formValue.feature1_P);
    formData.append('productFeature2', formValue.feature2_P);
    formData.append('productFeature3', formValue.feature3_P);
    formData.append('productquantity', formValue.quantityP.toString());
    formData.append('productPrice', formValue.priceP.toString());
    formData.append('promoPrice', formValue.promoPriceP.toString());

    formData.append('productImg1', this.imgFiles['img1_P'] as File);
    formData.append('productImg2', this.imgFiles['img2_P'] as File);
    formData.append('productImg3', this.imgFiles['img3_P'] as File);

    this.addP.emit(formData);

    this.purchasesForm.reset();
    this.imgFiles = {
      img1_P: null,
      img2_P: null,
      img3_P: null
    };
  }
}
