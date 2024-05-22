// Custom Text component
import React from 'react';
import { 
  Text,
  StyleSheet
} from 'react-native';


const withCustomFont = (WrappedComponent) => {
  const WithCustomFont = ({ style, ...props }) => {
    const mergedStyles = [styles.text, style]
    return <WrappedComponent style={mergedStyles} {...props} />
  }

  return WithCustomFont
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'NotoSans_Condensed-Regular', // default font family
  },
})

export default withCustomFont(Text)