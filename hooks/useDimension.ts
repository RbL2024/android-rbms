import { Dimensions } from "react-native";

let { width, height, scale } = Dimensions.get("window");

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
    } = Dimensions.get("window");

    width = newWidth;
    height = newHeight;
    scale = newScale;
  },
};

Dimensions.addEventListener("change", GDim.updateDimensions);

export default GDim;
