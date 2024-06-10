// import React, { useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   Modal,
//   TouchableOpacity,
//   Dimensions,
//   Pressable,
//   Alert,
// } from 'react-native';

// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import {verticalScale} from 'react-native-size-matters';

// import RoommateMatchingQuiz from '../../RoommateMatchingQuiz';
// import SwipeProfileModal from '../../../components/UI/SwipeProfileModal';
// import CustomText from '../../../components/UI/Custom/CustomText';
// import CustomTextInput from '../../../components/UI/Custom/CustomInput';
// import CustomButton from '../../../components/UI/Custom/CustomButton';
// import CustomLabel from '../../../components/UI/Label';
// import Interests from '../Create/Interests';
// import Snackbar from '../../../components/UI/SnackBar';

// import useGlobal from '../../../core/global';
// import { colors as c } from '../../../assets/config';

// const { width, height } = Dimensions.get('window')


// export default function EditProfile({ navigation }) {

//   const user = useGlobal(state => state.user)
//   const editProfile = useGlobal(state => state.editProfile)
//   const getSwipeProfile = useGlobal(state => state.getSwipeProfile)
//   const deleteProfile = useGlobal(state => state.deleteProfile)
//   const logout = useGlobal(state => state.logout)
//   const theme = useGlobal(state => state.theme)
//   const colors = c[theme] 

//   const [show, setShow] = useState(false)
//   const [showQuiz, setShowQuiz] = useState(false)
//   const [showSuccess, setShowSuccess] = useState(false)
//   const [showPreview, setShowPreview] = useState(false) 
//   const [profile, setProfile] = useState()
//   const [form, setForm] = useState({
//     name: "",
//     instagram: "",
//     snapchat: "",
//     major: "",
//     city: "",
//     state: "",
//     description: "",
//     dorm: "",
//     interests: [],
//     graduation_year: ""
//   })

//   const deleteAccountAlert = () => {
//     Alert.alert(
//       'Do you want to delete your profile?',
//       "Doing so will remove you from our database and you'll have to start over to come back.",
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Delete Account',
//           onPress: () => {
//             // handle delete account
//             deleteProfile(user)
//             logout()
//           },
//           style: 'destructive',
//         },
//       ]
//     )
//   }

//   return (
//     <SafeAreaView 
//       style={{ 
//         flex:1, 
//         backgroundColor:colors.primary 
//       }}
//     >
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={{ flex:1 }}
//       >
//         <View
//           style={{
//             alignItems:'center',
//             justifyContent:'center',
//             marginBottom:verticalScale(5)
//           }}
//         >
//           <CustomText
//             style={{
//               textAlign:'center',
//               color:colors.tertiary,
//               fontSize:16,
//               fontWeight:'600',
//               marginBottom:verticalScale(3),
//             }}
//           >Profile Progress</CustomText>
          
//           <View 
//             style={{
//               width:'70%',
//               height:8,
//               backgroundColor:colors.tertiary,
//               borderRadius:3,
//               overflow:'hidden',
//             }}
//           >
//             <View 
//               style={{ 
//                 width: `${user.progress}%`,
//                 height:8,
//                 backgroundColor:colors.accent,
//                 borderTopRightRadius:3,
//                 borderBottomRightRadius:3,
//               }} 
//             />
//           </View>
//         </View>
        
//         <ScrollView
//           showsVerticalScrollIndicator={false} 
//           style={{ padding:30 }}
//         >
//           <View 
//             style={{ 
//               alignItems:'center', 
//               marginBottom:50,
//             }}
//           >
//             <CustomButton
//               onClick={() => {
//                 const getData = async() => {
//                   const profile = await getSwipeProfile(user, user.id)
//                   const userData = await profile.data
//                   setProfile(userData)
//                   setShowPreview(true)
//                   console.log(userData)
//                 }
//                 getData()
//               }}
//               style={{
//                 width:300,
//                 height:55,
//                 marginBottom:16,
//                 backgroundColor:colors.secondary,
//                 borderColor:colors.accent
//               }}
//             >
//               <CustomText 
//                 style={{ 
//                   fontSize:20, 
//                   fontWeight:'600', 
//                   color:colors.constWhite 
//                 }}
//               >
//                 Preview Profile
//               </CustomText>
//             </CustomButton>

