import { fabric } from "fabric";

export type ActiveTool =
  | "select"
  | "shapes"
  | "text"
  | "images"
  | "draw"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "filter"
  | "settings"
  | "ai"
  | "remove-bg"
  | "templates";

export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;

export const CIRCLE_OPTIONS = {
  radius: 150,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};
export const RECTANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 300,
  height: 300,
  angle: 0,
};
export const TRIANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 300,
  height: 300,
  angle: 0,
};
export const DIAMOND_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 300,
  height: 300,
  angle: 0,
};

export type BuildEditorProps = {
  canvas: fabric.Canvas;
  fillColor: string;
  setFillColor: (value: string) => void;
  strokeColor: string;
  setStrokeColor: (value: string) => void;
  strokeWidth: number;
  setStrokeWidth: (value: number) => void;
};

export interface Editor {
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  changeFillColor: (value: string) => void;
  changeStrokeColor: (value: string) => void;
  changeStrokeWidth: (value: number) => void;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
}
