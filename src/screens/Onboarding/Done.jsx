import React, { useEffect, useState } from "react";


import { verticalScale } from "react-native-size-matters";


import Base from "./Components/Base";
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
  // console.log(photos)
  //  const arr = []
  //  for (let value in form) {
  //    if (form[value] === "") {
  //      console.log('empty string')
  //      arr.push(value)
  //    } else if (form[value].length === 0) {
  //      console.log('empty list')
  //      arr.push(value)
  //    }
  //  }
  //  if (arr.length === 0) {
  //    // submit form
  //    console.log(photos)
    uploadPhotos(photos, user)
    staticUploadThumbnail(photos, user)
    // staticUploadThumbnail(form, user)
     createProfile(form, user)
  //  } else {
  //    setShow({ status:true, message:'Missing required inputs.' })
  //    console.log(arr)
  //  }
 }


 return (
   <Base>
     <Label
       text="All Done!"
       style={{
         marginTop:verticalScale(50),
         marginBottom:verticalScale(20),
         alignSelf:'center'
       }}
     />
     <CustomText
       style={{
         alignSelf:'center',
         fontSize:verticalScale(14)
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
       to move on and get swiping!
     </CustomText>
     <CustomButton
       onClick={() => submit()}
       style={{
         width:'80%',
         alignSelf:'center',
         backgroundColor:colors.accent,
         position:'absolute',
         bottom:verticalScale(130),
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
   </Base>
 )
}
