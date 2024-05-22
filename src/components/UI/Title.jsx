import React from 'react';
import { Text } from 'react-native';


export default function Title({ text, style }) {
  return <Text style={{...style}}>{text}</Text>
}