//             <View>
//               <CustomLabel colors={colors} label={'Full Name'} />
//               <CustomTextInput 
//                 placeholder={'👤'}
//                 value={form.name}
//                 onChangeText={name => setForm({ ...form, name })}
//                 colors={colors}
//                 keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
//                 style={{
//                   width:300,
//                   height:55,
//                   marginBottom:16,
//                   backgroundColor:colors.secondary,
//                   color:colors.tint
//                 }}
//               />
//             </View>
            

//             <View>
//               <CustomLabel colors={colors} label={'Instagram'} />
//               <CustomTextInput 
//                 autoCapitalize={false}
//                 placeholder={'@'}
//                 value={form.instagram}
//                 onChangeText={instagram => setForm({ ...form, instagram })}
//                 colors={colors}
//                 keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
//                 style={{
//                   width:300,
//                   height:55,
//                   marginBottom:16,
//                   backgroundColor:colors.secondary,
//                   color:colors.tint
//                 }}
//               />
//             </View>

//             <View>
//               <CustomLabel colors={colors} label={'Snapchat'} />
//               <CustomTextInput 
//                 autoCapitalize={false}
//                 placeholder={'@'}
//                 value={form.snapchat}
//                 onChangeText={snapchat => setForm({ ...form, snapchat })}
//                 colors={colors}
//                 keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
//                 style={{
//                   width:300,
//                   height:55,
//                   marginBottom:16,
//                   backgroundColor:colors.secondary,
//                   color:colors.tint
//                 }}
//               />
//             </View>

//             <View>
//               <CustomLabel colors={colors} label={'Major'} />
//               <CustomTextInput 
//                 placeholder={'🎓'}
//                 value={form.major}
//                 onChangeText={major => setForm({ ...form, major })}
//                 colors={colors}
//                 keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
//                 style={{
//                   width:300,
//                   height:55,
//                   marginBottom:16,
//                   backgroundColor:colors.secondary,
//                   color:colors.tint
//                 }}
//               />
//             </View>

//             <View 
//               style={{ 
//                 flexDirection:'row', 
//                 gap:10
//               }}
//             >
//               <View>
//                 <CustomLabel colors={colors} label={'Hometown'} />
//                 <CustomTextInput 
//                   autoCapitalize={false}
//                   placeholder={'📍'}
//                   value={form.city}
//                   onChangeText={city => setForm({ ...form, city })}
//                   colors={colors}
//                   keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
//                   style={{
//                     width:225,
//                     height:55,
//                     marginBottom:16,
//                     backgroundColor:colors.secondary,
//                     color:colors.tint
//                   }}
//                 />
//               </View>
//               <View>
//                 <CustomLabel colors={colors} label={'State'} />
//                 <CustomTextInput 
//                   autoCapitalize={false}
//                   placeholder={''}
//                   value={form.state}
//                   onChangeText={state => setForm({ ...form, state })}
//                   colors={colors}
//                   keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
//                   style={{
//                     width:65,
//                     height:55,
//                     marginBottom:16,
//                     backgroundColor:colors.secondary,
//                     color:colors.tint
//                   }}
//                 />
//               </View>
//             </View>

//             <View>
//               <CustomLabel colors={colors} label={'Graduation Year'} />
//               <CustomTextInput 
//                 autoCapitalize={false}
//                 placeholder={'📆'}
//                 value={form.graduation_year}
//                 onChangeText={graduation_year => setForm({ ...form, graduation_year })}
//                 colors={colors}
//                 keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
//                 style={{
//                   width:300,
//                   height:55,
//                   marginBottom:16,
//                   backgroundColor:colors.secondary,
//                   color:colors.tint
//                 }}
//               />
//             </View>

