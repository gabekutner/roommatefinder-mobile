import {fonts} from "../../../constants/fonts";

const textBody = (WrappedComponent) => {
  const withTextBody = ({color, size, ...props}) => {
    const fontSizeStyle = {
      // fontSize: verticalScale(font[fontSize]),
    };
    const mergedStyles = [styles.text, fontSizeStyle, style];
    return <WrappedComponent style={mergedStyles} {...props} />;
  };
  return WithCustomFont;
}