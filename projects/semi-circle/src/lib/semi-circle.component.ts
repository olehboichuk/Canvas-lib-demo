import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {
  CircleOptionsModel,
  DrawPieSliceModel,
  DrawTextLineModel,
  DrawTextModel,
  ValueOptionsModel,
  ZoneModel
} from './models/semi-circle.models';

@Component({
  selector: 'lux-semi-circle',
  template: `
    <canvas #canvas [width]="width" [height]="height">
    </canvas>
  `,
  styles: []
})
export class SemiCircleComponent implements OnInit, AfterViewChecked {

  @Input() value = 25;
  @Input() width = 500;
  @Input() height = 500;
  @Input() valueOptions: ValueOptionsModel = {
    maxValue: 50,
    displayZoneLine: true,
    zones: [
      {
        maxPointValue: 25,
        zoneColor: '#259a10',
        textColor: '#e1ac08'
      },
      {
        maxPointValue: 50,
        zoneColor: '#b9081d',
        textColor: '#e1ac08'
      },
      {
        maxPointValue: 45,
        zoneColor: '#161825',
        textColor: '#e1ac08'
      },
      {
        maxPointValue: 10,
        zoneColor: '#fff76c',
        textColor: '#e1ac08'
      },
    ]
  };
  @Input() circleOptions: CircleOptionsModel = {
    backgroundColor: '#262a36',
    fillHeightPercentage: 70,
    fillWightPercentage: 70,
    radius: 200
  };
  @Input() isStartFromCenter = false;
  @ViewChild('canvas') canvasRef: ElementRef;
  private context: CanvasRenderingContext2D;
  private currentFillColor = '';

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    this.context = (this.canvasRef.nativeElement as HTMLCanvasElement).getContext('2d');
    this.fillBackground();

    this.currentFillColor = this.getColor(this.value, this.valueOptions.zones);
    const fillSlice: DrawPieSliceModel = {
      context: this.context,
      centerX: this.width / 2,
      centerY: this.height / 2,
      radius: this.circleOptions.radius / this.valueOptions.maxValue *
        (this.value >= this.valueOptions.maxValue ? this.valueOptions.maxValue : this.value) +
        (this.isStartFromCenter ? 0 :
          this.circleOptions.radius * (1 - this.circleOptions.fillHeightPercentage / 100)),
      startAngle: 3 * Math.PI / 2,
      endAngle: (3 + this.circleOptions.fillWightPercentage / 100) * Math.PI / 2,
      color: this.currentFillColor
    };
    this.drawPieSlice(fillSlice);
    const fillHole: DrawPieSliceModel = {
      context: this.context,
      centerX: this.width / 2,
      centerY: this.height / 2,
      radius: this.circleOptions.radius * (1 - this.circleOptions.fillHeightPercentage / 100),
      startAngle: 3 * Math.PI / 2,
      endAngle: 4 * Math.PI / 2,
      color: this.circleOptions.backgroundColor
    };
    this.drawPieSlice(fillHole);
    this.context.fillStyle = this.currentFillColor;
    this.context.font = Math.ceil(this.circleOptions.radius / 6.6) + 'px Arial';
    this.context.fillText(this.value.toString(), this.width / 2, this.height / 2 - (this.circleOptions.radius > 150 ? 20 : 10));
    this.drawTextValues(this.valueOptions.zones);
    // if (this.value >= this.valueOptions.maxValue) {
    //   this.context.beginPath();
    //   this.context.setLineDash([]);
    //   this.context.lineWidth = 5;
    //   this.context.strokeStyle = this.valueOptions.zones[0].zoneColor;
    // tslint:disable-next-line:max-line-length
    //   this.context.arc(this.width / 2, this.height / 2, this.circleOptions.radius / this.valueOptions.maxValue * this.valueOptions.zones[0].maxPointValue +
    //     (this.isStartFromCenter ? 0 :
    // tslint:disable-next-line:max-line-length
    //       this.circleOptions.radius * (1 - this.circleOptions.fillHeightPercentage / 100)), 3 * Math.PI / 2, (3 + this.circleOptions.fillWightPercentage / 100) * Math.PI / 2);
    //   this.context.stroke();
    // }
  }

  private fillBackground() {
    this.context.fillStyle = this.circleOptions.backgroundColor;
    this.context.fillRect(0, 0, this.width, this.height);
  }

  private drawTextValues(value: ZoneModel[]) {
    const zones = value;
    zones.sort((a, b) => (a.maxPointValue < b.maxPointValue) ? 1 : -1);
    zones.forEach(zone => {
      const text: DrawTextModel = {
        context: this.context,
        value: zone.maxPointValue,
        color: zone.textColor,
        positionX: this.width / 2 - 20,
        positionY: this.height / 2 - this.circleOptions.radius / this.valueOptions.maxValue * zone.maxPointValue -
          (this.isStartFromCenter ? 0 :
            this.circleOptions.radius * (1 - this.circleOptions.fillHeightPercentage / 100)),
      };
      this.drawTextValue(text);
      if (this.valueOptions.displayZoneLine) {
        const line: DrawTextLineModel = {
          context: this.context,
          value: zone.maxPointValue,
          color: zone.textColor,
          positionX: this.width / 2,
          positionY: this.height / 2,
          radius: this.circleOptions.radius / this.valueOptions.maxValue * zone.maxPointValue +
            (this.isStartFromCenter ? 0 :
              this.circleOptions.radius * (1 - this.circleOptions.fillHeightPercentage / 100)),
          startAngle: 3 * Math.PI / 2,
          endAngle: (3 + this.circleOptions.fillWightPercentage / 100) * Math.PI / 2,
        };
        this.drawLine(line);
      }
    });
  }

  private drawTextValue(value: DrawTextModel) {
    value.context.fillStyle = value.color;
    value.context.font = Math.ceil(this.circleOptions.radius / 13.3) + 'px Arial';
    value.context.fillText(value.value.toString(), value.positionX, value.positionY + 5);
  }

  private getColor(value: number, zones: ZoneModel[]): string {
    zones.sort((a, b) => (a.maxPointValue > b.maxPointValue) ? 1 : -1);
    for (const el in zones) {
      if (zones[el].maxPointValue >= value) {
        return zones[el].zoneColor;
      }
    }
    return zones[zones.length - 1].zoneColor;
  }

  private drawPieSlice(value: DrawPieSliceModel) {
    value.context.fillStyle = value.color;
    value.context.beginPath();
    value.context.moveTo(value.centerX, value.centerY);
    value.context.arc(value.centerX, value.centerY, value.radius, value.startAngle, value.endAngle);
    value.context.closePath();
    value.context.fill();
  }

  private drawLine(value: DrawTextLineModel) {
    value.context.setLineDash([3, 3]);
    // value.context.lineWidth = 1;
    value.context.beginPath();
    value.context.strokeStyle = value.color;
    value.context.arc(value.positionX, value.positionY, value.radius, value.startAngle, value.endAngle);
    value.context.stroke();
  }

}
