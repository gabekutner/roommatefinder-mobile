import { StyleSheet } from 'react-native';
import Colors from '../assets/Colors';


export default StyleSheet.create({
  container: {
    flex:1,
  },
  wrapper: {
    flex:1,
    paddingHorizontal:20, 
    justifyContent:'center'
  },

  // header -> title and description 
  header: {
    marginVertical:50,
  },
  headerTitle: {
    fontSize:27, 
    fontWeight:'700', 
    color:Colors.titleBlack, 
    marginBottom:6, 
    textAlign:'center',
  },
  headerDesc: {
    marginVertical:10,
    fontSize:15,
    fontWeight:'500', 
    color: Colors.descGrey,
    textAlign:'center'
  },
  // input fields
  inputWrapper: {
    marginBottom:24, 
    flex:1
  },
  inputFieldWrapper: {
    marginBottom:16
  },
  inputFieldLabel: {
    fontSize:17, 
    fontWeight:'600', 
    color: Colors.labelBlack, 
    marginBottom:6
  },
  inputField: {
    backgroundColor:Colors.utahWhite,
    paddingHorizontal:20,
    height: 55,
    borderRadius:12,
    fontSize:17,
    fontWeight:'500',
    color: Colors.labelBlack, 
    borderColor:Colors.lightGrey,
    borderWidth:1
  },
  // buttons + navigate to opposite
  buttonWrapper: {
    marginVertical:24
  },
  button: {
    backgroundColor:Colors.utahRedRocks, 
    borderRadius:8, 
    borderWidth:1,
    borderColor:Colors.utahRedBG,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:15, 
  },
  buttonText: {
    fontSize:20,
    fontWeight:'600', 
    color: Colors.bg
  },
  navigateToOppositeText: {
    fontSize:17, 
    fontWeight:'600',
    color:Colors.labelBlack,
    textAlign:'center',
    letterSpacing:0.15,
  },
})