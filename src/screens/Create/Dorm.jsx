import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

import { dormsData } from '../../assets/Dictionary';


export default function Dorm({ colors, form, setForm }) {

  return (
    <FlatList 
      showsVerticalScrollIndicator={false}
      data={dormsData}
      style={{ marginBottom:110, borderBottomColor:colors.tint, borderBottomWidth:.5 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => setForm({...form, dorm:item.id })}
          style={[styles.option, { borderColor:colors.accent }]}
        >
          <Text style={[styles.text, { color:colors.tint }]}>{item.dorm}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
    />
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