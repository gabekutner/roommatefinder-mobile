import React, {useState} from "react";
import {SafeAreaView, Platform, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView} from "react-native";
import {Button, useTheme, TextInput, Snackbar, Chip} from "react-native-paper";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {interestsData, dormsData, prompts} from "../src/assets/Dictionary"


function MockAccountSetup({ navigation }) {
  const customTheme = useTheme();

  const [visible, setVisible] = useState({
    status: false,
    missing: []
  });
  const onDismissSnackBar = () => setVisible({...visible, status:false});
  
  // temporary
  const [form, setForm] = useState({
    name: "",
    age: "",
    sex: "",
    dorm: "",
    major: "",
    city: "",
    state: "",
    about: "",
    thumbnail: null,
    interests: [],
    photos: [],
    // links: [],
    // quotes: [],
    // prompts: []
  })

  const handleInterests = (i) => {
    const interests = [...form.interests]
    if (interests.includes(i)) {
      // remove
      const index = interests.indexOf(i);
      interests.splice(index, 1)
      // console.log('here')
      setForm({...form, interests:interests})
    } else {
      // add
      if (interests.length != 5) {
        // add
        interests.push(i)
        setForm({...form, interests:interests})
      } else { 
        //nothing 
      }
    }
  }

  const buttonClick = () => {
    // form validation
    const missing = []
    if (form.name === "" ) {missing.push('name')}
    if (form.age === "") {missing.push('age')} 
    if (form.sex === "") {missing.push('sex')}
    if (form.dorm === "") {missing.push('dorm')}

    if (missing.length != 0) {
      setVisible({...visible, status:true, missing:missing})
    } else {
      console.log('submit')
      // create profile
      // navigate to app stack!
    }    
  }
  

  return (
    <SafeAreaView style={{flex:1 , backgroundColor: customTheme.colors.background}}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust the value as needed
      >
      <TouchableWithoutFeedback style={{flex:1}} onPress={() => Keyboard.dismiss()}> 
      
        <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
          <View style={{gap: 10, justifyContent:'center', alignItems: 'center', paddingHorizontal:50}}>
            
            <View style={{ width:200, alignItems:'center', justifyContent:'center', marginVertical:25 }}>
              <Text style={{fontSize:18, fontFamily:'NotoSans_Condensed-Regular', fontWeight:'700', color:customTheme.colors.primary, textAlign:'center'}}>
                Create your profile
              </Text>
            </View>

            {/* photos - grid 4x4 */}
            <View
              style={{
                height:300, 
                gap:10, 
                flexDirection:'row',
                paddingHorizontal:25, 
                paddingVertical:15, 
                marginBottom:15, 
                backgroundColor:customTheme.colors.background,
                borderRadius:12,
                borderWidth:1,

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
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

            {/* sex */}
            <Text style={{ alignSelf:'flex-start', fontSize:14, fontWeight:'500', fontFamily:'NotoSans_Condensed-Regular', marginTop:15, color:customTheme.colors.primary }}>
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
            <Text style={{ alignSelf:'flex-start', fontSize:14, fontWeight:'500', fontFamily:'NotoSans_Condensed-Regular', marginTop:15, color:customTheme.colors.primary }}>
              What dorm are you living in?
              <Text style={{color:'red'}}>*</Text>
            </Text>
            <View
              style={{
                height:300, 
                gap:10, 
                paddingHorizontal:25, 
                paddingVertical:15, 
                backgroundColor:customTheme.colors.background,
                borderRadius:12,
                borderWidth:1,

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
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
                        backgroundColor:form.dorm === _.id ? customTheme.colors.tertiary : customTheme.colors.background,
                      }}
                    >
                      {_.dorm}
                    </Chip>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* interests */}
            <Text style={{ alignSelf:'flex-start', marginTop:15, fontSize:14, fontWeight:'500', color:customTheme.colors.primary }}>
              Pick up to 5 interests
            </Text>
            <View
              style={{
                height:300, 
                gap:10, 
                paddingHorizontal:25, 
                paddingVertical:15, 
                marginBottom:15, 
                backgroundColor:customTheme.colors.background,
                borderRadius:12,
                borderWidth:1,

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flexDirection:'row', overflow:'hidden', flexWrap:'wrap'}}>
                {interestsData.map((_, index) => (
                  <Chip 
                    key={index}
                    mode="outlined"
                    style={{
                      margin:4,
                      backgroundColor: form.interests.includes(_.id) ? customTheme.colors.tertiary : customTheme.colors.background,
                    }}
                    selected={form.interests.includes(_.id) ? true : false}
                    onPress={() => handleInterests(_.id)}
                    selectedColor={form.interests.includes(_.id) ? customTheme.colors.secondary : customTheme.colors.primary}
                    showSelectedCheck={false}
                  >
                    {_.interest}
                  </Chip>
                ))}
                </View>
              </ScrollView>
            </View>

            {/* hometown */}
            <View style={{flexDirection:'row', gap:5}}>
              <TextInput 
                mode="outlined"
                label='Hometown'
                value={form.city}
                onChangeText={text => setForm({...form, city:text})}
                placeholder=""
                outlineColor={customTheme.colors.primary}
                textColor={customTheme.colors.primary}
                keyboardType="default"
                autoCapitalize={true}
                style={{width:'70%'}}
              />
              <TextInput 
                mode="outlined"
                label='State'
                value={form.state}
                onChangeText={text => setForm({...form, state:text})}
                placeholder=""
                outlineColor={customTheme.colors.primary}
                textColor={customTheme.colors.primary}
                keyboardType="default"
                autoCapitalize={true}
                style={{width:'30%'}}
              />
            </View>
            
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
              label='About Me'
              value={form.about}
              onChangeText={text => setForm({...form, about:text})}
              placeholder=""
              outlineColor={customTheme.colors.primary}
              textColor={customTheme.colors.primary}
              keyboardType="default"
              autoCapitalize={true}
              style={{width:'100%'}}
              multiline={true}
              scrollEnabled={false}
            />

            <Button
              onPress={buttonClick}
              mode="elevated"
              buttonColor={'#890000'}
              labelStyle={{
                fontFamily: 'NotoSans_Condensed-Regular',
                fontSize: 16, 
                fontWeight: '700',
                color: customTheme.colors.secondary
              }}
              style={{marginBottom:100}}
            >
              <Text>Continue</Text>
            </Button>
          </View>
          <Snackbar
            visible={visible.status}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Got it',
              labelStyle: {color: customTheme.colors.secondary}
            }}
            wrapperStyle={{backgroundColor: '#890000'}}
          >
            <Text 
              style={{fontSize:14, color:customTheme.colors.secondary}}>
                Missing{' '}
                {visible.missing.map((_, index) => {
                  if (visible.missing.length != index+1) {
                    return `${_}, `
                  } else {
                    return `${_}.`
                  }
                })}
            </Text>
          </Snackbar>
        </ScrollView>
        
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export {MockAccountSetup}