//             <View>
//               <CustomLabel colors={colors} label={'Bio'} />
//               <CustomTextInput 
//                 multiline={true}
//                 autoCapitalize={false}
//                 placeholder={'A little bit about me ...'}
//                 value={form.description}
//                 onChangeText={description => setForm({ ...form, description })}
//                 colors={colors}
//                 keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
//                 style={{
//                   width:300,
//                   height:200,
//                   marginBottom:16,
//                   backgroundColor:colors.secondary,
//                   color:colors.tint,
//                   paddingTop:15
//                 }}
//               />
//             </View>

//             <View style={[styles.section, { marginBottom:16 }]}>
//               <TouchableOpacity
//                 onPress={() => setShow(true)}
//                 style={{ 
//                   backgroundColor:colors.secondary,
//                   paddingHorizontal:20,
//                   height:55,
//                   width:300,
//                   borderRadius:12,
//                   fontSize:17,
//                   fontWeight:'500',
//                   borderWidth:1,
//                   borderColor:colors.tertiary,
//                   justifyContent:'space-between',
//                   alignItems:'center',
//                   flexDirection:'row',
//                 }}
//               >
//                 <CustomText 
//                   style={{ 
//                     fontSize:17, 
//                     fontWeight:'600', 
//                     color:colors.tint
//                   }}
//                 >
//                   Interests
//                 </CustomText>
//                 <FontAwesomeIcon 
//                   icon="chevron-right"
//                   size={22}
//                   color={colors.accent}
//                 />
//               </TouchableOpacity>           
//               { setShow 
//                 ? 
//                   <Modal 
//                     animationType="slide" 
//                     visible={show}
//                     presentationStyle='pageSheet'
//                   >
//                     <View
//                       style={{
//                         flex:1,
//                         alignItems:'center',
//                         justifyContent:'center',
//                         backgroundColor:colors.primary
//                       }}
//                     >
//                       <View
//                         style={{
//                           width:width * .7,
//                           justifyContent:'center',
//                           alignItems:'center'
//                         }}
//                       >
//                         <CustomText
//                           style={{
//                             marginVertical:20,
//                             fontSize:20, 
//                             fontWeight:'600', 
//                             color:colors.tint
//                           }}
//                         >
//                           Interests
//                         </CustomText>
//                         <View style={{ height:height*.6 }} >
//                           <Interests colors={colors} form={form} setForm={setForm} />
//                         </View>
//                         <CustomButton
//                           style={{
//                             backgroundColor:colors.accent,
//                             paddingHorizontal:45
//                           }}
//                           onClick={() => setShow(false)}
//                         >
//                           <CustomText
//                             style={{
//                               fontSize:20, 
//                               fontWeight:'600', 
//                               color:colors.constWhite 
//                             }}
//                           >
//                             All Done
//                           </CustomText>
//                         </CustomButton>
//                       </View>
//                     </View>
//                   </Modal>
//                 : null
//               }
//             </View>
//             {/* Roommate Matching Quiz */}
//             <View style={[styles.section, { marginBottom:0 }]}>
//               <TouchableOpacity
//                 onPress={() => {
//                   setShowQuiz(true)
//                 }}
//                 style={{ 
//                   backgroundColor:colors.secondary,
//                   paddingHorizontal:20,
//                   height:55,
//                   width:300,
//                   borderRadius:12,
//                   fontSize:17,
//                   fontWeight:'500',
//                   borderWidth:1,
//                   borderColor:colors.tertiary,
//                   justifyContent:'space-between',
//                   alignItems:'center',
//                   flexDirection:'row',
//                 }}
//               >
//                 <CustomText 
//                   style={{ 
//                     fontSize:17, 
//                     fontWeight:'600', 
//                     color:colors.tint
//                   }}
//                 >
//                   Roommate Matching Quiz
//                 </CustomText>
//                 <FontAwesomeIcon 
//                   icon="chevron-right"
//                   size={22}
//                   color={colors.accent}
//                 />
//               </TouchableOpacity>           
//               { showQuiz
//                 ? 
//                   <Modal 
//                     animationType="slide" 
//                     visible={showQuiz}
//                     presentationStyle='pageSheet'
//                   >
//                     <View
//                       style={{
//                         flex:1,
//                         alignItems:'center',
//                         justifyContent:'center',
//                         backgroundColor:colors.primary
//                       }}
//                     >
//                       <View
//                         style={{
//                           width:width * .8,
//                           justifyContent:'center',
//                           alignItems:'center'
//                         }}
//                       >
//                         <CustomText
//                           style={{
//                             marginVertical:20,
//                             fontSize:20, 
//                             fontWeight:'600', 
//                             color:colors.tint
//                           }}
//                         >
//                           Roommate Matching Quiz
//                         </CustomText>
//                         <View style={{ height:height*.6 }} >
//                           <RoommateMatchingQuiz colors={colors} />
//                         </View>
//                         <CustomButton
//                           style={{
//                             backgroundColor:colors.accent,
//                             paddingHorizontal:45
//                           }}
//                           onClick={() => setShowQuiz(false)}
//                         >
//                           <CustomText
//                             style={{
//                               fontSize:20, 
//                               fontWeight:'600', 
//                               color:colors.constWhite 
//                             }}
//                           >
//                             All Done
//                           </CustomText>
//                         </CustomButton>
//                       </View>
//                     </View>
//                   </Modal>
//                 : null
//               }
//             </View>
//           </View>
//         </ScrollView>

