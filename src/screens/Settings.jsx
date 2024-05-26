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

import CustomText from '../components/UI/Custom/CustomText';
import Thumbnail from '../components/Thumbnail';

import useGlobal from '../core/global';
import { colors as c } from '../assets/config';


export default function Settings({ navigation }) {

  const user = useGlobal(state => state.user)
  const logout = useGlobal(state => state.logout)
  const setTheme = useGlobal(state => state.setTheme)
  const theme = useGlobal(state => state.theme)
  const colors = c[theme]

  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
    theme: true ? theme === 'dark' : false, // true -> dark mode, false -> light mode
  })

  const toggleSwitch = () => { setTheme() }

  return (
    <SafeAreaView 
      style={{ 
        flex:1, 
        backgroundColor:colors.primary 
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerAction}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}>
              <FontAwesomeIcon
                icon="arrow-left"
                color={colors.tint}
                size={24} />
            </TouchableOpacity>
          </View>

          <CustomText 
            style={[
              styles.headerTitle, 
              { 
                color:colors.tint 
              }
            ]}
          >
            Settings
          </CustomText>

          <View style={[styles.headerAction, { alignItems: 'flex-end' }]} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.section, { paddingTop: 4 }]}>
            <Text style={[styles.sectionTitle, { color:colors.tertiary }]}>Account</Text>

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
                  size={70}
                  borderColor={colors.secondary}
                  style={styles.profileAvatar}
                />
              
                <View style={styles.profileBody}>
                  <CustomText 
                    style={[
                      styles.profileName, 
                      { 
                        color:colors.tint 
                      }
                    ]}
                  >
                    {user.name}
                  </CustomText>

                  <CustomText 
                    style={[
                      styles.profileHandle, 
                      { 
                        color:colors.tertiary 
                      }
                    ]}
                  >
                    {user.email}
                  </CustomText>
                </View>

                <FontAwesomeIcon
                  color={colors.tertiary}
                  icon="chevron-right"
                  size={22} 
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
                  color:colors.tertiary 
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
                  { 
                    backgroundColor:colors.secondary, 
                    borderColor:colors.tint, 
                    borderWidth:.2, 
                    borderTopWidth:.2 
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
              <View 
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
              </View>
            </View>
          </View>

          {/* resources */}
          <View style={styles.section}>
            <CustomText 
              style={[
                styles.sectionTitle, 
                { 
                  color:colors.tertiary 
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
                    borderWidth:.2, 
                    borderTopWidth:.2 
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
                    size={19} />
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
                    borderWidth:.2, 
                    borderTopWidth:.2 
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
                    size={19} />
                </TouchableOpacity>
              </View>

              <View 
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
                    size={19} />
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
                    backgroundColor:colors.secondary, 
                    borderColor:colors.tint, 
                    borderWidth:.2, 
                    borderTopWidth:.2 
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
                        color:colors.accent 
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
                color:colors.tertiary 
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
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '600',
  },
  /** Content */
  content: {
    paddingHorizontal: 16,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    // color: '#a69f9f',
  },
  /** Section */
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  sectionBody: {
    borderRadius: 12,
  },
  /** Profile */
  profile: {
    padding: 12,
    borderWidth:.2,
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
  profileBody: {
    marginRight: 'auto',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    // color: '#292929',
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '400',
    // color: '#858585',
  },
  /** Row */
  row: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    // backgroundColor: '#fff',
    borderTopWidth: 1,
    // borderColor: '#f0f0f0',
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    // color: '#000',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: '500',
    // color: '#ababab',
    marginRight: 4,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabelLogout: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '500',
    fontSize:18
    // color: '#dc2626',
  },
});