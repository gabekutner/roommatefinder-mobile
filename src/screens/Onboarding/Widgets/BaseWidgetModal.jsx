import React, { useState } from "react";
import {
  Modal,
  View,
} from 'react-native';

import Base from "../Base";


export default function BaseWidgetModal({
  navigation,
  colors,
  label,
  children
}) {

  const [isVisible, setIsVisible] = useState(true)

  return isVisible ? (
    <Modal 
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      transparent={true}
    >
      <View 
        style={{ 
          backgroundColor:'rgba(0,0,0,0.4)', 
          // flex:1
        }}
      >
        <View
          style={{ 
            backgroundColor:colors.accentDark, 
            marginTop:50, 
            height:'100%',
            borderTopRightRadius:10,
            borderTopLeftRadius:10,
          }}
        >
          <Base 
            navigation={navigation} 
            label={label}
          >
            {children}
          </Base>
        </View>
      </View>
    </Modal>
  ) : null
}