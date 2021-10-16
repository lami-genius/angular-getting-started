import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { ProductIT } from "./product-interface";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

// OOP
export class ProductListComponent implements OnInit, OnDestroy {

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 4;
    showImage: boolean = false;
    imageActionButtonPrefix: string = 'Show';
    filteredProducts: ProductIT[] = [];
    errorMessage: string = ' ';
    sub!: Subscription;

    // constructor
    constructor(private productService: ProductService) { }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    // standard way of declaring attributes
    private _listFilter: string = '';

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
    }

    products: ProductIT[] = [];


    // method to toggle image display
    toggleImage() {
        // toggle
        this.showImage = !this.showImage;

        // label update
        this.imageActionButtonPrefix = this.showImage ? "Hide" : "Show";

    }

    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage,
        });

    }

    performFilter(value: string): ProductIT[] {
        return this.products.filter((product: ProductIT) => product.productName.toLowerCase().includes(value));
    }

    onRatingEvent(message: string) {
        this.pageTitle = 'Product List ' + message;
    }
}