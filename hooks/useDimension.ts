import { Dimensions } from "react-native";

let { width, height, scale } = Dimensions.get("screen");

const GDim = {
  get width() {
    return width;
  },
  get height() {
    return height;
  },
  get scale() {
    return scale;
  },
  updateDimensions() {
    const {
      width: newWidth,
      height: newHeight,
      scale: newScale,
    } = Dimensions.get("screen");

    width = newWidth;
    height = newHeight;
    scale = newScale;
  },
};

Dimensions.addEventListener("change", GDim.updateDimensions);

export default GDim;
