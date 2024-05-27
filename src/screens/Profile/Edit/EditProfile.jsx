import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import CustomText from '../../../components/UI/Custom/CustomText';
import CustomTextInput from '../../../components/UI/Custom/CustomInput';
import CustomLabel from '../../../components/UI/Label';
import Button from '../../../components/Button';
import Interests from '../Create/Interests';
import Snackbar from '../../../components/UI/SnackBar';

import useGlobal from '../../../core/global';
import { colors as c } from '../../../assets/config';

const { width, height } = Dimensions.get('window')


export default function EditProfile({ navigation }) {

  const user = useGlobal(state => state.user)
  const editProfile = useGlobal(state => state.editProfile)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme] 

  const [show, setShow] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const [form, setForm] = useState({
    name: "",
    instagram: "",
    snapchat: "",
    major: "",
    city: "",
    state: "",
    description: "",
    dorm: "",
    interests: [],
    graduation_year: ""
  })


  return (
    <SafeAreaView 
      style={{ 
        flex:1, 
        backgroundColor:colors.primary 
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false} 
          style={{ padding:30 }}
        >
          <View 
            style={{ 
              alignItems:'center', 
              marginBottom:50 
            }}
          >

            <View>
              <CustomLabel colors={colors} label={'Full Name'} />
              <CustomTextInput 
                placeholder={'👤'}
                value={form.name}
                onChangeText={name => setForm({ ...form, name })}
                colors={colors}
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                style={{
                  width:300,
                  height:55,
                  marginBottom:16,
                  backgroundColor:colors.secondary,
                  color:colors.tint
                }}
              />
            </View>
            

            <View>
              <CustomLabel colors={colors} label={'Instagram'} />
              <CustomTextInput 
                autoCapitalize={false}
                placeholder={'@'}
                value={form.instagram}
                onChangeText={instagram => setForm({ ...form, instagram })}
                colors={colors}
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                style={{
                  width:300,
                  height:55,
                  marginBottom:16,
                  backgroundColor:colors.secondary,
                  color:colors.tint
                }}
              />
            </View>

            <View>
              <CustomLabel colors={colors} label={'Snapchat'} />
              <CustomTextInput 
                autoCapitalize={false}
                placeholder={'@'}
                value={form.snapchat}
                onChangeText={snapchat => setForm({ ...form, snapchat })}
                colors={colors}
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                style={{
                  width:300,
                  height:55,
                  marginBottom:16,
                  backgroundColor:colors.secondary,
                  color:colors.tint
                }}
              />
            </View>

            <View>
              <CustomLabel colors={colors} label={'Major'} />
              <CustomTextInput 
                placeholder={'🎓'}
                value={form.major}
                onChangeText={major => setForm({ ...form, major })}
                colors={colors}
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                style={{
                  width:300,
                  height:55,
                  marginBottom:16,
                  backgroundColor:colors.secondary,
                  color:colors.tint
                }}
              />
            </View>

            <View 
              style={{ 
                flexDirection:'row', 
                gap:10
              }}
            >
              <View>
                <CustomLabel colors={colors} label={'Hometown'} />
                <CustomTextInput 
                  autoCapitalize={false}
                  placeholder={'📍'}
                  value={form.city}
                  onChangeText={city => setForm({ ...form, city })}
                  colors={colors}
                  keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                  style={{
                    width:225,
                    height:55,
                    marginBottom:16,
                    backgroundColor:colors.secondary,
                    color:colors.tint
                  }}
                />
              </View>
              <View>
                <CustomLabel colors={colors} label={'State'} />
                <CustomTextInput 
                  autoCapitalize={false}
                  placeholder={''}
                  value={form.state}
                  onChangeText={state => setForm({ ...form, state })}
                  colors={colors}
                  keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                  style={{
                    width:65,
                    height:55,
                    marginBottom:16,
                    backgroundColor:colors.secondary,
                    color:colors.tint
                  }}
                />
              </View>
            </View>

            <View>
              <CustomLabel colors={colors} label={'Graduation Year'} />
              <CustomTextInput 
                autoCapitalize={false}
                placeholder={'📆'}
                value={form.graduation_year}
                onChangeText={graduation_year => setForm({ ...form, graduation_year })}
                colors={colors}
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                style={{
                  width:300,
                  height:55,
                  marginBottom:16,
                  backgroundColor:colors.secondary,
                  color:colors.tint
                }}
              />
            </View>

            {/* <View style={styles.section}>
              <Input 
                colors={colors}
                label="Bio"
                editable={true}
                secureTextEntry={false}
                autoCapitalize={false}
                autoCorrect={false}
                keyboardType="default"
                placeholder={user.description ? user.description : "A little bit about me ..."}
                value={form.description}
                onChangeText={description => setForm({ ...form, description })}
                width={300}
                height={200}
                paddingTop={15}
                multiline={true}
              />
            </View> */}
            <View>
              <CustomLabel colors={colors} label={'Bio'} />
              <CustomTextInput 
                multiline={true}
                autoCapitalize={false}
                placeholder={'A little bit about me ...'}
                value={form.description}
                onChangeText={description => setForm({ ...form, description })}
                colors={colors}
                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                style={{
                  width:300,
                  height:200,
                  marginBottom:16,
                  backgroundColor:colors.secondary,
                  color:colors.tint,
                  paddingTop:15
                }}
              />
            </View>

            <View style={[styles.section, { marginBottom:0 }]}>
              <TouchableOpacity
                onPress={() => setShow(true)}
                style={{ 
                  backgroundColor:colors.secondary,
                  paddingHorizontal:20,
                  height:55,
                  width:300,
                  borderRadius:12,
                  fontSize:17,
                  fontWeight:'500',
                  borderWidth:1,
                  borderColor:colors.tertiary,
                  justifyContent:'space-between',
                  alignItems:'center',
                  flexDirection:'row',
                }}
              >
                <CustomText 
                  style={{ 
                    fontSize:17, 
                    fontWeight:'600', 
                    color:colors.tint
                  }}
                >
                  Interests
                </CustomText>
                <FontAwesomeIcon 
                  icon="chevron-right"
                  size={22}
                  color={colors.accent}
                />
              </TouchableOpacity>           
              { setShow 
                ? 
                  <Modal 
                    animationType="slide" 
                    visible={show}
                    presentationStyle='pageSheet'
                  >
                    <View
                      style={{
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:colors.primary
                      }}
                    >
                      <View
                        style={{
                          width:width * .7,
                          justifyContent:'center',
                          alignItems:'center'
                        }}
                      >
                        <CustomText
                          style={{
                            marginVertical:20,
                            fontSize:20, 
                            fontWeight:'600', 
                            color:colors.tint
                          }}
                        >
                          Interests
                        </CustomText>
                        <View style={{ height:height*.6 }} >
                          <Interests colors={colors} form={form} setForm={setForm} />
                        </View>
                        <Button
                          colors={colors}
                          buttonText="All Done"
                          buttonStyle={{ padding:45 }}
                          onButtonPress={() => setShow(false)}
                        />
                      </View>
                    </View>
                  </Modal>
                : <></> 
              }
            </View>
          </View>
        </ScrollView>

        <View style={{ paddingHorizontal:45 }}>  
          <Button
            colors={colors}
            buttonText="All Done"
            onButtonPress={() => {
              const updateProfile = async() => {
                await editProfile(form, user)                
              }
              updateProfile()
              setShowSuccess(true)
            }}
          />
        </View>

        { showSuccess
          ? 
            <Snackbar
              message="Successfully updated profile"
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
        {/* { showError 
          ?
            <Snackbar
              message="Error updating profile"
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
        } */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  section: {
    flex:1, 
    alignItems:'flex-start', 
    justifyContent:'flex-start',
  }
})