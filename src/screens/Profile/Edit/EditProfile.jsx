import React, { useState, useEffect, act } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import CustomText from '../../../components/UI/Custom/CustomText';
import Input from '../../../components/UI/Input';
import Button from '../../../components/Button';
import Interests from '../Create/Interests';
import Snackbar from '../../../components/UI/SnackBar';


import useGlobal from '../../../core/global';
import { colors as c } from '../../../assets/config';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

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
    <SafeAreaView style={{ flex:1, backgroundColor:colors.primary }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false} 
          style={{ padding:30 }}
        >
          <View style={{ alignItems:'center', marginBottom:50 }}>

            <View style={styles.section}>
              <Input 
                colors={colors}
                label="Name"
                editable={true}
                secureTextEntry={false}
                autoCapitalize={false}
                autoCorrect={false}
                keyboardType="default"
                placeholder={user.name}
                value={form.name}
                onChangeText={name => setForm({ ...form, name })}
                width={300}
                height={55}
              />
            </View>

            <View style={styles.section}>
              <Input 
                colors={colors}
                label="Instagram"
                editable={true}
                secureTextEntry={false}
                autoCapitalize={true}
                autoCorrect={false}
                keyboardType="default"
                placeholder={user.instagram ? user.instagram : "@"}
                value={form.instagram}
                onChangeText={instagram => setForm({ ...form, instagram })}
                width={300}
                height={55}
              />
            </View>

            <View style={styles.section}>
              <Input 
                colors={colors}
                label="Snapchat"
                editable={true}
                secureTextEntry={false}
                autoCapitalize={true}
                autoCorrect={false}
                keyboardType="default"
                placeholder={user.snapchat ? user.snapchat : "@"}
                value={form.snapchat}
                onChangeText={snapchat => setForm({ ...form, snapchat })}
                width={300}
                height={55}
              />
            </View>

            <View style={styles.section}>
              <Input 
                colors={colors}
                label="Major"
                editable={true}
                secureTextEntry={false}
                autoCapitalize={true}
                autoCorrect={false}
                keyboardType="default"
                placeholder={user.major ? user.major : "Undecided"}
                value={form.major}
                onChangeText={major => setForm({ ...form, major })}
                width={300}
                height={55}
              />
            </View>

            <View style={{ flexDirection:'row', gap:10 }}>
              <View style={styles.section}>
                <Input 
                  colors={colors}
                  label="Hometown"
                  editable={true}
                  secureTextEntry={false}
                  autoCapitalize={true}
                  autoCorrect={false}
                  keyboardType="default"
                  placeholder={user.city ? user.city : "San Francisco"}
                  value={form.city}
                  onChangeText={city => setForm({ ...form, city })}
                  width={230}
                  height={55}
                />
              </View>

              <View style={styles.section}>
                <Input 
                  colors={colors}
                  label="State"
                  editable={true}
                  secureTextEntry={false}
                  autoCapitalize={true}
                  autoCorrect={false}
                  keyboardType="default"
                  placeholder={user.state ? user.state : "CA"}
                  value={form.state}
                  onChangeText={state => setForm({ ...form, state })}
                  width={70}
                  height={55}
                />
              </View>
            </View>
            
            <View style={styles.section}>
              <Input 
                colors={colors}
                label="Graduation Year"
                editable={true}
                secureTextEntry={false}
                autoCapitalize={true}
                autoCorrect={false}
                keyboardType="default"
                placeholder={user.graduation_year ? user.graduation_year : "2028"}
                value={form.graduation_year}
                onChangeText={graduation_year => setForm({ ...form, graduation_year })}
                width={300}
                height={55}
              />
            </View>

            <View style={styles.section}>
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
                        marginTop:30,
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center'
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
              const resp = editProfile(form, user).then(_ => {
                if (_.status == 200) {
                  setShowSuccess(true)
                } else {
                  setShowError(true)
                }
              })
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
          : <></> 
        }
        { showError 
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
          : <></> 
        }
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  section: {}
})