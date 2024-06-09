import React from "react";
import {
 SafeAreaView,
} from 'react-native';

import { colors } from "../../../constants/colors";


export default function Base({
 children
}) {
 return (
   <SafeAreaView style={{ flex:1, backgroundColor:colors.primary }}>
     {children}
   </SafeAreaView>
 )
}
