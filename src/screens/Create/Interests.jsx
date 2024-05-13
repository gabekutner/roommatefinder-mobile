import {
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

import { interestsData } from '../../assets/Dictionary';


function handleOnClick(id, form, setForm) {
  const arr = [...form.interests]
  if (arr.length < 5) {
    if (arr.includes(id)) {
      const index = arr.indexOf(id)
      arr.splice(index, 1)
    }
    arr.push(id)
    setForm({ ...form, interests:arr})
  } else {
    return
  }
}

export default function Interests({ colors, form, setForm }) {
  return (
    <>
      <FlatList 
        showsVerticalScrollIndicator={false}
        data={interestsData}
        style={{ marginBottom:10, borderBottomColor:colors.tint, borderBottomWidth:.5 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleOnClick(item.id, form, setForm)}
            style={[styles.option, { borderColor:colors.accent }]}
          >
            <Text style={[styles.text, { color:colors.tint }]}>{item.interest}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      <Text style={{ marginBottom:80, marginHorizontal:35, color:activeColors.tertiary  }}>
        Pick 1 to 5.
      </Text>
    </>
  )
}

const styles = StyleSheet.create({
  option: {
    paddingVertical:10,
    paddingHorizontal:30,
    borderRadius:10,
    borderWidth:1,
    alignItems:'center',
    marginBottom:20,
  },
  text: {
    fontFamily:'NotoSans_Condensed-Regular',
    fontSize:17,
  }
})