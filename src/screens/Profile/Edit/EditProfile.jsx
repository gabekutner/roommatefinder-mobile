import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import SnackBar from '../../../components/SnackBarMessage';

import useGlobal from '../../../core/global';
import { colors as c } from '../../../assets/config';


export default function EditProfile({ navigation }) {

  const user = useGlobal(state => state.user)
  const editProfile = useGlobal(state => state.editProfile)
  const theme = useGlobal(state => state.theme)
  activeColors = c[theme] 

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

  // show snackbar
  useEffect(() => {
    if (showSuccess || showError) {
      const toRef = setTimeout(() => {
        setShowSuccess(false)
        setShowError(false)
        clearTimeout(toRef)
      }, 3000)
    }
  }, [showSuccess, showError])

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:activeColors.primary }}>
      <ScrollView
        showsVerticalScrollIndicator={false} 
        style={{ padding:30 }}
      >
        <View style={{ alignItems:'center', marginBottom:50 }}>

          <View style={styles.section}>
            <Input 
              colors={activeColors}
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
              colors={activeColors}
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
              colors={activeColors}
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
              colors={activeColors}
              label="Major"
              editable={true}
              secureTextEntry={false}
              autoCapitalize={true}
              autoCorrect={false}
              keyboardType="default"
              placeholder={user.major ? user.major : "..."}
              value={form.major}
              onChangeText={major => setForm({ ...form, major })}
              width={300}
              height={55}
            />
          </View>


          <View style={{ flexDirection:'row', gap:10 }}>
            <View style={styles.section}>
              <Input 
                colors={activeColors}
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
                colors={activeColors}
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
              colors={activeColors}
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
              colors={activeColors}
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

          <View style={styles.section}>
            {/* make this a separate screen / component
             that can be shared with create-profile */}
            <TouchableOpacity 
              onPress={() => navigation.navigate('edit-interests', { form:form, setForm:setForm })}
              style={{
                paddingHorizontal:20,
                height: 55,
                backgroundColor:activeColors.secondary,
                width:300,
                padding: 12,
                borderWidth:1,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                borderColor:activeColors.tertiary,
              }}
            >
              <Text 
                style={{ 
                    marginRight:'auto', 
                    fontSize:17,
                    fontWeight:'500',
                    color:activeColors.tint
                  }}>
                  Interests
                </Text>
              <FontAwesomeIcon
                color={activeColors.tertiary}
                icon="chevron-right"
                size={22} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal:45 }}>  
        <Button
          colors={activeColors}
          buttonText="All Done"
          onButtonPress={() => {
            const resp = editProfile(form, user).then(_ => {
              if (_.status == 200) {
                // success handling
                setShowSuccess(true)
              } else {
                // error handling
                setShowError(true)
              }
            })
          }}
        />
      </View>

      { showSuccess ? <SnackBar colors={activeColors} message={"Profile updated successfully!"} icon={"square-check"} type={'success'} /> : <></> }
      { showError ? <SnackBar colors={activeColors} message={"Profile update failed"} icon={"square-xmark"} type={'error'} /> : <></> }

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  section: {

  }
})