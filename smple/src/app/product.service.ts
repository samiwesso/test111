import { Injectable } from '@angular/core';
import { Product } from '../app/entities/product.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[];

  constructor() {

    this.products = [
      { id: '01', name: 'iPhone XR', price: 599, img: 'assets/iphonexrblack.png' },
      { id: '02', name: 'iPhone 11', price: 999, img: 'assets/iphone11.png' },
      { id: '03', name: 'iPhone 11 Pro Max', price: 1099, img: 'assets/MWYK2.png' },
      { id: '04', name: 'iPhone 8', price: 499, img: 'assets/iphone8.png' },
      { id: '05', name: 'Samsung Galaxy Note 10', price: 1099, img: 'assets/SamsungNote10.png' },
      { id: '06', name: 'Samsung S10', price: 649, img: 'assets/SamsungS10.png' },
      { id: '07', name: 'Samsung Galaxy Fold', price: 1980, img: 'assets/SamsungGalaxyFold.png' },
      { id: '08', name: 'Samsung Galaxy A50', price: 349, img: 'assets/SamsungA50.png' },
    ];
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  getOneProduct(id: string): Product {
    return this.products[this.getSelectedIndex(id)];
  }

  private getSelectedIndex(id: string) {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        return i;
      }
    }
    return -1;
  }


}
