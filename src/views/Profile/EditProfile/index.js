import React, {useState} from "react";
import {SafeAreaView, Platform, Text, View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView, Image} from "react-native";
import {Button, useTheme, TextInput, Chip, IconButton} from "react-native-paper";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {interestsData, dormsData,} from "../../../assets/Dictionary";
import useBearStore from "../../../libs/store";
import {launchImageLibrary} from "react-native-image-picker";
import {appendFullUrl} from "../../../libs/utils/appendFullUrl"


function EditProfileView({ navigation }) {

  const customTheme = useTheme();
  const user = useBearStore((state) => state.user)
  const updateProfile = useBearStore((state) => state.updateProfile)

  const [form, setForm] = useState({
    name: user.name,
    city: user.city,
    state: user.state,
    graduation_year: user.graduation_year,
    major: user.major,
    description: user.description,
    interests: [...user.interests],
    dorm_building: user.dorm_building,
    thumbnail: user.thumbnail,
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

  const sourceThumbnail = () => {
    if (typeof form.thumbnail === "string") {
      return appendFullUrl(form.thumbnail)
    } else {
      return {uri: form.thumbnail.uri}
    }
  }

  const setPhoto = (num) => {
    launchImageLibrary({includeBase64: true}, (response) => {
      if (response.didCancel) return;
      const file = response.assets[0];
      // const photos = {...form.photos};
      // photos[num] = file;
      // setForm({ ...form, photos:photos });
    });
  };

  const buttonClick = async () => {
    // 1. update profile
    await updateProfile(form)
    // 2. update photos
    // 3. show feedback
  };


  return (
    <SafeAreaView style={{flex:1 , backgroundColor: customTheme.colors.background}}>
      <View style={{ justifyContent:'center', alignItems:'flex-start', marginLeft:15, marginTop:5 }}>
        <IconButton 
          onPress={() => navigation.goBack()}
          icon={() => <FontAwesomeIcon icon="arrow-left" color={customTheme.colors.primary} />}
          size={22}
          mode="contained"
        />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust the value as needed
      >
      <TouchableWithoutFeedback style={{flex:1}} onPress={() => Keyboard.dismiss()}> 
      
        <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
          <View style={{gap: 10, justifyContent:'center', alignItems: 'center', paddingHorizontal:25}}>
            
            <View style={{ width:200, alignItems:'center', justifyContent:'center', marginBottom:25 }}>
              <Text style={{fontSize:18, fontFamily:'NotoSans_Condensed-Regular', fontWeight:'700', color:customTheme.colors.primary, textAlign:'center'}}>
                Edit your profile
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
              <View style={{flex:1, flexDirection:'column', gap:8}}>

                {form.thumbnail ? 
                  <TouchableOpacity 
                    onPress={setThumbnail} 
                    style={[
                      styles.image,
                      styles.imageFull,
                      {borderColor:customTheme.colors.primary}
                    ]}
                  >
                    <Image 
                      source={sourceThumbnail()} 
                      style={{ height:'100%', width:'100%', borderRadius:10 }}
                    />
                  </TouchableOpacity>
                : 
                  <TouchableOpacity 
                    onPress={setThumbnail} 
                    style={[
                      styles.image,
                      styles.imageEmpty,
                      {borderColor:customTheme.colors.primary}
                    ]}
                  >
                    <FontAwesomeIcon icon="image" color={customTheme.colors.primary} />
                  </TouchableOpacity>
                }

                {form.photos.one ? 
                  <TouchableOpacity 
                    onPress={() => setPhoto('one')}
                    style={[
                      styles.image,
                      styles.imageFull,
                      {borderColor:customTheme.colors.primary}
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
                      {borderColor:customTheme.colors.primary}
                    ]}
                  >
                    <FontAwesomeIcon icon="image" color={customTheme.colors.primary} />
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
                      {borderColor:customTheme.colors.primary}
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
                      {borderColor:customTheme.colors.primary}
                    ]}
                  >
                    <FontAwesomeIcon icon="image" color={customTheme.colors.primary} />
                  </TouchableOpacity>
                }

                {form.photos.three ? 
                  <TouchableOpacity 
                    onPress={() => setPhoto('three')} 
                    style={[
                      styles.image,
                      styles.imageFull,
                      {borderColor:customTheme.colors.primary}
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
                    {borderColor:customTheme.colors.primary}
                  ]}
                >
                    <FontAwesomeIcon icon="image" color={customTheme.colors.primary} />
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
                      {borderColor:customTheme.colors.primary}
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
                      {borderColor:customTheme.colors.primary}
                    ]}
                  >
                    <FontAwesomeIcon icon="image" color={customTheme.colors.primary} />
                  </TouchableOpacity>
                }

                {form.photos.five ? 
                  <TouchableOpacity 
                    onPress={() => setPhoto('five')} 
                    style={[
                      styles.image,
                      styles.imageFull,
                      {borderColor:customTheme.colors.primary}
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
                      {borderColor:customTheme.colors.primary}
                    ]}
                  >
                    <FontAwesomeIcon icon="image" color={customTheme.colors.primary} />
                  </TouchableOpacity>
                }
              </View>
            </View>

            {/* name */}
            <TextInput 
              mode="outlined"
              label={"Name"}
              value={form.name}
              onChangeText={text => setForm({...form, name:text})}
              placeholder=""
              outlineColor={customTheme.colors.primary}
              textColor={customTheme.colors.primary}
              keyboardType="default"
              autoCapitalize={true}
              style={{width:'100%'}}
            />
            

            {/* dorm */}
            <Text style={{ alignSelf:'flex-start', fontSize:14, fontWeight:'500', fontFamily:'NotoSans_Condensed-Regular', marginTop:15, color:customTheme.colors.primary }}>
              What dorm are you living in?
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
                      onPress={() => setForm({...form, dorm_building:_.id})}
                      selected={form.dorm_building === _.id ? true : false}
                      selectedColor={form.dorm_building === _.id ? customTheme.colors.secondary : customTheme.colors.primary}
                      showSelectedCheck={false}
                      style={{
                        margin:4,
                        backgroundColor:form.dorm_building === _.id ? customTheme.colors.tertiary : customTheme.colors.background,
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
              value={form.description}
              onChangeText={text => setForm({...form, description:text})}
              placeholder=""
              outlineColor={customTheme.colors.primary}
              textColor={customTheme.colors.primary}
              keyboardType="default"
              autoCapitalize={false}
              autoCorrect={false}
              style={{width:'100%'}}
              multiline={true}
              scrollEnabled={false}
            />

            {/* graduation year */}
            <TextInput 
              mode="outlined"
              label='Graduation Year'
              value={form.graduation_year.toString()}
              onChangeText={text => setForm({...form, graduation_year:text})}
              placeholder=""
              outlineColor={customTheme.colors.primary}
              textColor={customTheme.colors.primary}
              keyboardType="numeric"
              autoCapitalize={false}
              autoCorrect={false}
              maxLength={4}
              style={{width:'100%'}}
            />

            <Button
              onPress={buttonClick}
              mode="elevated"
              buttonColor={customTheme.colors.tertiaryDark}
              labelStyle={{
                fontFamily: 'NotoSans_Condensed-Regular',
                fontSize: 16, 
                fontWeight: '700',
                color: customTheme.colors.secondary
              }}
              style={{marginBottom:100}}
            >
              <Text>Done</Text>
            </Button>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export {EditProfileView}


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