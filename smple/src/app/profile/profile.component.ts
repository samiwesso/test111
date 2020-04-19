import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {  ActivatedRoute } from '@angular/router';


import { ProductService } from '../product.service';
import { Product } from '../entities/product.entity';
import { Item } from '../entities/item.entity';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  public user = {};
  public issues = {};

  

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/");
  }
  private items: Item[] = [];
  private total: number = 0;
  private itemQuantity: number = 0;


  ngOnInit() {
    this.authService.getUser().subscribe(data => this.user = data);
    this.authService.getIssues().subscribe(data => this.issues = data);
    

    this.activatedRoute.params.subscribe(params => {
      var id = params['id'];
      if (id) {
        var item: Item = {
          product: this.productService.getOneProduct(id),
          quantity: 1
        };
        if (localStorage.getItem('cart') == null) {
          let cart: any = [];
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          let cart: any = JSON.parse(localStorage.getItem('cart'));
          let index: number = -1;
          for (var i = 0; i < cart.length; i++) {
            let item: Item = JSON.parse(cart[i]);
            if (item.product.id == id) {
              index = i;
              break;
            }
          }
          if (index == -1) {
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
          } else {
           
            let item: Item = JSON.parse(cart[index]);
            item.quantity += 1;
            cart[index] = JSON.stringify(item);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        }
        this.loadCart();
        
      } else {
        this.loadCart();
        
      }
    });

  }
 
  loadCart(): void {
    this.itemQuantity = 0;
    this.total = 0;
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
        product: item.product,
        quantity: item.quantity
      });
      this.total += item.product.price * item.quantity;
      this.itemQuantity += item.quantity;
    }
  }

  remove(id: string): void {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.product.id == id) {

        cart.splice(i, 1);
        break;
        
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
  }
 }