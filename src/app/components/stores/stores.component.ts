import { Component } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent {

  stores;
  newStore = { name: '', description: '', category: '' };
  successText;
  successShow;
  storeId;

  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.getStores();
  }

  getStores(): void {
    this.mainService.getStores().subscribe(res => this.stores = res)
  }
  
  addStore(): void{
    this.mainService.addStore(this.newStore).subscribe((res) => {
      if (res) {
        this.successText = 'Store';
        this.successShow = true; 
        this.stores.push({ ...this.newStore });
        this.newStore = { name: '', description: '', category: '' };

        // Fermer la modal via jQuery Bootstrap
        document.getElementById('confirm-modaldismiss1').click();
      }
    });
  }

  toggleSuccess(): void{
    this.successShow = false;
  }

  onDeleteClick(store) {
    console.log('store: ', store)
    this.storeId = store?._id;
  }

  delete() {
    this.mainService.deleteStore(this.storeId).subscribe(res => {
      console.log('storeId: ', this.storeId);
      if (res) {
        this.stores = this.stores.filter(vl => vl._id !== this.storeId);
      }
    })
  }
}
