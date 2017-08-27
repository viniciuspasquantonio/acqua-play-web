import {Product} from '../product/product.model';
import {Service} from '../service/service.model';

export class Ad {
	id: number;
    title: string;
    description: string;
    price: number;
    type: number;
    products : Product[];
    services : Service[];
    images : string[];
    sellerId: number;
    defaultImage: string;
    categoryId: number;
    keyWords: string;
}