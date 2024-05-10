import { useState, useRef } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  Pressable,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DatePicker from 'react-native-date-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { launchImageLibrary } from 'react-native-image-picker';

import Colors from '../assets/Colors';
import useGlobal from '../core/global';
import { interestsData } from '../assets/Dictionary';


function DormItem({ id, name, dorm, setDorm }) {
  return (
    <View>
      <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
        <Text style={{ fontSize:20, fontWeight:'500' }}>{name}</Text>
        <Pressable onPress={() => {setDorm(id)}}> 
          <FontAwesomeIcon 
            icon="circle"
            size={36}
            color={dorm == id ? Colors.utahRedRocks : Colors.descGrey}
          />
        </Pressable>
      </View>
    </View>
  )
}

function InterestsItem({title, id, handleOnClick}) {
  const [bgColor, setBgColor] = useState(false)
  const [fontColor, setFontColor] = useState(false)

  return (
    <TouchableOpacity 
      onPress={() => {
        setBgColor(!bgColor)
        setFontColor(!fontColor)
        handleOnClick(id)
      }} 
      style={{
        backgroundColor: bgColor ? ('#be0000') : ('#fff'), 
        padding: 10, 
        marginVertical: 8, 
        marginHorizontal: 8, 
        borderRadius:16,
        width:'45%', 
        borderColor:'#ccc', 
        borderWidth:1 
      }}>
      <Text style={{fontSize: 15, alignSelf:'center', fontWeight:'500', color:fontColor ? ('#fff') : ('#222')}}>{title}</Text>
    </TouchableOpacity>
  )
}

