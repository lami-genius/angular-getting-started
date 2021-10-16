import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
    selector: 'product-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges {

    @Input() rating: number = 0;
    cropWidth: number = 75;

    @Output() ratingEvent: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(changes: SimpleChanges): void {
        this.cropWidth = 75 * (this.rating / 5);
    }


    onClick(): void {
        this.ratingEvent.emit(`->The rating is ${this.rating}`);
    }



}