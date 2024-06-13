import React from "react";
import {
  View
} from 'react-native';
import useGlobal from "../../core/global";



export default function EditProfileScreen({ navigation }) {

  const user = useGlobal(state => state.user)

  console.log(user)

  return (
    <View>

    </View>
  )
}