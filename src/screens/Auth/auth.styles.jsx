import { StyleSheet } from "react-native";
import {colors} from "../../constants/colors";
import {shadow} from "../../styles/styles";

export const styles = StyleSheet.create({
  containerStyle: {
    flex:1,
    backgroundColor:'rgba(0,0,0,.45)' 
  },
  containerImageStyle: {
    opacity:0.6
  },

  wrapper: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:'95%'
  },
  card: {
    paddingVertical:8,
    paddingHorizontal:24,
    borderRadius:12,
    borderWidth:2,
    backgroundColor:colors.primary,
    ...shadow.shadow,
  },
  title: {
    marginVertical:4,
    color: colors.tint,
    fontWeight:'bold', 
    textAlign:'center',
  },

  inputContainer: {
    marginBottom:20,
    borderWidth:2,
    backgroundColor:colors.secondary,
    borderColor:colors.tint   
  },
  inputText: { 
    color:colors.tint 
  },


});