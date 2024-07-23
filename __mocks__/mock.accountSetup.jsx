import React, {useState} from "react";
import {SafeAreaView, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView} from "react-native";
import {Button, useTheme, TextInput, HelperText, Chip} from "react-native-paper";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {interestsData} from "../src/assets/Dictionary"


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
    sex: "guy",
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

  // useEffect(() => {
  //   if (selected) {
  //       setTextColor(`white`);
  //       setStyle({ borderColor: `#FBA200`, backgroundColor: `#FBA200` });
  //   } else {
  //       setTextColor(`#FBA200`);
  //       setStyle({ borderColor: `#FBA200`, backgroundColor: `transparent` });
  //   }
  // }, [selected]);

  // const handlePress = () => {
      // setSelected(!selected);
      // if (chipPressed) {
      //     chipPressed(selected);
      // }
  // };




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
                backgroundColor:customTheme.colors.primary,
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
                <View style={{ flex:1, borderWidth:2, borderRadius:12, borderColor:customTheme.colors.secondary, borderStyle:'dashed', justifyContent: 'center', alignItems:'center' }}>
                  <FontAwesomeIcon icon="image" color={customTheme.colors.secondary} />
                </View>
                <View style={{ flex:1, borderWidth:2, borderRadius:12, borderColor:customTheme.colors.secondary, borderStyle:'dashed', justifyContent: 'center', alignItems:'center' }}>
                  <FontAwesomeIcon icon="image" color={customTheme.colors.secondary}/>
                </View>
              </View>
              <View style={{flex:1, flexDirection:'column', gap:10}}>
              <View style={{ flex:1, borderWidth:2, borderRadius:12, borderStyle:'dashed', borderColor:customTheme.colors.secondary, justifyContent: 'center', alignItems:'center' }}>
                  <FontAwesomeIcon icon="image" color={customTheme.colors.secondary}/>
                </View>
                <View style={{ flex:1, borderWidth:2, borderRadius:12, borderStyle:'dashed',borderColor:customTheme.colors.secondary, justifyContent: 'center', alignItems:'center' }}>
                  <FontAwesomeIcon icon="image" color={customTheme.colors.secondary}/>
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
            <HelperText type="error" visible={hasErrors()}>
              You must be 16+ to use DormParty.
            </HelperText>

            {/* sex */}

            {/* dorm */}

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
              <ScrollView showsVerticalScrollIndicator={false}>
                {interestsData.map((_, index) => (
                  <Chip 
                    key={index}
                    mode="outlined"
                    style={{margin:4}}
                    // selected
                    // elevated
                    // selectedColor={customTheme.colors.tertiary}
                    // background={customTheme.colors.tertiary}
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