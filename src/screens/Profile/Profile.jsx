import React, { useEffect, useState } from 'react';
import { 
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { 
  verticalScale, 
  moderateScale, 
  scale
} from 'react-native-size-matters';

import FormModal from '../../components/FormModal';
import CustomButton from '../../components/UI/Custom/CustomButton';
import CustomText from '../../components/UI/Custom/CustomText';
import ProfileImage from './Components/ProfileImage';

import useGlobal from '../../core/global';
import { colors } from '../../constants/colors';


function ProfileLogout({ colors, style }) {
  const logout = useGlobal(state => state.logout)
  return (
    <CustomButton
      onClick={() => logout()}
      style={{
        flexDirection:'row',
        paddingHorizontal:moderateScale(22),
        alignItems:'center',
        justifyContent:'center',
        marginTop:verticalScale(25),
        borderWidth:2,
        borderColor:colors.tint,
        backgroundColor:colors.accent,
        shadowColor: '#222',
        shadowOffset: { width: 7, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 1, 
        ...style
      }}
    >
      <FontAwesomeIcon 
        icon='right-from-bracket'
        size={verticalScale(15)}
        color={colors.white}
        style={{ marginRight:moderateScale(10) }}
      />
      <CustomText 
        style={{ 
          fontWeight:'600', 
          fontSize:verticalScale(15), 
          color:colors.white 
        }}
      >
        Logout
      </CustomText>
    </CustomButton>
  )
}

export default function ProfileScreen({ navigation }) {

  const user = useGlobal(state => state.user)
  const getSwipeProfile = useGlobal(state => state.getSwipeProfile)
  const deleteProfile = useGlobal(state => state.deleteProfile)
  const logout = useGlobal(state => state.logout)

  const [item, setItem] = useState()
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState({
    title:'',
    message:''
  })
  const [showBugForm, setShowBugForm] = useState(false)
  const [bugForm, setBugForm] = useState({
    title:'',
    message:''
  })

  useEffect(() => {
    const fetchProfile = async() => {
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
      <View style={styles.titleWrapper}>
        <ProfileImage 
          user={user} 
          colors={colors} 
          bc={colors.secondary} 
          bg={colors.primary} 
        />
        <CustomText style={styles.name}>
          {user.name}
        </CustomText>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.contentWrapper}
      >
        <View style={{ ...styles.sectionBody, marginHorizontal:moderateScale(25) }}>
          <CustomButton 
            onClick={() => navigation.navigate('profile-detail', { item:item })}
            style={{ 
              ...styles.rowWrapper, 
              ...styles.rowFirst, 
              backgroundColor:colors.accent, 
              borderColor:colors.tint,
              borderBottomWidth:0,
              borderBottomLeftRadius:0,
              borderBottomRightRadius:0,
            }}
          >
            <View style={styles.row}>
              <CustomText style={{ ...styles.rowLabel, color:colors.white, fontWeight:'600' }}>
                Preview Profile
              </CustomText>
              <View style={styles.rowSpacer} />
              <CustomText style={{ fontSize:verticalScale(18) }}>🥳</CustomText>
            </View>
          </CustomButton>
          <CustomButton 
            onClick={() => navigation.navigate('edit-basics')}
            style={{ 
              ...styles.rowWrapper, 
              backgroundColor:colors.secondary, 
              borderColor:colors.tint,
              borderTopWidth:0,
              borderBottomWidth:0,
              borderRadius:0,
            }}
          >
            <View style={styles.row}>
              <CustomText style={{ ...styles.rowLabel, color:colors.tint, fontWeight:'500' }}>
                Edit Profile
              </CustomText>
              <View style={styles.rowSpacer} />
              <CustomText style={{ fontSize:verticalScale(18) }}>✍️</CustomText>
            </View>
          </CustomButton>
          <View 
            style={{ 
              ...styles.rowWrapper, 
              ...styles.rowLast, 
              backgroundColor:colors.secondary, 
              borderColor:colors.tint,
              borderTopWidth:0
            }}
          >
            <View style={styles.row}>
              <CustomText style={{ ...styles.rowLabel, color:colors.tint, fontWeight:'500' }}>
                Edit Widgets
              </CustomText>
              <View style={styles.rowSpacer} />
              <CustomText style={{ fontSize:verticalScale(18) }}>🤿</CustomText>
            </View>
          </View>
        </View>

        <View style={{ ...styles.sectionBody, marginHorizontal:moderateScale(25), marginTop:verticalScale(15) }}>
          <View 
            style={{ 
              ...styles.rowWrapper, 
              ...styles.rowFirst,
              ...styles.rowLast, 
              backgroundColor:colors.secondary, 
              borderColor:colors.tint,
            }}
          >
            <View style={styles.row}>
              <CustomText style={{ ...styles.rowLabel, color:colors.tint, fontWeight:'500' }}>
                Roommate Matching Quiz
              </CustomText>
              <View style={styles.rowSpacer} />
              <CustomText style={{ fontSize:verticalScale(18) }}>💥</CustomText>
            </View>
          </View>
        </View>

        <View style={{ ...styles.sectionBody, marginHorizontal:moderateScale(25), marginTop:verticalScale(15) }}>
          <CustomButton 
            onClick={() => setShowContactForm(true)}
            style={{ 
              ...styles.rowWrapper, 
              ...styles.rowFirst,
              borderBottomLeftRadius:0,
              borderBottomRightRadius:0,
              backgroundColor:colors.secondary, 
              borderColor:colors.tint,
              borderBottomWidth:0
            }}
          >
            { showContactForm 
              ? <FormModal 
                  isVisible={showContactForm} 
                  setIsVisible={setShowContactForm} 
                  title={"What's up?"}
                  subtitle={'Some subtitle text here ...'}
                  placeholderTitle={'Ex. Hello!'}
                  placeholderTitleEmoji={'🤔'}
                  placeholderMessage={'Ex. I found my roommate, thanks!'}
                  placeholderMessageEmoji={'💬'}
                  form={contactForm}
                  setForm={setContactForm}
                /> 
              : null 
            }
            <View style={styles.row}>
              <CustomText style={{ ...styles.rowLabel, color:colors.tint, fontWeight:'500' }}>
                Contact Us
              </CustomText>
              <View style={styles.rowSpacer} />
              <CustomText style={{ fontSize:verticalScale(18) }}>📞</CustomText>
            </View>
          </CustomButton>
          <CustomButton 
            onClick={() => setShowBugForm(true)}
            style={{ 
              ...styles.rowWrapper, 
              borderRadius:0,
              borderTopWidth:0,
              borderBottomWidth:0,
              backgroundColor:colors.secondary, 
              borderColor:colors.tint,
            }}
          >
            { showBugForm
              ? <FormModal 
                  isVisible={showBugForm} 
                  setIsVisible={setShowBugForm} 
                  title={"What's wrong?"}
                  subtitle={'Some subtitle text here ...'}
                  placeholderTitle={'Ex. Where?'}
                  placeholderTitleEmoji={'🤔'}
                  placeholderMessage={"Ex. There's something wrong over there..."}
                  placeholderMessageEmoji={'🐞'}
                  form={bugForm}
                  setForm={setBugForm}
                /> 
              : null
            }
            <View style={styles.row}>
              <CustomText style={{ ...styles.rowLabel, color:colors.tint, fontWeight:'500' }}>
                Report a Bug
              </CustomText>
              <View style={styles.rowSpacer} />
              <CustomText style={{ fontSize:verticalScale(18) }}>🐞</CustomText>
            </View>
          </CustomButton>
          <View 
            style={{ 
              ...styles.rowWrapper, 
              backgroundColor:colors.secondary, 
              borderColor:colors.tint,
              borderTopWidth:0,
              borderBottomWidth:0
            }}
          >
            <View style={styles.row}>
              <CustomText style={{ ...styles.rowLabel, color:colors.tint, fontWeight:'500' }}>
                Rate in App Store
              </CustomText>
              <View style={styles.rowSpacer} />
              <CustomText style={{ fontSize:verticalScale(18) }}>📲</CustomText>
            </View>
          </View>
          <View 
            style={{ 
              ...styles.rowWrapper, 
              ...styles.rowLast,
              backgroundColor:colors.secondary, 
              borderColor:colors.tint,
              borderTopWidth:0
            }}
          >
            <View style={styles.row}>
              <CustomText style={{ ...styles.rowLabel, color:colors.tint, fontWeight:'500' }}>
                Terms and Privacy
              </CustomText>
              <View style={styles.rowSpacer} />
              <CustomText style={{ fontSize:verticalScale(18) }}>🕵️‍♀️</CustomText>
            </View>
          </View>
        </View>

        <View style={{ ...styles.sectionBody, marginHorizontal:moderateScale(25), marginTop:verticalScale(15) }}>
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
              backgroundColor:colors.secondary, 
              borderColor:colors.tint,
            }}
          >
            <View style={styles.row}>
              <CustomText 
                style={{ 
                  ...styles.rowLabel, color:colors.accent, fontWeight:'600' }}>
                Delete Account
              </CustomText>
              <View style={styles.rowSpacer} />
              <CustomText style={{ fontSize:verticalScale(18) }}>🚨</CustomText>
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
    fontSize:verticalScale(16),
    fontWeight:'600',
    marginBottom:verticalScale(3),
  },
  // content
  contentWrapper: {
    marginTop:verticalScale(-20),
    marginBottom:verticalScale(120)
  },




  // navigation options
  sectionBody: { 
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor:colors.primary
  },
  // Row
  row: {
    height: verticalScale(38),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: moderateScale(8),
  },
  rowWrapper: {
    height:verticalScale(40),
    paddingLeft: moderateScale(12),
    borderWidth: 2,  
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: verticalScale(13),
    letterSpacing: 0.24,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabelLogout: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '500',
    fontSize:verticalScale(14)
  },

})