//         <View style={{ paddingHorizontal:45 }}>  
//           <CustomButton
//             style={{
//               backgroundColor:colors.accent,
//               marginTop:15,
//             }}
//             onClick={() => {
//               const updateProfile = async() => {
//                 await editProfile(form, user)                
//               }
//               updateProfile()
//               setShowSuccess(true)
//             }}
//           >
//             <CustomText
//               style={{
//                 fontSize:20, 
//                 fontWeight:'600', 
//                 color:colors.constWhite 
//               }}
//             >
//               All Done
//             </CustomText>
//           </CustomButton>
//           <Pressable 
//             onPress={deleteAccountAlert}
//             style={{
//               flexDirection:'row',
//               gap:5,
//               marginTop:15,
//               justifyContent:'center',
              
//             }}
//           >
//             <CustomText 
//               style={{ 
//                 color:colors.accent, 
//                 fontSize:17, 
//                 fontWeight:'600',
//                 textAlign:'center',
//                 letterSpacing:0.15,
//               }}
//             >
//               Delete Account
//             </CustomText>
//           </Pressable>
//         </View>

//         { showSuccess
//           ? 
//             <Snackbar
//               message="Successfully updated profile"
//               actionText="Dismiss"
//               onActionPress={() => {
//                 setShowSuccess(false)
//               }}
//               duration={5000} // customize duration
//               position="top" // change the position to 'top'/'bottom'
//               backgroundColor={colors.accent} // customize background color
//               textColor={colors.constWhite} // change text color
//               actionTextColor={colors.constWhite} // customize action text color
//               containerStyle={{ marginHorizontal:12 }} // apply additional styling
//               messageStyle={{ fontWeight:'bold' }} // adjust message text styling
//               actionTextStyle={{ }} // customize action text styling
//             />
//           : null
//         }
//         { showPreview
//           ? 
//             <SwipeProfileModal 
//               item={profile}
//               colors={colors}
//               isVisible={showPreview}
//               setIsVisible={setShowPreview}
//             />
//           : null
// 			  }
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   )
// }


// const styles = StyleSheet.create({
//   section: {
//     flex:1, 
//     alignItems:'flex-start', 
//     justifyContent:'flex-start',
//   }
// })