import React, {useState} from "react";
import {SafeAreaView, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView} from "react-native";
import {Button, useTheme, TextInput, Snackbar, Chip, IconButton} from "react-native-paper";
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
    thumbnail: "",
    interests: [],
    photos: [],
    links: [],
    quotes: [],
    prompts: []
  })

  const [addLink, setAddLink] = useState({
    title: '',
    link: ''
  })
  const handleLink = (t, l) => {
    const links = [...form.links]
    if (links.length < 3) {
      links.push({title: t, link: l})
      setAddLink({...addLink, title:'', link:''})
      setForm({...form, links:links})
    }
  }
  const removeLink = (t, l) => {
    const links = [...form.links]
    for (var i in links) {
      if (links[i].title === t && links[i].link === l) {
        links.splice(i, 1)
      }
    }
    setForm({...form, links:links})
  }

  const [addPrompt, setAddPrompt] = useState({
    question: '',
    answer: ''
  })
  const handlePrompt = (q, a) => {
    const prompts = [...form.prompts]
    prompts.push({question: q, answer: a})
    setAddPrompt({...addPrompt, question:'', answer:''})
    setForm({...form, prompts:prompts})
  }

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
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <ScrollView showsVerticalScrollIndicator={false}>
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
            />

            {/* links */}
            <Text style={{ alignSelf:'flex-start', marginTop:15, fontSize:14, fontWeight:'500', color:customTheme.colors.primary }}>
              Add a link to your socials!
            </Text>
            <View
              style={{
                gap:10, 
                width:'100%',
                paddingHorizontal:25, 
                paddingVertical:15, 
                backgroundColor:customTheme.colors.background,
                borderRadius:12,
                borderWidth:1,
                alignItems:'center',

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            >
              <TextInput 
                mode="outlined"
                label="Where's this link go?"
                value={addLink.title}
                onChangeText={text => setAddLink({ ...addLink, title:text })}
                placeholder=""
                outlineColor={customTheme.colors.primary}
                textColor={customTheme.colors.primary}
                keyboardType="default"
                autoCapitalize={true}
                style={{width:'100%'}}
                multiline={true}
              />
              <TextInput 
                mode="outlined"
                label='Link here!'
                value={addLink.link}
                onChangeText={text => setAddLink({ ...addLink, link:text })}
                placeholder=""
                outlineColor={customTheme.colors.primary}
                textColor={customTheme.colors.primary}
                keyboardType="default"
                autoCapitalize={true}
                style={{width:'100%'}}
                multiline={true}
              />
              <IconButton
                mode="outlined"
                icon={() => <FontAwesomeIcon icon={"plus"}/>}
                onPress={() => handleLink(addLink.title, addLink.link)}
              />
            </View>
            <View 
              style={{
                gap:10, 
                width:'100%',
                paddingHorizontal:25, 
                paddingVertical:15, 
                backgroundColor:customTheme.colors.background,
                borderRadius:12,
                borderWidth:1,
                alignItems:'center',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            >
              {form.links.map((_, index) => (
                <View key={index} style={{flexDirection:'row', gap:5, alignItems:'center'}}>
                  <IconButton
                    icon={() => <FontAwesomeIcon icon={"xmark"}/>}
                    onPress={() => removeLink(_.title, _.link)}
                  />
                  <View 
                    style={{
                      margin:4,
                      paddingHorizontal:10,
                      paddingVertical:5,
                      backgroundColor: customTheme.colors.background,
                      borderRadius:12,
                      borderWidth:1,
                      flexDirection:'row',
                      gap:15,
                      justifyContent:'space-between'
                    }}
                  >
                    <FontAwesomeIcon icon={"link"}/>
                    <Text>{_.title}</Text>
                  </View>
                </View>
              ))}
            </View>
            
            {/* prompts */}
            <Text style={{ alignSelf:'flex-start', marginTop:15, fontSize:14, fontWeight:'500', color:customTheme.colors.primary }}>
              Answer a prompt!
            </Text>
            <View
              style={{
                gap:10, 
                width:'100%',
                paddingHorizontal:25, 
                paddingVertical:15, 
                marginBottom:15, 
                backgroundColor:customTheme.colors.background,
                borderRadius:12,
                borderWidth:1,
                alignItems:'center',

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            >
              <ScrollView style={{height:150}}>
                {prompts.map((_, index) => (
                  <Chip 
                    key={index}
                    mode="outlined"
                    style={{
                      margin:4,
                      backgroundColor: addPrompt.question === _.id ? customTheme.colors.tertiary : customTheme.colors.background,
                    }}
                    selected={addPrompt.question === _.id ? true : false}
                    onPress={() => setAddPrompt({...addPrompt, question:_.id })}
                    selectedColor={addPrompt.question === _.id ? customTheme.colors.secondary : customTheme.colors.primary}
                    showSelectedCheck={false}
                  >
                    {_.prompt}
                  </Chip>
                ))}
              </ScrollView>
              <TextInput 
                mode="outlined"
                label='Answer'
                value={addPrompt.answer}
                onChangeText={() => handlePrompt(addPrompt.question, addPrompt.answer)}
                placeholder=""
                outlineColor={customTheme.colors.primary}
                textColor={customTheme.colors.primary}
                keyboardType="default"
                autoCapitalize={true}
                style={{width:'100%'}}
                multiline={true}
              />
              <IconButton
                mode="outlined"
                icon={() => <FontAwesomeIcon icon={"plus"}/>}
              />
            </View>

            {/* quotes */}

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
              style={{marginBottom:50}}
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
    </SafeAreaView>
  )
}

export {MockAccountSetup}