import {Color} from "../enums/color.enum";

export class DictionaryHelper {
  static toSpanishColor(color?: Color): string {
    switch (color) {
      case Color.Red:
        return "Rojo";
      case Color.Green:
        return "Verde";
      case Color.Yellow:
        return "Amarillo";
      case Color.Black:
        return "Negro";
      default:
        return "";
    }
  }
}
