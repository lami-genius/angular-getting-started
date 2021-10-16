import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductIT } from "./product-interface";
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class ProductService {

    private productsURL = 'api/products/products.json';

    // constructor
    constructor(private http: HttpClient) { }
    // CRUD
    // R
    // get all products
    getProducts(): Observable<ProductIT[]> {
        return this.http.get<ProductIT[]>(this.productsURL).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        )
    }

    // Get one product
    // Since we are working with a json file, we can only retrieve all products
    // So retrieve all products and then find the one we want using 'map'
    getProduct(id: number): Observable<ProductIT | undefined> {
        return this.getProducts()
            .pipe(
                map((products: ProductIT[]) => products.find(p => p.productId === id))
            );
    }


    private handleError(err: HttpErrorResponse) {
        // error handling 
        return throwError(err);
    }
}




