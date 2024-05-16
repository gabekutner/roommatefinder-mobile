import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import Input from '../components/Input';
import Button from '../components/Button';

import useGlobal from '../core/global';
import { colors as c } from '../assets/config';



export default function EditProfile({ navigation }) {

  const user = useGlobal(state => state.user)
  const editProfile = useGlobal(state => state.editProfile)
  const theme = useGlobal(state => state.theme)
  activeColors = c[theme] 

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
              placeholder="Gabe Kutner"
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
              placeholder="@gabekutner"
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
              placeholder="@gkutner34"
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
              placeholder="Computer Engineering"
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
                placeholder="San Francisco"
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
                placeholder="CA"
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
              placeholder="2028"
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
              placeholder="A little about me ..."
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
            <Text>interests</Text>
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
                navigation.navigate('profile')
              } else {
                // error handling
              }
            })
          }}
        />
      </View>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  section: {

  }
})