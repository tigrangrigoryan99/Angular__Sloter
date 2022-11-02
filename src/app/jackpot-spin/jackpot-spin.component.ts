import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-jackpot-spin',
  templateUrl: './jackpot-spin.component.html',
  styleUrls: ['./jackpot-spin.component.css'],
})
export class JackpotSpinComponent implements AfterViewInit {
  private arrImg: Array<string> = [
    '../../assets/sloter/image_1.jpg',
    '../../assets/sloter/image_2.jpg',
    '../../assets/sloter/image_3.jpg',
    '../../assets/sloter/image_4.jpg',
    '../../assets/sloter/image_5.jpg',
    '../../assets/sloter/image_6.jpg',
    // '../../assets/sloter/image_7.jpg',
    // '../../assets/sloter/image_8.jpg',
    // '../../assets/sloter/image_9.jpg',
    // '../../assets/sloter/image_10.jpg',
    // '../../assets/sloter/image_11.jpg',
    // '../../assets/sloter/image_12.jpg',
    // '../../assets/sloter/image_13.jpg',
    // '../../assets/sloter/image_14.jpg',
    // '../../assets/sloter/image_15.jpg',
    // '../../assets/sloter/image_16.jpg',
    // '../../assets/sloter/image_17.jpg',
    // '../../assets/sloter/image_18.jpg',
    // '../../assets/sloter/image_19.jpg',
    // '../../assets/sloter/image_20.jpg',
    // '../../assets/sloter/image_21.jpg',
    // '../../assets/sloter/image_22.jpg',
    // '../../assets/sloter/image_23.jpg',
    // '../../assets/sloter/image_24.jpg',
    // '../../assets/sloter/image_25.jpg',
    // '../../assets/sloter/image_26.jpg',
  ];
  private default: Array<string> = [
    '../../assets/sloter/image_1.jpg',
    '../../assets/sloter/image_25.jpg',
    '../../assets/sloter/image_20.jpg',
    '../../assets/sloter/image_11.jpg',
    '../../assets/sloter/image_13.jpg',
    '../../assets/sloter/image_6.jpg',
  ];
  private columns: any;
  private lastImgArr1: string = '';
  private lastImgArr2: string = '';
  private lastImgArr3: string = '';
  private amountLoop: number = 0;
  public addJackPotClass: boolean = false;

  public slotCombination: number[] = [3, 3, 3, 3, 3, 3];

  @Input('spin') spinEvent!: Observable<any>;

  @ViewChild('columns') column: ElementRef | undefined;

  @HostListener('window:resize')
  onResize() {}

  constructor() {}

  ngOnInit(): void {
    this.spinEvent?.subscribe(() => {
      this.onCilck();
    });
  }

  ngAfterViewInit(): void {
    this.columns = this.column?.nativeElement?.children;

    let ind = 0;
    for (let col of this.columns) {
      const item = col.querySelector('.slot__item');
      const itemClone = item.cloneNode(false);
      const div = document.createElement('div');
      div.classList.add('slot__image');
      div.style.width = '100%';
      div.style.height = '100%';
      div.style.backgroundSize = `${'100%'} ${'100%'}`;
      div.style.backgroundImage = `url(${this.default[ind]})`;
      div.style.backgroundRepeat = 'no-repeat';
      itemClone.appendChild(div);
      col.replaceChild(itemClone, item);
      ind++;
    }
  }

  async onCilck() {
    this.spin(1);

    let duration: number = 1;
    let arrLastItems: Array<string> = [];
    let durSetTim: number = 1;

    for (const col of this.columns) {
      const item = col.querySelector('.slot__item');
      item.style.transitionDuration = `${duration}`;
      item.style.transform = `translateY(0)`;
      await new Promise((resolve) => {
        return setTimeout(resolve, durSetTim * 70);
      });

      arrLastItems.push(
        `${item
          .querySelector('.slot__image')
          .style.backgroundImage.slice(
            5,
            item.querySelector('.slot__image').style.backgroundImage.length - 2
          )}`
      );

      duration += 0.5;
      durSetTim += 1.5;
    }

    this.default = arrLastItems;
    this.amountLoop += 1;
  }

  private spin(duration: number = 1) {
    let ind: number = 0;
    // let randPic: any = this.RandPictur(this.arrImg, true);

    const currentArr: Array<string> = [];
    for (let col of this.columns) {
      const item = col.querySelector('.slot__item');
      const itemClone = item.cloneNode(false);

      currentArr.unshift(this.default[ind]);
      currentArr.push(...this.arrImg);
      // currentArr.push(...this.RandPictur(this.arrImg, false, ind + 1));

      currentArr.push(
        `'../../assets/sloter/image_${this.slotCombination[ind]}.jpg'`
      );

      // if (true) {
      //   currentArr.push(this.arrImg[3]);
      // }

      for (let i = currentArr.length - 1; i >= 0; i--) {
        const div = document.createElement('div');
        div.classList.add('slot__image');
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.backgroundSize = `${'100%'} ${'100%'}`;
        div.style.backgroundImage = `url(${currentArr[i]})`;
        div.style.backgroundRepeat = 'no-repeat';
        itemClone.appendChild(div);
      }

      itemClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      itemClone.style.transform = `translateY(-${
        col.clientHeight * (currentArr.length - 1)
      }px)`;
      col.replaceChild(itemClone, item);

      ind++;
    }
  }

  // private RandPictur(
  //   arr: Array<string>,
  //   getPic: boolean = false,
  //   indImg: number = 1
  // ): Array<string> | string {
  //   if (getPic) {
  //     let newArr = arr.slice(0, 8);
  //     let ind = newArr.length;
  //     const i = Math.floor(Math.random() * ind--);
  //     return newArr[i];
  //   }

  //   let ind = arr.length;
  //   while (ind) {
  //     const i = Math.floor(Math.random() * ind--);
  //     [arr[ind], arr[i]] = [arr[i], arr[ind]];
  //   }
  //   if (indImg === 1) {
  //     this.lastImgArr1 = arr[arr.length - 1];
  //   } else if (indImg === 2) {
  //     this.lastImgArr2 = arr[arr.length - 1];
  //   } else if (indImg === 3) {
  //     this.lastImgArr3 = arr[arr.length - 1];
  //     if (
  //       this.lastImgArr1 === this.lastImgArr2 &&
  //       this.lastImgArr1 === this.lastImgArr3 &&
  //       this.lastImgArr2 === this.lastImgArr3
  //     ) {
  //       if (+arr[arr.length - 1].slice(11, 12) === 1) {
  //         arr[arr.length - 1] = `./sloter/image_${
  //           arr[arr.length - 1].slice(11, 12) + 1
  //         }.jpg`;
  //       } else if (+arr[arr.length - 1].slice(11, 12) <= 8) {
  //         arr[arr.length - 1] = `./sloter/image_${
  //           +arr[arr.length - 1].slice(11, 12) - 1
  //         }.jpg`;
  //       }
  //     }
  //   }
  //   return arr;
  // }
}
