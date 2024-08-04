import React, {useState} from "react";
import {SafeAreaView, Platform, Text, View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView, Image} from "react-native";
import {Button, TextInput, Snackbar, Chip} from "react-native-paper";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {interestsData, dormsData,} from "../../../assets/Dictionary";
import useBearStore from "../../../libs/store"
import {launchImageLibrary} from "react-native-image-picker";
import {theme} from "../../../assets/theme";


function SetupView({ navigation }) {
  const [loading, setLoading] = useState(false)

  const [visible, setVisible] = useState({
    status: false,
    missing: []
  });
  const onDismissSnackBar = () => setVisible({...visible, status:false});

  const sendPhotos = useBearStore((state) => state.sendPhotos);
  const sendProfile = useBearStore((state) => state.sendProfile);

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
    photos: {},
  });

  const handleInterests = (i) => {
    const interests = [...form.interests];
    if (interests.includes(i)) {
      // remove item
      const index = interests.indexOf(i);
      interests.splice(index, 1);
      setForm({...form, interests:interests});
    } else {
      // add item if max length not reached
      if (interests.length != 5) {
        // add item
        interests.push(i);
        setForm({...form, interests:interests});
      } else { 
        //nothing 
      };
    };
  };

  const setThumbnail = () => {
    launchImageLibrary({includeBase64: true}, (response) => {
      if (response.didCancel) return;
      const file = response.assets[0];
      setForm({...form, thumbnail:file})
    });
  };

  const setPhoto = (num) => {
    launchImageLibrary({includeBase64: true}, (response) => {
      if (response.didCancel) return;
      const file = response.assets[0];
      const photos = {...form.photos};
      photos[num] = file;
      setForm({ ...form, photos:photos });
    });
  };

  const buttonClick = async () => {
    setLoading(true)
    // 1. form validation
    const missing = []
    if (form.name === "" ) {missing.push('name')}
    if (form.age === "") {missing.push('age')} 
    if (form.sex === "") {missing.push('sex')}
    if (form.dorm === "") {missing.push('dorm')}
    if (form.thumbnail === null) {missing.push('one photo')}

    if (missing.length != 0) {
      setVisible({...visible, status:true, missing:missing})
    } else {
      // 1. send profile
      await sendProfile(form);
      // 2. send photos
      if (Object.keys(form.photos).length !== 0) await sendPhotos(form);
      // 3. navigate to password 
      /**
       * @routing fixes modal for stacks 
       * https://stackoverflow.com/questions/70707367/how-can-i-close-a-modally-opened-window-with-its-own-navigation-stack
      */
      navigation.reset({
        index: 0,
        routes: [{ name: 'password' }],
      })
      // navigation.navigate('password')
      setLoading(false)
    };
  };


  return (
    <SafeAreaView style={{flex:1 , backgroundColor: theme.colors.background}}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust the value as needed
      >
      <TouchableWithoutFeedback style={{flex:1}} onPress={() => Keyboard.dismiss()}> 
      
        <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
          <View style={{gap: 10, justifyContent:'center', alignItems: 'center', paddingHorizontal:25}}>
            
            <View style={{ width:200, alignItems:'center', justifyContent:'center', marginVertical:25 }}>
              <Text style={{fontSize:18, fontFamily:'NotoSans_Condensed-Regular', fontWeight:'700', color:theme.colors.primary, textAlign:'center'}}>
                Create your profile
              </Text>
            </View>

            {/* photos - grid 2x3 */}
            <View
              style={{
                height:300, 
                gap:10, 
                flexDirection:'row',
                paddingHorizontal:15, 
                paddingVertical:15, 
                marginBottom:15, 
                backgroundColor:theme.colors.background,
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
              <View style={{flex:1, flexDirection:'column', gap:8}}>

                {form.thumbnail ? 
                  <TouchableOpacity 
                    onPress={setThumbnail} 
                    style={[
                      styles.image,
                      styles.imageFull,
                      {borderColor:theme.colors.primary}
                    ]}
                  >
                    <Image 
                      source={{uri: form.thumbnail.uri}} 
                      style={{ height:'100%', width:'100%', borderRadius:10 }}
                    />
                  </TouchableOpacity>
                : 
                  <TouchableOpacity 
                    onPress={setThumbnail} 
                    style={[
                      styles.image,
                      styles.imageEmpty,
                      {borderColor:theme.colors.primary}
                    ]}
                  >
                    <FontAwesomeIcon icon="image" color={theme.colors.primary} />
                  </TouchableOpacity>
                }

                {form.photos.one ? 
                  <TouchableOpacity 
                    onPress={() => setPhoto('one')}
                    style={[
                      styles.image,
                      styles.imageFull,
                      {borderColor:theme.colors.primary}
                    ]}
                  >
                    <Image 
                      source={{uri: form.photos.one.uri}} 
                      style={{ height:'100%', width:'100%', borderRadius:10 }}
                    />
                  </TouchableOpacity>
                : 
                  <TouchableOpacity 
                    onPress={() => setPhoto('one')} 
                    style={[
                      styles.image,
                      styles.imageEmpty,
                      {borderColor:theme.colors.primary}
                    ]}
                  >
                    <FontAwesomeIcon icon="image" color={theme.colors.primary} />
                  </TouchableOpacity>
                }

              </View>

              <View style={{flex:1, flexDirection:'column', gap:8}}>

                {form.photos.two ? 
                  <TouchableOpacity 
                    onPress={() => setPhoto('two')} 
                    style={[
                      styles.image,
                      styles.imageFull,
                      {borderColor:theme.colors.primary}
                    ]}
                  >
                    <Image 
                      source={{uri: form.photos.two.uri}} 
                      style={{ height:'100%', width:'100%', borderRadius:10 }}
                    />
                  </TouchableOpacity>
                : 
                  <TouchableOpacity 
                    onPress={() => setPhoto('two')} 
                    style={[
                      styles.image,
                      styles.imageEmpty,
                      {borderColor:theme.colors.primary}
                    ]}
                  >
                    <FontAwesomeIcon icon="image" color={theme.colors.primary} />
                  </TouchableOpacity>
                }

                {form.photos.three ? 
                  <TouchableOpacity 
                    onPress={() => setPhoto('three')} 
                    style={[
                      styles.image,
                      styles.imageFull,
                      {borderColor:theme.colors.primary}
                    ]}
                  >
                    <Image 
                      source={{uri: form.photos.three.uri}} 
                      style={{ height:'100%', width:'100%', borderRadius:10 }}
                    />
                  </TouchableOpacity>
                : 
                <TouchableOpacity 
                  onPress={() => setPhoto('three')} 
                  style={[
                    styles.image,
                    styles.imageEmpty,
                    {borderColor:theme.colors.primary}
                  ]}
                >
                    <FontAwesomeIcon icon="image" color={theme.colors.primary} />
                  </TouchableOpacity>
                }

              </View>

              <View style={{flex:1, flexDirection:'column', gap:8}}>

                {form.photos.four ? 
                  <TouchableOpacity 
                    onPress={() => setPhoto('four')} 
                    style={[
                      styles.image,
                      styles.imageFull,
                      {borderColor:theme.colors.primary}
                    ]}
                  >
                    <Image 
                      source={{uri: form.photos.four.uri}} 
                      style={{ height:'100%', width:'100%', borderRadius:10 }}
                    />
                  </TouchableOpacity>
                : 
                  <TouchableOpacity 
                    onPress={() => setPhoto('four')} 
                    style={[
                      styles.image,
                      styles.imageEmpty,
                      {borderColor:theme.colors.primary}
                    ]}
                  >
                    <FontAwesomeIcon icon="image" color={theme.colors.primary} />
                  </TouchableOpacity>
                }

                {form.photos.five ? 
                  <TouchableOpacity 
                    onPress={() => setPhoto('five')} 
                    style={[
                      styles.image,
                      styles.imageFull,
                      {borderColor:theme.colors.primary}
                    ]}
                  >
                    <Image 
                      source={{uri: form.photos.five.uri}} 
                      style={{ height:'100%', width:'100%', borderRadius:10 }}
                    />
                  </TouchableOpacity>
                : 
                  <TouchableOpacity 
                    onPress={() => setPhoto('five')} 
                    style={[
                      styles.image,
                      styles.imageEmpty,
                      {borderColor:theme.colors.primary}
                    ]}
                  >
                    <FontAwesomeIcon icon="image" color={theme.colors.primary} />
                  </TouchableOpacity>
                }
              </View>
            </View>

            {/* name */}
            <TextInput 
              mode="outlined"
              label={<Text>Name<Text style={{color:theme.colors.tertiary}}>*</Text></Text>}
              value={form.name}
              onChangeText={text => setForm({...form, name:text})}
              placeholder=""
              outlineColor={theme.colors.primary}
              textColor={theme.colors.primary}
              keyboardType="default"
              autoCapitalize={true}
              style={{width:'100%'}}
            />
            
            {/* age */}
            {/* requires a change in backend : birthday -> age */}
            <TextInput 
              mode="outlined"
              label={<Text>Age<Text style={{color:theme.colors.tertiary}}>*</Text></Text>}
              value={form.age}
              onChangeText={text => setForm({...form, age:text})}
              placeholder=""
              outlineColor={theme.colors.primary}
              textColor={theme.colors.primary}
              keyboardType="number-pad"
              autoCapitalize={true}
              style={{width:'100%'}}
              maxLength={2}
            />

            {/* sex */}
            <Text style={{ alignSelf:'flex-start', fontSize:14, fontWeight:'500', fontFamily:'NotoSans_Condensed-Regular', marginTop:15, color:theme.colors.primary }}>
              Sex
              <Text style={{color:'red'}}>*</Text>
            </Text>
            <View style={{flexDirection:'row', gap:10}}>
              <Chip
                mode="outlined"
                selected={form.sex === 'M' ? true : false}
                onPress={() => setForm({...form, sex:'M'})}
                selectedColor={form.sex === 'M' ? theme.colors.secondary : theme.colors.primary}
                showSelectedCheck={false}
                style={{ 
                  backgroundColor:form.sex === 'M' ? theme.colors.tertiary : theme.colors.background,
                  width:'50%',
                }}
              >
                Guy
              </Chip>
              <Chip
                mode="outlined"
                selected={form.sex === 'F' ? true : false}
                onPress={() => setForm({...form, sex:'F'})}
                selectedColor={form.sex === 'F' ? theme.colors.secondary : theme.colors.primary}
                showSelectedCheck={false}
                style={{ 
                  backgroundColor:form.sex === 'F' ? theme.colors.tertiary : theme.colors.background,
                  width:'50%',
                }}
              >
                Girl
              </Chip>
            </View>

            {/* dorm */}
            <Text style={{ alignSelf:'flex-start', fontSize:14, fontWeight:'500', fontFamily:'NotoSans_Condensed-Regular', marginTop:15, color:theme.colors.primary }}>
              What dorm are you living in?
              <Text style={{color:'red'}}>*</Text>
            </Text>
            <View
              style={{
                height:300, 
                gap:10, 
                paddingHorizontal:25, 
                paddingVertical:15, 
                backgroundColor:theme.colors.background,
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
                      selectedColor={form.dorm === _.id ? theme.colors.secondary : theme.colors.primary}
                      showSelectedCheck={false}
                      style={{
                        margin:4,
                        backgroundColor:form.dorm === _.id ? theme.colors.tertiary : theme.colors.background,
                      }}
                    >
                      {_.dorm}
                    </Chip>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* interests */}
            <Text style={{ alignSelf:'flex-start', marginTop:15, fontSize:14, fontWeight:'500', color:theme.colors.primary }}>
              Pick up to 5 interests
            </Text>
            <View
              style={{
                height:300, 
                gap:10, 
                paddingHorizontal:25, 
                paddingVertical:15, 
                marginBottom:15, 
                backgroundColor:theme.colors.background,
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
                      backgroundColor: form.interests.includes(_.id) ? theme.colors.tertiary : theme.colors.background,
                    }}
                    selected={form.interests.includes(_.id) ? true : false}
                    onPress={() => handleInterests(_.id)}
                    selectedColor={form.interests.includes(_.id) ? theme.colors.secondary : theme.colors.primary}
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
                outlineColor={theme.colors.primary}
                textColor={theme.colors.primary}
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
                outlineColor={theme.colors.primary}
                textColor={theme.colors.primary}
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
              outlineColor={theme.colors.primary}
              textColor={theme.colors.primary}
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
              outlineColor={theme.colors.primary}
              textColor={theme.colors.primary}
              keyboardType="default"
              autoCapitalize={false}
              autoCorrect={false}
              style={{width:'100%'}}
              multiline={true}
              scrollEnabled={false}
            />

            <Button
              loading={loading}
              onPress={buttonClick}
              mode="elevated"
              buttonColor={theme.colors.onTertiary}
              labelStyle={{
                fontFamily: 'NotoSans_Condensed-Regular',
                fontSize: 16, 
                fontWeight: '700',
                color: theme.colors.secondary
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
              labelStyle: {color: theme.colors.secondary}
            }}
            wrapperStyle={{backgroundColor: theme.colors.onTertiary}}
          >
            <Text 
              style={{fontSize:14, color:theme.colors.secondary}}>
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

export {SetupView}


const styles = StyleSheet.create({
  // image
  image: {
    flex:1, 
    borderWidth:2, 
    borderRadius:12, 
    justifyContent: 'center', 
    alignItems:'center'
  },
  imageEmpty: {
    borderStyle:'dashed', 
  },
  imageFull: {
    borderStyle:'solid', 
  }
})