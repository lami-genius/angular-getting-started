import { Component } from "@angular/core";

@Component({
  selector: 'pm-root',  // pm - product managment hence root, root app component
  templateUrl: './app.component.html'   // using directives pm-products from product-list component
})


// Code - (OOP class design) attributes and methods
export class AppComponent {
  pageTitle: string = "Acme Product Management";
}
