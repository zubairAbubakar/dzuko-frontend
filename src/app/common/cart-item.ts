import { Ad } from './ad';

export class CartItem {

    //item properties 
    id: number;
    name: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;


    constructor(ad: Ad){

        this.id = ad.id;
        this.name = ad.name;
        this.imageUrl = ad.imageUrl;
        this.unitPrice = ad.unitPrice;

        this.quantity = 1;
    }
}