export default function CreateProfile({ navigation }) {

  const create = useGlobal(state => state.create)
  const uploadImage = useGlobal(state => state.uploadImage)
  const user = useGlobal(state => state.user)
  const setProfileCreated = useGlobal(state => state.setProfileCreated)

  const dayRef = useRef(null)
  const yearRef = useRef(null)
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [sex, setSex] = useState('')
  const [dorm, setDorm] = useState('')
  const [interests, setInterests] = useState([])
  const [image, setImage] = useState()

  function handleOnClick(id) {
    const arr = [...interests]
    if (arr.length < 5) {
      arr.push(id)
      setInterests(arr)
    } else {
      return
    }
  }

  const buttonStyle = {
    borderWidth:1,
    borderRadius:10,
    backgroundColor:Colors.utahRedRocks,
    paddingHorizontal:16,    
    paddingVertical:13,
    borderColor:Colors.utahRedBG
  }
  const buttonText = {
    color: '#fff',
    fontSize:17,
    fontWeight:'500',
  }
  
  return (
    <SafeAreaView style={{ flex:1 }}>

      <Text style={styles.title}>
        NO INFORMATION PROVIDED HERE WILL BE SENT TO THE UNIVERSITY OF UTAH
      </Text>

      <TouchableOpacity
        onPress={setProfileCreated()}
      >

        <Text>
          Skip for now ...
        </Text>
      </TouchableOpacity>

      {/* <ProgressSteps
        borderWidth={3}
        activeStepIconBorderColor={Colors.utahRed}
        progressBarColor={Colors.utahGranitePeak}
        disabledStepIconColor={Colors.utahGranitePeak}
        completedProgressBarColor={Colors.utahRed}
        completedStepIconColor={Colors.utahRed}
      >
        
        <ProgressStep
          nextBtnStyle={{...buttonStyle}}
          nextBtnTextStyle={{...buttonText}}
        > 
          <View style={{ marginHorizontal:20 }}>

            <Text style={styles.label}>
              When's your birthday?
            </Text>

            <View style={{ flexDirection:'row', gap:10, justifyContent:'center' }}>
              <TextInput 
                autoFocus={true}
                value={JSON.stringify(date.getMonth() + 1)}
                placeholderTextColor={Colors.lightGrey}
                maxLength={2}
                editable={false}
                placeholder='MM'
                style={[styles.input, {width:'auto'}]}
                onPress={() => setOpen(true)}
              />

              <TextInput 
                ref={dayRef}
                editable={false}
                value={JSON.stringify(date.getDate())}
                placeholderTextColor={Colors.lightGrey}
                placeholder='DD'
                style={[styles.input, {width:'auto'}]}
                onPress={() => setOpen(true)}
              />

              <TextInput 
                ref={yearRef}
                editable={false}
                value={JSON.stringify(date.getFullYear())}
                placeholderTextColor={Colors.lightGrey}
                maxLength={4}
                placeholder='YYYY'
                style={[styles.input, {width:'auto'}]}
                onPress={() => setOpen(true)}
              />
            </View>
          </View>
        </ProgressStep>

        <ProgressStep
          nextBtnStyle={{...buttonStyle}}
          nextBtnTextStyle={{...buttonText}}
          previousBtnStyle={{...buttonStyle}}
          previousBtnTextStyle={{...buttonText}}
        > 
          <View style={{ marginHorizontal:20, gap:30 }}>
            <Text style={styles.label}>I'm a </Text>

            <View>
              <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
                <Text style={{ fontSize:20, fontWeight:'500' }}>Guy</Text>
                <Pressable onPress={() => {setSex("M")}}> 
                  <FontAwesomeIcon
                    icon="circle"
                    size={36}
                    color={sex == "M" ? Colors.utahRedRocks : Colors.descGrey}
                  />
                </Pressable>
              </View>
            </View>

            <View>
              <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
                <Text style={{ fontSize:20, fontWeight:'500' }}>Girl</Text>
                <Pressable onPress={() => {setSex("F")}}> 
                  <FontAwesomeIcon
                    icon="circle"
                    size={36}
                    color={sex == "F" ? Colors.utahRedRocks : Colors.descGrey}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </ProgressStep>

        <ProgressStep
          nextBtnStyle={{...buttonStyle}}
          nextBtnTextStyle={{...buttonText}}
          previousBtnStyle={{...buttonStyle}}
          previousBtnTextStyle={{...buttonText}}
        > 
          <View style={{ marginHorizontal:20, gap:25, marginBottom:20 }}>
            <Text style={styles.label} >What dorm will you be living in?</Text>
            <DormItem id="4" name="Kahlert Village" dorm={dorm} setDorm={setDorm} />
            <DormItem id="1" name="Chapel Glen" dorm={dorm} setDorm={setDorm} />
            <DormItem id="3" name="Impact and Prosperity Epicenter" dorm={dorm} setDorm={setDorm} />
            <DormItem id="5" name="Lassonde Studios" dorm={dorm} setDorm={setDorm} />
            <DormItem id="7" name="Sage Point" dorm={dorm} setDorm={setDorm} />
            <DormItem id="8" name="Marriott Honors Community" dorm={dorm} setDorm={setDorm} />
            <DormItem id="9" name="Guest House" dorm={dorm} setDorm={setDorm} />
            <DormItem id="2" name="Gateway Heights" dorm={dorm} setDorm={setDorm} />
            <DormItem id="6" name="Officers Circle" dorm={dorm} setDorm={setDorm} />
            <DormItem id="10" name="I don't know 🤷‍♂️" dorm={dorm} setDorm={setDorm} />
          </View>
        </ProgressStep>

        <ProgressStep
          nextBtnStyle={{...buttonStyle}}
          nextBtnTextStyle={{...buttonText}}
          previousBtnStyle={{...buttonStyle}}
          previousBtnTextStyle={{...buttonText}}
          scrollable={false}
        > 
          <View style={{ marginHorizontal:20, gap:25, marginBottom:20 }}>
            <Text style={styles.label}>What do you wanna do in college?</Text>

            <FlatList 
              data={interestsData}
              numColumns={2}
              renderItem={({item}) => <InterestsItem title={item.interest} id={item.id} handleOnClick={handleOnClick} />}
              keyExtractor={item => item.id}
              style={{ borderBottomColor:'#ccc', borderBottomWidth:1, height:'72.1%' }}
            />
          </View>
        </ProgressStep>

        <ProgressStep
          nextBtnStyle={{...buttonStyle, backgroundColor:'transparent' }}
          nextBtnTextStyle={{...buttonText, color:Colors.utahRedRocks}}
          previousBtnStyle={{...buttonStyle}}
          previousBtnTextStyle={{...buttonText}}
          onSubmit={() => {
            create({
              birthday: ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + date.getFullYear(), 
              sex:sex, 
              dorm:dorm, 
              interests:interests }, user)
            uploadImage(image, user)
          }}
        > 
          <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
            <View>
              <TouchableOpacity 
                style={{ 
                  alignItems:'center',
                  justifyContent:'center',
                  height:300, 
                  width:200, 
                  borderWidth: image ? 0:2, 
                  borderColor:Colors.labelBlack,
                  borderStyle:'dashed',
                  borderRadius:10,
                }}
                onPress={() => {
                  launchImageLibrary({ includeBase64:true, }, (response) => {
                    if (response.didCancel) return
                    const file = response.assets[0]
                    setImage(file)
                  })
                }}
              >
                { image ? (
                  <Image 
                    source={{ uri:image.uri }}
                    style={{ width:'100%', height:'100%', borderRadius:10, }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon='image'
                    size={22}
                    color={Colors.labelBlack}
                  />
                ) }
              </TouchableOpacity>
              <View style={{ marginTop:10 }}>
                <Text style={{ fontFamily:'NotoSans_Condensed-Regular', fontSize:14 }}>Add a profile picture</Text>
              </View>
            </View>
            
          </View>
        </ProgressStep>

      </ProgressSteps>

      <DatePicker
        modal
        open={open}
        date={date}
        mode={'date'}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop:50, 
    textAlign:'center', 
    color:Colors.descGrey,
  },
  label: {
    fontSize:25, 
    fontWeight:'500', 
    marginBottom:30,
  },
  input: {
    backgroundColor:'#fff',
    paddingHorizontal:20,
    height: 66,
    borderRadius:12,
    fontSize:20,
    fontWeight:'500',
    color:'#222',
    borderWidth:1,
    borderColor:'#ccc',
  },
})