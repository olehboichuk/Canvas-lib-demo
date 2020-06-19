export class DrawTextModel {
  context: CanvasRenderingContext2D;
  positionX: number;
  positionY: number;
  value: number;
  color: string;
}

export class DrawTextLineModel extends DrawTextModel {
  radius: number;
  startAngle: number;
  endAngle: number;
}

export class DrawPieSliceModel {
  context: CanvasRenderingContext2D;
  centerX: number;
  centerY: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  color: string;
}

export class ZoneModel {
  maxPointValue: number;
  zoneColor: string;
  textColor: string;
}

export class ValueOptionsModel {
  maxValue?: number;
  displayZoneLine: boolean;
  zones: ZoneModel[];
}

export class CircleOptionsModel {
  fillWightPercentage: number;
  fillHeightPercentage: number;
  radius: number;
  backgroundColor: string;
}
