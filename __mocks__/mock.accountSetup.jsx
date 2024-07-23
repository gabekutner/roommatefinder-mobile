import React, {useState} from "react";
import {SafeAreaView, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView} from "react-native";
import {Button, useTheme, TextInput, HelperText, Chip} from "react-native-paper";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {interestsData, dormsData} from "../src/assets/Dictionary"


function MockAccountSetup({ navigation }) {
  const customTheme = useTheme();

  const buttonClick = () => {
    // form validation
    // create profile
    // navigate to app stack!
  }

  // temporary
  const [form, setForm] = useState({
    name: "",
    age: 0,
    sex: "",
    dorm: "",
    major: "",
    home: "",
    about: "",
    interests: [],
    photos: [],
    links: [],
    quotes: [],
    prompts: []
  })

  const hasErrors = () => {
    return form.age < 16 && form.age != 0
  };

  return (
    <SafeAreaView style={{flex:1 , backgroundColor: customTheme.colors.background}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{gap: 10, justifyContent:'center', alignItems: 'center', paddingHorizontal:50}}>
            
            <View style={{ width:200, alignItems:'center', justifyContent:'center', marginVertical:25 }}>
              <Text style={{fontSize:18, fontFamily:'NotoSans_Condensed-Regular', fontWeight:'700', color:customTheme.colors.primary, textAlign:'center'}}>
                Setup your account
              </Text>
            </View>

            {/* photos - grid 4x4 */}
            <View 
              style={{
                height:300, 
                flexDirection:'row',
                gap:10, 
                paddingHorizontal:25, 
                paddingVertical:15, 
                marginBottom:15, 
                // backgroundColor:customTheme.colors.primary,
                borderRadius:12,

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
            >
              <View style={{flex:1, flexDirection:'column', gap:10}}>
                <View style={{ flex:1, borderWidth:2, borderRadius:12, borderColor:customTheme.colors.primary, borderStyle:'dashed', justifyContent: 'center', alignItems:'center' }}>
                  <FontAwesomeIcon icon="image" color={customTheme.colors.primary} />
                </View>
                <View style={{ flex:1, borderWidth:2, borderRadius:12, borderColor:customTheme.colors.primary, borderStyle:'dashed', justifyContent: 'center', alignItems:'center' }}>
                  <FontAwesomeIcon icon="image" color={customTheme.colors.primary}/>
                </View>
              </View>
              <View style={{flex:1, flexDirection:'column', gap:10}}>
              <View style={{ flex:1, borderWidth:2, borderRadius:12, borderStyle:'dashed', borderColor:customTheme.colors.primary, justifyContent: 'center', alignItems:'center' }}>
                  <FontAwesomeIcon icon="image" color={customTheme.colors.primary}/>
                </View>
                <View style={{ flex:1, borderWidth:2, borderRadius:12, borderStyle:'dashed',borderColor:customTheme.colors.primary, justifyContent: 'center', alignItems:'center' }}>
                  <FontAwesomeIcon icon="image" color={customTheme.colors.primary}/>
                </View>
              </View>
            </View>

            {/* name */}
            <TextInput 
              mode="outlined"
              label={<Text>Name<Text style={{color:customTheme.colors.tertiary}}>*</Text></Text>}
              value={form.name}
              onChangeText={text => setForm({...form, name:text})}
              placeholder=""
              outlineColor={customTheme.colors.primary}
              textColor={customTheme.colors.primary}
              keyboardType="default"
              autoCapitalize={true}
              style={{width:'100%'}}
            />
            
            {/* age */}
            {/* requires a change in backend : birthday -> age */}
            <TextInput 
              mode="outlined"
              label={<Text>Age<Text style={{color:customTheme.colors.tertiary}}>*</Text></Text>}
              value={form.age}
              onChangeText={text => setForm({...form, age:text})}
              placeholder=""
              outlineColor={customTheme.colors.primary}
              textColor={customTheme.colors.primary}
              keyboardType="number-pad"
              autoCapitalize={true}
              style={{width:'100%'}}
              maxLength={2}
            />
            {/* need error theme styling */}
            {/* <HelperText type="error" visible={hasErrors()}>
              You must be 16+ to use DormParty.
            </HelperText> */}

            {/* sex */}
            <Text style={{ alignSelf:'flex-start', fontSize:14, fontWeight:'500', fontFamily:'NotoSans_Condensed-Regular', marginTop:10}}>
              Sex
              <Text style={{color:'red'}}>*</Text>
            </Text>
            <View style={{flexDirection:'row', gap:10}}>
              <Chip
                mode="outlined"
                selected={form.sex === 'guy' ? true : false}
                onPress={() => setForm({...form, sex:'guy'})}
                selectedColor={form.sex === 'guy' ? customTheme.colors.secondary : customTheme.colors.primary}
                showSelectedCheck={false}
                style={{ 
                  backgroundColor:form.sex === 'guy' ? customTheme.colors.tertiary : customTheme.colors.background,
                  width:'50%',
                }}
              >
                Guy
              </Chip>
              <Chip
                mode="outlined"
                selected={form.sex === 'girl' ? true : false}
                onPress={() => setForm({...form, sex:'girl'})}
                selectedColor={form.sex === 'girl' ? customTheme.colors.secondary : customTheme.colors.primary}
                showSelectedCheck={false}
                style={{ 
                  backgroundColor:form.sex === 'girl' ? customTheme.colors.tertiary : customTheme.colors.background,
                  width:'50%',
                }}
              >
                Girl
              </Chip>
            </View>

            {/* dorm */}
            <Text style={{ alignSelf:'flex-start', fontSize:14, fontWeight:'500', fontFamily:'NotoSans_Condensed-Regular', marginTop:10}}>
              What dorm are you living in?
              <Text style={{color:'red'}}>*</Text>
            </Text>
            <View style={{flexDirection:'row', overflow:'hidden', flexWrap:'wrap'}}>
              {dormsData.map((_, index) => (
                <Chip
                  key={index}
                  mode="outlined"
                  onPress={() => setForm({...form, dorm:_.id})}
                  selected={form.dorm === _.id ? true : false}
                  selectedColor={form.dorm === _.id ? customTheme.colors.secondary : customTheme.colors.primary}
                  showSelectedCheck={false}
                  style={{
                    margin:4,
                    backgroundColor:form.dorm === _.dorm ? customTheme.colors.tertiary : customTheme.colors.background,
                  }}
                >
                  {_.dorm}
                </Chip>
              ))}
            </View>

            {/* interests */}
            <Text style={{ alignSelf:'flex-start', marginTop:15, fontSize:14, fontWeight:'500', color:customTheme.colors.primary }}>
              Pick 1 to 5 interests
              <Text style={{color:customTheme.colors.tertiary}}>*</Text>
            </Text>
            <View
              style={{
                height:300, 
                width:'100%',
                flexDirection:'row',
                gap:10, 
                paddingHorizontal:25, 
                paddingVertical:15, 
                marginBottom:15, 
                backgroundColor:customTheme.colors.secondary,
                borderRadius:12,

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
            >
              <ScrollView showsVerticalScrollIndicator={false} style={{flexDirection:'row', overflow:'hidden', flexWrap:'wrap'}}>
                {interestsData.map((_, index) => (
                  <Chip 
                    key={index}
                    mode="outlined"
                    style={{margin:4}}
                    onPress={() => console.log(index)}
                  >
                    {_.interest}
                  </Chip>
                ))}
              </ScrollView>
            </View>

            {/* hometown */}
            <TextInput 
              mode="outlined"
              label='Hometown'
              value={form.home}
              onChangeText={text => setForm({...form, home:text})}
              placeholder=""
              outlineColor={customTheme.colors.primary}
              textColor={customTheme.colors.primary}
              keyboardType="default"
              autoCapitalize={true}
              style={{width:'100%'}}
            />

            {/* major */}
            <TextInput 
              mode="outlined"
              label='Major'
              value={form.major}
              onChangeText={text => setForm({...form, major:text})}
              placeholder=""
              outlineColor={customTheme.colors.primary}
              textColor={customTheme.colors.primary}
              keyboardType="default"
              autoCapitalize={true}
              style={{width:'100%'}}
            />

            {/* about */}
            <TextInput 
              mode="outlined"
              label='About'
              value={form.about}
              onChangeText={text => setForm({...form, about:text})}
              placeholder=""
              outlineColor={customTheme.colors.primary}
              textColor={customTheme.colors.primary}
              keyboardType="default"
              autoCapitalize={true}
              style={{width:'100%'}}
              multiline={true}
            />

            {/* links */}

            {/* prompts */}

            {/* quotes */}

            <Button
              // disabled={code === "" ? true : false}
              onPress={buttonClick}
              mode="elevated"
              buttonColor={'#890000'}
              labelStyle={{
                fontFamily: 'NotoSans_Condensed-Regular',
                fontSize: 16, 
                fontWeight: '700',
                color: customTheme.colors.secondary
              }}
              style={{marginBottom:50}}
            >
              <Text>Continue</Text>
            </Button>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export {MockAccountSetup}