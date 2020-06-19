import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private values = [41, 20, 5, 50, 36, 47];
  private v = 20;

  constructor() {
  }

  get value() {
    return this.v;
  }

  set value(v: number) {
    this.v = v;
  }

  randomValue() {
    for (let i = 0; i < this.values.length; i++) {
      setTimeout(() => {
        this.v = this.values[i];
      }, 2000 * (i + 1));
    }
  }

}
