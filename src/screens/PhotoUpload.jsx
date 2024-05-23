import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import { launchImageLibrary } from "react-native-image-picker";

import Snackbar from "../components/UI/SnackBar";
import CustomText from "../components/UI/Custom/CustomText";
import Button from "../components/Button";

import useGlobal from "../core/global";
import { colors as c } from "../assets/config";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


export default function PhotoUpload({}) {

  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  const [form, setForm] = useState({
    picture_one: null,
    picture_two: null,
    picture_three: null,
    picture_four: null
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:colors.primary }}>
      <View style={{ marginVertical:30 }}>
        
        <View style={styles.wrapper}>
          <TouchableOpacity 
            style={[styles.upload, { borderColor:colors.tertiary }]}
            onPress={() => {
              launchImageLibrary({ includeBase64:true, }, (response) => {
                if (response.didCancel) return
                const file = response.assets[0]
                setForm({ ...form, picture_one:file })
              })
            }}
          >
            { form.picture_one 
              ? <Image 
                  src={form.picture_one.uri}
                  style={{ height:'100%', width:'100%', borderRadius:10 }}
                />
              : <FontAwesomeIcon 
                  icon="image"
                  size={22}
                  color={colors.tertiary}
                /> 
            }
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.upload, { borderColor:colors.tertiary }]}
            onPress={() => {
              launchImageLibrary({ includeBase64:true, }, (response) => {
                if (response.didCancel) return
                const file = response.assets[0]
                setForm({ ...form, picture_two:file })
              })
            }}
          >
            { form.picture_two 
              ? <Image 
                  src={form.picture_two.uri}
                  style={{ height:'100%', width:'100%', borderRadius:10 }}
                />
              : <FontAwesomeIcon 
                  icon="image"
                  size={22}
                  color={colors.tertiary}
                /> 
            }
          </TouchableOpacity>
        </View>

        <View style={styles.wrapper}>
          <TouchableOpacity 
            style={[styles.upload, { borderColor:colors.tertiary }]}
            onPress={() => {
              launchImageLibrary({ includeBase64:true, }, (response) => {
                if (response.didCancel) return
                const file = response.assets[0]
                setForm({ ...form, picture_three:file })
              })
            }}
          >
            { form.picture_three 
              ? <Image 
                  src={form.picture_three.uri}
                  style={{ height:'100%', width:'100%', borderRadius:10 }}
                />
              : <FontAwesomeIcon 
                  icon="image"
                  size={22}
                  color={colors.tertiary}
                /> 
            }
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.upload, { borderColor:colors.tertiary }]}
            onPress={() => {
              launchImageLibrary({ includeBase64:true, }, (response) => {
                if (response.didCancel) return
                const file = response.assets[0]
                setForm({ ...form, picture_four:file })
              })
            }}
          >
            { form.picture_four 
              ? <Image 
                  src={form.picture_four.uri}
                  style={{ height:'100%', width:'100%', borderRadius:10 }}
                />
              : <FontAwesomeIcon 
                  icon="image"
                  size={22}
                  color={colors.tertiary}
                /> 
            }
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={{ paddingHorizontal:45 }}>  
        <Button
          colors={colors}
          buttonText="All Done"
          onButtonPress={() => {
            // handle button press

            // show snackbar
            setShowSuccess(true)
          }}
        />
      </View>

      { showSuccess
          ? 
            <Snackbar
              message="Successfully uploaded photos"
              actionText="Dismiss"
              onActionPress={() => {
                setShowSuccess(false)
              }}
              duration={5000} // customize duration
              position="top" // change the position to 'top'/'bottom'
              backgroundColor={colors.green} // customize background color
              textColor={colors.constWhite} // change text color
              actionTextColor={colors.constWhite} // customize action text color
              containerStyle={{ marginHorizontal:12 }} // apply additional styling
              messageStyle={{ fontWeight:'bold' }} // adjust message text styling
              actionTextStyle={{ }} // customize action text styling
            />
          : null
        }
        { showError 
          ?
            <Snackbar
              message="Error uploading photos"
              actionText="Dismiss"
              onActionPress={() => {
                setShowError(false)
              }}
              duration={5000} // customize duration
              position="top" // change the position to 'top'/'bottom'
              backgroundColor={colors.accent} // customize background color
              textColor={colors.constWhite} // change text color
              actionTextColor={colors.constWhite} // customize action text color
              containerStyle={{ marginHorizontal:12 }} // apply additional styling
              messageStyle={{ fontWeight:'bold' }} // adjust message text styling
              actionTextStyle={{ }} // customize action text styling
            /> 
          : null
        }

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  wrapper: {
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    gap:15,
    padding:10,
  },  
  upload: {
    borderWidth:.5,
    borderStyle:'dashed',
    borderRadius:10,
    height:160,
    width:160,
    justifyContent:'center',
    alignItems:'center'
  } 
})