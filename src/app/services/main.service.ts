import { Injectable } from '@angular/core';
import { Pcinfo } from '../pcinfo';
import { Losses } from '../losses';
import { Store } from '../Models/store.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchases } from '../purchases';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class MainService {
  private apiUrl = 'http://localhost:3000/orders/';
  private apiUrlLosses = ' http://localhost:3000/losses/';
  private Url = 'http://localhost:3000/purchases/';
  private storeApi = 'http://localhost:3000/store/';

  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService,
  ) {}

   //#region Orders
  getUsername(){
    const token = this.jwt.decodeToken(localStorage.getItem('token'));
    return token?.name || '';
  }

   getOrders2(){
    let params = { sCode: this.getUsername() };
    return this.http.get<Pcinfo[]>(this.apiUrl, { params });
  }

  getOrders(): Observable<Pcinfo[]>{
    let params = { sCode: this.getUsername() };
    return this.http.get<Pcinfo[]>(this.apiUrl, { params });
  }

  addOrder(data: Pcinfo): Observable<Pcinfo>{
    return this.http.post<Pcinfo>(this.apiUrl, data);
  }

  getOrdersProfits(): Observable<any>{
    let params = { sCode: this.getUsername() };
    return this.http.get<any>('http://localhost:3000/ordersProfits', { params });
  }

  updatePurchase(pcinfo: Pcinfo, nb): Observable<Pcinfo>{
    return this.http.put<Pcinfo>(this.apiUrl+ nb, pcinfo, httpOptions);
  }

  getDataForDelivery(): Observable<Pcinfo[]>{
    let params = { sCode: this.getUsername() };
    return this.http.get<Pcinfo[]>('http://localhost:3000/getDataForDelivery', { params });
  }
  //#endregion Orders

  //#region Losses
  getLosses(): Observable<Losses[]>{
    let params = { sCode: this.getUsername() };
    return this.http.get<Losses[]>(this.apiUrlLosses, { params });
  }

  addLosses(data: Losses): Observable<Losses>{
    return this.http.post<Losses>(this.apiUrlLosses, data);
  }  

  deleteLosses(nb: number): Observable<Losses>{
    return this.http.delete<Losses>(this.apiUrlLosses+ nb);
  }
  //#endregion Losses

  //#region Purchases
  getPurchases(): Observable<Purchases[]>{
    let params = { sCode: this.getUsername() };
    return this.http.get<Purchases[]>(this.Url, { params });
  }

  addPurchases(data: FormData): Observable<any> {
    //data.societeCode = this.getUsername();
    return this.http.post<any>(this.Url, data);
  }

  deletePurchase(nb: number): Observable<Purchases>{
    return this.http.delete<Purchases>(this.Url+ nb);
  }
  //#endregion Purchases

  //#region Store
  getStores(): Observable<Store[]>{
    let params = { sCode: this.getUsername() };
    return this.http.get<Store[]>(this.storeApi, { params });
  }

  addStore(data: Store): Observable<Store>{
    data.societeCode = this.getUsername();
    return this.http.post<Store>(this.storeApi, data);
  }   

  deleteStore(nb: number): Observable<Store>{
    return this.http.delete<Store>(this.storeApi+ nb);
  }
  //#endregion Store

}
