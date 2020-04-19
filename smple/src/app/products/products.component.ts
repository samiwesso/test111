import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../app/entities/product.entity';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {

    this.products = this.productService.getAllProducts();

  }

}
