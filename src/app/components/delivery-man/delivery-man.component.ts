import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-delivery-man',
  templateUrl: './delivery-man.component.html',
  styleUrls: ['./delivery-man.component.css']
})
export class DeliveryManComponent implements OnInit {
  deliveryMen: any[] = [];
  deliveryMan: any = {};
  editing: boolean = false;
  currentId: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  successShow: boolean = false;

  constructor(private deliveryManService: MainService) {}

  ngOnInit(): void {
    this.loadDeliveryMen();
  }

  loadDeliveryMen() {
    this.deliveryManService.getDeliveryMen().subscribe(
      (data) => {
        this.deliveryMen = data;
      },
      (error) => {
        this.errorMessage = error.error || 'Failed to load delivery men.';
      }
    );
  }

  createDeliveryMan() {
    this.deliveryManService.createDeliveryMan(this.deliveryMan).subscribe(
      () => {
        this.loadDeliveryMen();
        this.deliveryMan = {};
        this.successMessage = 'Delivery man added successfully!';
        this.successShow = true;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = error.error || 'Failed to create delivery man.';
      }
    );
  }

  editDeliveryMan(deliveryMan: any) {
    this.deliveryMan = { ...deliveryMan }; // Copy the delivery man details to the form
    this.editing = true; // Set editing state to true
    this.currentId = deliveryMan._id; // Store the current ID for updates
  }

  updateDeliveryMan() {
    this.deliveryManService.updateDeliveryMan(this.currentId, this.deliveryMan).subscribe(
      () => {
        this.loadDeliveryMen();
        this.editing = false;
        this.deliveryMan = {};
        this.successMessage = 'Delivery man updated successfully!';
        this.successShow = true;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = error.error || 'Failed to update delivery man.';
      }
    );
  }

  deleteDeliveryMan(id: string) {
    this.deliveryManService.deleteDeliveryMan(id).subscribe(
      () => {
        this.loadDeliveryMen();
        this.successMessage = 'Delivery man deleted successfully!';
        this.successShow = true;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = error.error || 'Failed to delete delivery man.';
      }
    );
  }

  cancelEdit() {
    this.editing = false;
    this.deliveryMan = {};
    this.successMessage = '';
    this.errorMessage = '';
  }

  toggleSuccess() {
    this.successShow = false; // Hide success alert
  }
}