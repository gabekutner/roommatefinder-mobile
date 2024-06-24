import React, { useLayoutEffect } from 'react';
import { 
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import { launchImageLibrary } from "react-native-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { 
  verticalScale, 
  moderateScale, 
  scale
} from 'react-native-size-matters';

import CustomButton from '../../components/UI/Custom/CustomButton';
import CustomText from '../../components/UI/Custom/CustomText';
import Thumbnail from "../../components/Thumbnail";

import useGlobal from '../../core/global';
import { colors } from '../../constants/colors';
import { dormsData } from '../../assets/Dictionary';


function ProfileImage({ user, colors }) {
  const uploadThumbnail = useGlobal(state => state.uploadThumbnail)
  return (
    <TouchableOpacity
      style={{ marginBottom:20 }}
      onPress={() => {
        launchImageLibrary({ includeBase64:true, }, (response) => {
          if (response.didCancel) return
          const file = response.assets[0]
          uploadThumbnail(file)
        })
      }}
    >
      <Thumbnail
				url={user.thumbnail}
				size={verticalScale(123)}
        borderColor={colors.secondary}
        style={{ borderWidth:2 }}
			/>
      <View
        style={{
          position:"absolute",
          bottom:0,
          right:0,
          backgroundColor:colors.primary, //'#E8ECF4'
          width:40,
          height:40,
          borderRadius:20,
          alignItems:'center',
          justifyContent:'center',
          borderWidth:3,
          borderColor:colors.secondary,
        }}
      >
        <FontAwesomeIcon 
          icon='pencil'
          size={15}
          color={colors.tint}
        />
      </View>
    </TouchableOpacity>
  )
}

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
        borderRadius:0,
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

  return (
    <View style={{ flex:1, backgroundColor:colors.primary }}>
      <View 
        style={{ 
          alignItems:'center',
          paddingTop:verticalScale(15),
          backgroundColor:colors.secondary,
          paddingBottom:verticalScale(35),
          borderBottomLeftRadius:65,
          borderBottomRightRadius:65,
        }}
      >
        <ProfileImage user={user} colors={colors} />
        <CustomText
          style={{
            textAlign:'center',
            color:colors.tint,
            fontSize:verticalScale(16),
            fontWeight:'bold',
            marginBottom:verticalScale(3),
          }}
        >
          {user.name}
        </CustomText>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{ 
          marginTop:verticalScale(-20),
          marginBottom:verticalScale(120)
        }}
      >
        <View style={{ ...styles.sectionBody, marginHorizontal:moderateScale(25) }}>
          <View 
            style={{ 
              ...styles.rowWrapper, 
              ...styles.rowFirst, 
              backgroundColor:colors.accent, 
              borderColor:colors.tint,
            }}
          >
            <View style={styles.row}>
              <CustomText style={{ ...styles.rowLabel, color:colors.white, fontWeight:'700' }}>
                Preview Profile
              </CustomText>
              <View style={styles.rowSpacer} />
              <CustomText style={{ fontSize:verticalScale(18) }}>🥳</CustomText>
            </View>
          </View>
          <View 
            style={{ 
              ...styles.rowWrapper, 
              backgroundColor:colors.secondary, 
              borderColor:colors.tint,
              borderTopWidth:.5
            }}
          >
            <View style={styles.row}>
              <CustomText style={{ ...styles.rowLabel, color:colors.tint, fontWeight:'500' }}>
                Edit Basics
              </CustomText>
              <View style={styles.rowSpacer} />
              <CustomText style={{ fontSize:verticalScale(18) }}>✍️</CustomText>
            </View>
          </View>
          <View 
            style={{ 
              ...styles.rowWrapper, 
              ...styles.rowLast, 
              backgroundColor:colors.secondary, 
              borderColor:colors.tint,
              borderTopWidth:.5
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
          <View 
            style={{ 
              ...styles.rowWrapper, 
              ...styles.rowFirst,
              backgroundColor:colors.secondary, 
              borderColor:colors.tint,
            }}
          >
            <View style={styles.row}>
              <CustomText style={{ ...styles.rowLabel, color:colors.tint, fontWeight:'500' }}>
                Contact Us
              </CustomText>
              <View style={styles.rowSpacer} />
              <CustomText style={{ fontSize:verticalScale(18) }}>📞</CustomText>
            </View>
          </View>
          <View 
            style={{ 
              ...styles.rowWrapper, 
              backgroundColor:colors.secondary, 
              borderColor:colors.tint,
            }}
          >
            <View style={styles.row}>
              <CustomText style={{ ...styles.rowLabel, color:colors.tint, fontWeight:'500' }}>
                Report a Bug
              </CustomText>
              <View style={styles.rowSpacer} />
              <CustomText style={{ fontSize:verticalScale(18) }}>🐞</CustomText>
            </View>
          </View>
          <View 
            style={{ 
              ...styles.rowWrapper, 
              backgroundColor:colors.secondary, 
              borderColor:colors.tint,
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
          <View 
            style={{ 
              ...styles.rowWrapper, 
              ...styles.rowFirst,
              ...styles.rowLast, 
              backgroundColor:colors.secondary, 
              borderColor:colors.tint,
              borderTopWidth:.5
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
          </View>
        </View>

        <ProfileLogout colors={colors} style={{ marginHorizontal:moderateScale(25) }}/>
      </ScrollView>
    </View>
  )
} 


const styles = StyleSheet.create({
  keyData: {
    flexDirection:'row',
    gap:moderateScale(8)
  },
  keyDataOption: {
    width:scale(70),
    height:scale(50),
    alignItems:'center',
    justifyContent:'center',
  },
  keyDataDivider: {
    height:"100%",
    backgroundColor:colors.secondary,
    width:2,
    borderRadius:5
  },
  keyDataText: {
    fontSize:verticalScale(13),
    fontWeight:'500'
  },
  // navigation options
  navOptions: {
    marginTop:verticalScale(25),
    flexDirection:'row',
    gap:moderateScale(10)
  },
  navBox: {
    width:moderateScale(150),
    backgroundColor:colors.secondary,
    borderWidth:0,
    justifyContent:'space-between',
    paddingLeft:moderateScale(5),
    paddingRight:moderateScale(17),
  },
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
    paddingLeft: moderateScale(12),
    borderWidth: .75,  
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