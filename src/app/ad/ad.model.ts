import {Product} from '../product/product.model';
import {Service} from '../service/service.model';

export class Ad {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public value: number,
    public type: number,
    public products : Product[],
    public services : Service[]
  ) {  }
}