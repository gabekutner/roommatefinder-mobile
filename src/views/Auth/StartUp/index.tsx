import React from "react";
import { SafeAreaView, Text, View, StyleSheet, ViewStyle } from "react-native";
import { Button } from "react-native-paper";
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from "types/StackParamList";
import { theme, themeType } from "assets/theme";

// Define navigation prop type
type StartUpViewNavigationProp = StackNavigationProp<AuthStackParamList, 'startup'>;

// Define props type
interface StartUpViewProps {
  navigation: StartUpViewNavigationProp;
};

const StartUpView: React.FC<StartUpViewProps> = ({ 
  navigation 
}) => {
  /**
   * StartUpView component
   * @props
   *  - navigation (StartUpViewNavigationProp)
   */
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, alignItems: 'center' }}>
      <View>
        {/* header */}
        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 40 }}>
          {/* logo */}
          <View style={{ height: 50, width: 50, backgroundColor: theme.colors.onTertiary, marginBottom: 25 }} />
          <View style={{ height: 20, width: 20, backgroundColor: theme.colors.tertiary, marginTop: -50, marginBottom: 25 }} />

          <View style={{ width: 150, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, fontFamily: 'NotoSans_Condensed-Regular', fontWeight: '700', color: theme.colors.primary, textAlign: 'center' }}>
              Sign up or log in to start college
            </Text>
          </View>
        </View>
        {/* content */}
        <View style={{ gap: 15 }}>
          <Button
            onPress={() => navigation.navigate('identifier', { id: 'Email' })}
            mode="elevated"
            buttonColor={theme.colors.primary}
            labelStyle={[styles.text, styles.buttonText, { color: theme.colors.secondary }]} // Apply custom label color
          >
            <Text>Continue with email</Text>
          </Button>

          <Button
            onPress={() => navigation.navigate('identifier', { id: 'Phone Number' })}
            mode="elevated"
            buttonColor={theme.colors.primary}
            labelStyle={[styles.text, styles.buttonText, { color: theme.colors.secondary }]} // Apply custom label color
          >
            <Text>Continue with phone number</Text>
          </Button>

          <Button
            onPress={() => navigation.navigate('identifier', { id: 'UID' })}
            mode="elevated"
            buttonColor={theme.colors.primary}
            labelStyle={[styles.text, styles.buttonText, { color: theme.colors.secondary }]} // Apply custom label color
          >
            <Text>Continue with UID</Text>
          </Button>

          {/* spacer */}
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
            <View style={[styles.spacer, { backgroundColor: theme.colors.primary }]} />
            <Text style={{ fontSize: 12, color: theme.colors.primary, fontWeight: '500' }}>or</Text>
            <View style={[styles.spacer, { backgroundColor: theme.colors.primary }]} />
          </View>

          <Button
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'login' }] })}
            mode="elevated"
            buttonColor={theme.colors.onTertiary}
            labelStyle={[styles.text, styles.buttonText, {color: theme.colors.secondary}]} // Apply custom label color
          >
            <Text>Log in</Text>
          </Button>
        </View>
      </View>

      {/* footer */}
      <View style={{ position: 'absolute', right: 50, left: 50, bottom: 35 }}>
        <Text
          style={[
            styles.text,
            styles.smallText,
            {
              textAlign: 'center',
              color: theme.colors.primary,
              textDecorationLine: 'none'
            }
          ]}
        >
          By continuing to use DormParty, you agree to our{' '}
          <Text
            style={[
              styles.text,
              styles.smallText,
              { color: theme.colors.primary }
            ]}
          >
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text
            style={[
              styles.text,
              styles.smallText,
              { color: theme.colors.primary }
            ]}
          >
            Privacy Policy
          </Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'NotoSans_Condensed-Regular',
  },
  font: {
    fontFamily: 'NotoSans_Condensed-Regular',
  },
  smallText: {
    fontSize: 11,
    textDecorationLine: 'underline',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  spacer: {
    height: 0.5,
    width: 100,
  } as ViewStyle,
});

export { StartUpView };