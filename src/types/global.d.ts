/** 
 * These declarations specify how to handle image files 
 * with '.png' and '.jpg' extensions
 * */
declare module '*.png' {
  import type { ImageSourcePropType } from "react-native";
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  import type { ImageSourcePropType } from "react-native";
  const value: ImageSourcePropType;
  export default value;
}