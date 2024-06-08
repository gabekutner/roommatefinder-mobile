import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  verticalScale,
  moderateScale
} from 'react-native-size-matters';

import CustomText from '../components/UI/Custom/CustomText';
import Thumbnail from '../components/Thumbnail';

import useGlobal from '../core/global';
import { colors } from '../constants/colors';


export default function Settings({ navigation }) {

  const user = useGlobal(state => state.user)
  const logout = useGlobal(state => state.logout)

  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  })

  return (
    <SafeAreaView 
      style={{ 
        flex:1, 
        backgroundColor:colors.primary 
      }}
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.section, { paddingTop:4 }]}>
            <Text style={[styles.sectionTitle, { color:colors.tint }]}>Account</Text>

            <View style={styles.sectionBody}>
              <TouchableOpacity
                onPress={() => navigation.navigate('edit-profile')}
                style={[
                  styles.profile, 
                  { 
                    backgroundColor:colors.secondary, 
                    borderColor:colors.tint 
                  }
                ]}
              >
                <Thumbnail 
                  url={user.thumbnail}
                  size={100}
                  borderColor={colors.secondary}
                  style={styles.profileAvatar}
                />
              
                <View style={styles.profileBody}>
                  <CustomText 
                    style={[
                      styles.profileName, 
                      { 
                        color:colors.tint,
                        // fontSize:verticalScale(10)
                      }
                    ]}
                  >
                    {user.name}
                  </CustomText>

                  <CustomText 
                    style={[
                      styles.profileHandle, 
                      { 
                        color:colors.tint 
                      }
                    ]}
                  >
                    {user.email}
                  </CustomText>
                </View>

                <FontAwesomeIcon
                  color={colors.tint}
                  icon="chevron-right"
                  size={verticalScale(19)} 
                />
              </TouchableOpacity>
            </View>
          </View>
        
          {/* preferences */}
          <View style={styles.section}>
            <CustomText 
              style={[
                styles.sectionTitle, 
                { 
                  color:colors.tint 
                }
              ]}
            >
              Preferences
            </CustomText>
            <View style={styles.sectionBody}>
              <View 
                style={[
                  styles.rowWrapper, 
                  styles.rowFirst, 
                  styles.rowLast,
                  { 
                    backgroundColor:colors.secondary, 
                    borderColor:colors.tint, 
                    borderWidth:.5, 
                    borderTopWidth:.5
                  }
                ]}
              >
                <View style={styles.row}>
                  <CustomText 
                    style={[
                      styles.rowLabel, 
                      { 
                        color:colors.tint, 
                        fontWeight:'500' 
                      }
                    ]}
                  >
                    Email Notifications
                  </CustomText>

                  <View style={styles.rowSpacer} />

                  <Switch
                    onValueChange={emailNotifications =>
                      setForm({ ...form, emailNotifications })
                    }
                    style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                    value={form.emailNotifications} />
                </View>
              </View>
              {/* <View style={[styles.rowWrapper, { backgroundColor:colors.secondary, borderColor:colors.tint, borderWidth:.2, borderTopWidth:.1 }]}>
                <View style={styles.row}>
                  <Text style={[styles.rowLabel, { color:colors.tint, fontWeight:'500' }]}>Push Notifications</Text>
                  <View style={styles.rowSpacer} />
                  <Switch
                    onValueChange={pushNotifications =>
                      setForm({ ...form, pushNotifications })
                    }
                    style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                    value={form.pushNotifications} />
                </View>
              </View> */}
              {/* <View 
                style={[
                  styles.rowWrapper, 
                  styles.rowLast, 
                  { 
                    backgroundColor:colors.secondary, 
                    borderColor:colors.tint, 
                    borderWidth:.2, 
                    borderTopWidth:.1 
                  }
                ]}
              >
                <View style={styles.row}>
                  <CustomText 
                    style={[
                      styles.rowLabel, 
                      { 
                        color:colors.tint, 
                        fontWeight:'500' 
                      }
                    ]}
                  >
                    Dark Mode
                  </CustomText>
                  <View style={styles.rowSpacer} />
                  <Switch
                    onValueChange={theme => {
                      setForm({ ...form, theme })
                      toggleSwitch()
                    }}
                    style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                    value={form.theme} />
                </View>
              </View> */}
            </View>
          </View>

          {/* resources */}
          <View style={styles.section}>
            <CustomText 
              style={[
                styles.sectionTitle, 
                { 
                  color:colors.tint 
                }
              ]}
            >
              Resources
            </CustomText>

            <View style={styles.sectionBody}>
              <View 
                style={[
                  styles.rowWrapper, 
                  styles.rowFirst, 
                  { 
                    backgroundColor:colors.secondary, 
                    borderColor:colors.tint, 
                    borderWidth:.5, 
                    borderTopWidth:.5
                  }
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <CustomText 
                    style={[
                      styles.rowLabel, 
                      { 
                        color:colors.tint, 
                        fontWeight:'500'
                      }
                    ]}
                  >
                    Contact Us
                  </CustomText>

                  <View style={styles.rowSpacer} />

                  <FontAwesomeIcon
                    color={colors.tertiary}
                    icon="chevron-right"
                    size={verticalScale(15)}
                  />
                </TouchableOpacity>
              </View>

              {/* <View style={[styles.rowWrapper, { backgroundColor:colors.secondary, borderColor:colors.tint, borderWidth:.2, borderTopWidth:.2 }]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <Text style={[styles.rowLabel, { color:colors.tint, fontWeight:'500' }]}>Report Bug</Text>

                  <View style={styles.rowSpacer} />

                  <FontAwesomeIcon
                    color={colors.tertiary}
                    icon="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </View> */}

              <View 
                style={[
                  styles.rowWrapper, 
                  { 
                    backgroundColor:colors.secondary, 
                    borderColor:colors.tint, 
                    borderWidth:.5, 
                    borderTopWidth:.25
                  }
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}
                >
                  <CustomText 
                    style={[
                      styles.rowLabel, 
                      { 
                        color:colors.tint, 
                        fontWeight:'500' 
                      }
                    ]}
                  >
                    Rate in App Store
                  </CustomText>

                  <View style={styles.rowSpacer} />

                  <FontAwesomeIcon
                    color={colors.tertiary}
                    icon="chevron-right"
                    size={verticalScale(15)}
                  />
                </TouchableOpacity>
              </View>

              <View 
                style={[
                  styles.rowWrapper, 
                  styles.rowLast, 
                  { 
                    backgroundColor:colors.secondary,
                    borderColor:colors.tint,
                    borderWidth:.5, 
                    borderTopWidth:.25 
                  }
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}
                >
                  <CustomText 
                    style={[
                      styles.rowLabel, 
                      { 
                        color:colors.tint, 
                        fontWeight:'500' 
                      }
                    ]}
                  >
                    Terms and Privacy
                  </CustomText>

                  <View style={styles.rowSpacer} />

                  <FontAwesomeIcon
                    color={colors.tertiary}
                    icon="chevron-right"
                    size={verticalScale(15)} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionBody}>
              <View
                style={[
                  styles.rowWrapper,
                  styles.rowFirst,
                  styles.rowLast,
                  { 
                    alignItems: 'center',
                    backgroundColor:colors.accent, 
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => logout()}
                  style={styles.row}
                >
                  <CustomText 
                    style={[
                      styles.rowLabel, 
                      styles.rowLabelLogout, 
                      { 
                        color:colors.white 
                      }
                    ]}
                  >
                    Log Out
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <CustomText 
            style={[
              styles.contentFooter, 
              { 
                color:colors.tint 
              }
            ]}
          >
            App Version 1.0.0 #100
          </CustomText>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  // Content
  content: { paddingHorizontal: moderateScale(20) },
  contentFooter: {
    marginTop: 24,
    fontSize: verticalScale(10),
    fontWeight: '500',
    textAlign: 'center',
  },
  // Section
  section: { paddingVertical: verticalScale(8) },
  sectionTitle: {
    margin:8,
    marginLeft:moderateScale(10),
    fontSize:verticalScale(10),
    letterSpacing:0.33,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  sectionBody: { borderRadius: 12 },
  // Profile  
  profile: {
    padding: 12,
    borderWidth:.5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
  },
  profileBody: { marginRight: 'auto' },
  profileName: {
    fontSize: verticalScale(15),
    fontWeight: '600',
  },
  profileHandle: {
    marginTop: 2,
    fontSize: verticalScale(13),
    fontWeight: '400',
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
    borderTopWidth: 1,
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