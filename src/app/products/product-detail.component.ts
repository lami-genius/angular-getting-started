import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductIT } from './product-interface';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  pageTitle: string = 'Product Detail';
  product: ProductIT | undefined;
  imageWidth: number = 300;
  imageMargin: number = 4;
  sub!: Subscription;


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private productService: ProductService) { }


  ngOnInit(): void {

    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.product = {
      "productId": 1,
      "productName": "Leaf Rake",
      "productCode": "GDN-0011",
      "releaseDate": "March 19, 2021",
      "description": "Leaf rake with 48-inch wooden handle.",
      "price": 19.95,
      "starRating": 3.2,
      "imageUrl": "assets/images/leaf_rake.png"
    };

    this.sub = this.productService.getProduct(id).subscribe({
      next: product => {
        this.product = product;
      },
    });
  }


  onBack(): void {
    this.router.navigate(['/products']);

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}


