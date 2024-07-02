import React, { useState } from "react";
import {
  View
} from 'react-native';

import { 
  verticalScale, 
  moderateScale 
} from "react-native-size-matters";

// import Base from "./Components/Base";
import Label from "./Components/Label";
import CustomText from "../../components/UI/Custom/CustomText";
import CustomButton from "../../components/UI/Custom/CustomButton";
import Snackbar from "../../components/UI/SnackBar";

import useGlobal from "../../core/global";
import { colors } from "../../constants/colors";


export default function DoneScreen({navigation}) {

 const user = useGlobal(state => state.user)
 const form = useGlobal(state => state.form)
 const photos = useGlobal(state => state.photos)
 const createProfile = useGlobal(state => state.createProfile)
 const uploadPhotos = useGlobal(state => state.uploadPhotos)
 const staticUploadThumbnail = useGlobal(state => state.staticUploadThumbnail)

 const [show, setShow] = useState({
   status:false,
   message:""
 })

 // form validation & submit
 const submit = () => {
   const arr = []
   for (let value in form) {
     if (form[value] === "") {
       console.log('empty string')
       arr.push(value)
      }
   }
   if (arr.length === 0) {
    uploadPhotos(photos, user)
    staticUploadThumbnail(photos, user)
    createProfile(form, user)
   } else {
      setShow({ status:true, message:'Missing required inputs.' })
   }
 }

 return (
   <>
     <Label
       text="You're all done!"
       style={{
         marginTop:verticalScale(50),
         marginBottom:verticalScale(20),
         alignSelf:'center'
       }}
     />
     <CustomText
       style={{
         alignSelf:'center',
         fontSize:verticalScale(14),
         marginHorizontal:moderateScale(45),
         textAlign:'center'
       }}
     >
       Hit{' '}
       <CustomText
         style={{
           fontSize:verticalScale(14),
           fontWeight:'bold'
         }}
       >
         submit
       </CustomText>
       {' '}
       to create your profile and get swiping!
     </CustomText>

      {/* some kinda photo - simple design, photos of the app, or gif of swiping? */}
      <View 
        style={{ 
          alignSelf:'center',
          marginVertical:verticalScale(20),
          backgroundColor:'#ccc', 
          width:moderateScale(260), 
          height:verticalScale(260),
          // can delete this after later..
          justifyContent:'center',
          alignItems:'center'
        }} 
      >
        <CustomText>Some photo here ...</CustomText>
      </View>

     <CustomButton
       onClick={() => submit()}
       style={{
          width:'80%',
          alignSelf:'center',
          position:'absolute',
          bottom:verticalScale(130),
          backgroundColor:colors.accent,
          paddingVertical:verticalScale(15),
          paddingHorizontal:moderateScale(30),
          shadowColor:'#222',
          shadowOffset: { width:5, height:3 },
          shadowOpacity:1,
          shadowRadius:1, 
          borderRadius:0,
          borderWidth:2
       }}
     >
       <CustomText
         style={{
           fontSize:verticalScale(14),
           color:colors.white,
           fontWeight:'bold'
         }}
       >
         Submit
       </CustomText>
     </CustomButton>

     { show.status
         ?
           <Snackbar
             message={show.message}
             actionText="Dismiss"
             onActionPress={() => {
               setShow(false)
             }}
             duration={5000} // customize duration
             position="top" // change the position to 'top'/'bottom'
             backgroundColor={colors.secondary} // customize background color
             textColor={colors.tint} // change text color
             actionTextColor={colors.tint} // customize action text color
             containerStyle={{ marginHorizontal:12 }} // apply additional styling
             messageStyle={{ fontWeight:'bold' }} // adjust message text styling
             actionTextStyle={{ }} // customize action text styling
           />
         : null
       }
   </>
 )
}
