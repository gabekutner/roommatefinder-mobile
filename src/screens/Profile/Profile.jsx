import React, { useEffect, useState } from 'react';
import { 
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Switch
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { verticalScale, moderateScale } from 'react-native-size-matters';

import ProfileLogout from './Components/ProfileLogout';
import CustomButton from '../../components/UI/Custom/CustomButton';
import CustomText from '../../components/UI/Custom/CustomText';
import ProfileImage from './Components/ProfileImage';

import useStore from '../../zustand/store';
import { colors } from '../../constants/colors';


export default function ProfileScreen({ navigation }) {

  const user = useStore(state => state.user)
  const getSwipeProfile = useStore(state => state.getSwipeProfile)
  const deleteProfile = useStore(state => state.deleteProfile)
  const logout = useStore(state => state.logout)
  const pauseProfile = useStore(state => state.pauseProfile)

  const [item, setItem] = useState()
  const [isEnabled, setIsEnabled] = useState(user.pause_profile)
  const toggleSwitch = () =>{
    setIsEnabled(previousState => !previousState)
    pauseProfile(user)
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const resp = await getSwipeProfile(user, user.id)
      setItem(resp.data)
    }
    fetchProfile()
  }, [])

  const alert = (
    title, 
    msg, 
    text, 
    style,
  ) => {
    return (
      Alert.alert(`${title}`, `${msg}`, [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel profile deletion'),
          style: 'cancel',
        },
        {
          text: `${text}`, 
          onPress: () => {
            deleteProfile(user)
            logout()
          },
          style: `${style}`
        },
      ])
    )
  }
    
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentWrapper}
      >
        <View style={styles.titleWrapper}>
          <ProfileImage 
            user={user} 
            colors={colors} 
            bc={colors.secondary} 
            bg={colors.primary} 
          />
          <CustomText fontSize="large" style={styles.name}>
            {user.name}
          </CustomText>
        </View>

        <View 
          style={{ 
            ...styles.sectionBody, 
            marginTop:verticalScale(-20) 
          }}
        >
          <CustomButton 
            onClick={() => navigation.navigate('profile-detail', { item:item })}
            style={{ 
              ...styles.rowWrapper, 
              ...styles.rowFirst, 
              backgroundColor:colors.accent, 
              borderBottomWidth:0,
              borderBottomLeftRadius:0,
              borderBottomRightRadius:0,
            }}
          >
            <View style={styles.row}>
              <CustomText 
                fontSize="medium" 
                style={{ 
                  ...styles.rowLabel, 
                  color:colors.white, 
                  fontWeight:'600' 
                }}
              >
                Preview Profile
              </CustomText>
              <View style={styles.rowSpacer} />
              <CustomText fontSize="large">🥳</CustomText>
            </View>
          </CustomButton>
          <CustomButton 
            onClick={() => navigation.navigate('edit-basics')}
            style={{ 
              ...styles.rowWrapper, 
              borderTopWidth:0,
              borderBottomWidth:0,
              borderRadius:0,
            }}
          >
            <View style={styles.row}>
              <CustomText fontSize="medium" style={styles.rowLabel}>
                Edit Profile
              </CustomText>
              <View style={styles.rowSpacer} />
              <CustomText fontSize="large">🍿</CustomText>
            </View>
          </CustomButton>
          <CustomButton 
            onClick={() => navigation.navigate('matching')}
            style={{ 
              ...styles.rowWrapper, 
              ...styles.rowLast,
              borderTopLeftRadius:0,
              borderTopRightRadius:0 ,
              borderTopWidth:0,
              marginTop:verticalScale(-.24)
            }}
          >
            <View style={styles.row}>
              <CustomText fontSize="medium" style={styles.rowLabel}>
                Roommate Matching Quiz
              </CustomText>
              <View style={styles.rowSpacer} />
              <CustomText fontSize="large">🧪</CustomText>
            </View>
          </CustomButton>
        </View>

        {/* preferences */}
        <View style={styles.sectionBody}>
          <View 
            style={{ 
              ...styles.rowWrapper, 
              ...styles.rowFirst,
              borderBottomWidth:0
            }}
          >
            <View style={styles.row}>
              <CustomText fontSize="medium" style={styles.rowLabel}>
                Pause Profile
              </CustomText>
              <View style={styles.rowSpacer} />
              <Switch 
                trackColor={{ true:colors.accent }}
                thumbColor={colors.white}
                ios_backgroundColor={colors.tertiary}
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{ 
                  marginRight:moderateScale(-8),
                  transform:[
                    { scaleX: .9 }, 
                    { scaleY: .9 }
                  ]
                }}
              />
            </View>
          </View>
          <CustomButton 
            onClick={() => console.log('how to find a roommate')}
            style={{ 
              ...styles.rowWrapper, 
              borderTopWidth:0,
              borderRadius:0,
              borderBottomWidth:0
            }}
          >
            <View style={styles.row}>
              <CustomText fontSize="medium" style={styles.rowLabel}>
                How to find a roommate?
              </CustomText>
              <View style={styles.rowSpacer} />
              <FontAwesomeIcon icon="question-circle" size={verticalScale(20)} color={colors.tertiary} />
            </View>
          </CustomButton>
          <CustomButton 
            onClick={() => console.log('terms and privacy')}
            style={{ 
              ...styles.rowWrapper, 
              ...styles.rowLast,
              borderTopWidth:0,
              borderTopLeftRadius:0,
              borderTopRightRadius:0,
              marginTop:verticalScale(-.23)
            }}
          >
            <View style={styles.row}>
              <CustomText fontSize="medium" style={styles.rowLabel}>
                Terms and Privacy
              </CustomText>
              <View style={styles.rowSpacer} />
              <CustomText fontSize="large">🕵️‍♀️</CustomText>
            </View>
          </CustomButton>
        </View>

        <View style={styles.sectionBody}>
          <CustomButton 
            onClick={() => {
              alert(
                title="Delete Account", 
                msg="Are you sure you want to delete your account? You'll have to create an account again to come back 😒",
                text="Yep, I'm sure",
                style="destructive",
              )
            }}
            style={{ 
              ...styles.rowWrapper, 
              ...styles.rowFirst,
              ...styles.rowLast, 
            }}
          >
            <View style={styles.row}>
              <CustomText 
                fontSize="medium"
                style={{ 
                  ...styles.rowLabel, 
                  color:colors.accent, 
                  fontWeight:'600' 
                }}
              >
                Delete Account
              </CustomText>
              <View style={styles.rowSpacer} />
              <CustomText fontSize="medium">🚨</CustomText>
            </View>
          </CustomButton>
        </View>
        <ProfileLogout colors={colors} style={{ marginHorizontal:moderateScale(25), marginBottom:verticalScale(15) }}/>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor:colors.primary
  },
  // title 
  titleWrapper: {
    alignItems:'center',
    paddingTop:verticalScale(15),
    backgroundColor:colors.secondary,
    paddingBottom:verticalScale(35),
    borderBottomLeftRadius:65,
    borderBottomRightRadius:65,
  },
  name: {
    textAlign:'center',
    color:colors.tint,
    fontWeight:'600',
    marginBottom:verticalScale(5),
  },
  // content
  contentWrapper: { marginBottom:verticalScale(120) },
  // Navigation Options
  sectionBody: { 
    borderRadius:12,
    backgroundColor:colors.primary,
    marginHorizontal:moderateScale(25), 
    marginTop:verticalScale(15),
    shadowColor:'#000',
    shadowOpacity:.7,
    shadowRadius:.6,
    shadowOffset: {
      width:1.5,
      height:2
    }
  },
  // Row
  row: {
    height:verticalScale(30),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignItems:'center',
  },
  rowWrapper: {
    borderWidth:2,  
    borderColor:colors.tint,
    paddingVertical:verticalScale(5),
    paddingHorizontal:moderateScale(10),
    backgroundColor:colors.secondary,
  },
  rowFirst: {
    borderTopLeftRadius:12,
    borderTopRightRadius:12,
  },
  rowLabel: {
    color:colors.tint,
    fontWeight:'500',
    letterSpacing:0.24,
  },
  rowLast: {
    borderBottomLeftRadius:12,
    borderBottomRightRadius:12,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  }
})