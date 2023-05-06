import {Color} from "../enums/color.enum";

export interface Ducky {
  id?: number;
  color?: Color;
  size?: string;
  price?: number;
  quantity?: number;
}
