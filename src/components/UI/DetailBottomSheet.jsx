import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


export default function DetailBottomSheet({ item, setShow, colors }) {

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor:colors.primary }]}
      contentContainerStyle={styles.scrollview}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container1}>
        <View style={styles.nameTextContainer}>
          <Text style={[styles.nameText, { color:colors.tint }]}>{`${item.name}, ${item.age}`}</Text>
        </View>
        <TouchableOpacity onPress={() => setShow(false)} style={[styles.closeContainer, { backgroundColor:colors.secondary }]}>
          <FontAwesomeIcon 
            icon="arrow-down"
            size={22}
            color={colors.accent}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text>add</Text>
      </TouchableOpacity>

      <View style={[styles.line, { borderColor:colors.tertiary }]} />

      <View style={styles.descriptionContainer}>
        <Text style={{ fontSize: 18,fontWeight: '500', marginBottom: 4, color:colors.tint }}>
          About
        </Text>
        <Text style={[styles.descriptionText, { color:colors.tertiary }]}>{item.description}</Text>
      </View>

      {/* preview means open as match or member of group, so no need of like buttons */}
      {/* {!preview && (
        <>
          <View style={styles.line} />
          <SwipeButtons
            rewind={false}
            onLeft={handleDislike}
            onRight={handleLike}
          />
        </>
      )} */}

      {/* if  is my profile review, then don't give the option to block my profile */}
      {/* {!isMyProfile && (
        <>
          <View style={styles.line} />
          <View style={styles.reportContainer}>
            <TouchableOpacity
              style={styles.blockButton}
              onPress={blockProfileAlert}
            >
              <Text style={styles.blockButtonText}>Block Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.blockButton}
              onPress={reportProfileAlert}
            >
              <Text style={styles.blockButtonText}>Report Profile</Text>
            </TouchableOpacity>
          </View>
        </>
      )} */}
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: 'hidden',
    padding: 20,
    borderRadius: 10,
    minHeight: '30%',
    maxHeight: '40%',
  },
  scrollview: {},
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nameTextContainer: {
    flexDirection: 'column',
  },
  closeContainer: {
    borderRadius: 100,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 25,
    fontWeight: '500',
  },
  toogetherGroupText: {
    fontSize: 15,
  },
  infoWrapper: {
    flexDirection: 'row',
    margin: 3,
  },
  icon: {
    fontSize: 20,
  },
  text: {
    fontSize: 15,
    marginLeft: 10,
  },
  descriptionContainer: {
    margin: 3,
  },
  descriptionText: {
    fontSize: 15,
  },
  line: {
    borderBottomWidth: 0.8,
    margin: 10,
  },
  reportContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 50,
  },
  blockButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  blockButtonText: {
    fontSize: 15,
  },
})