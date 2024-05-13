import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    flex:1,
  },
  wrapper: {
    flex:1,
    paddingHorizontal:20, 
    justifyContent:'center'
  },
  header: {
    marginVertical:'10%',
  },
  headerDesc: {
    marginVertical:10,
    fontSize:15,
    fontWeight:'500', 
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
    marginBottom:6
  },
  inputField: {
    paddingHorizontal:20,
    height: 55,
    borderRadius:12,
    fontSize:17,
    fontWeight:'500',
    borderWidth:1
  },
  // buttons + navigate to opposite
  buttonWrapper: {
    marginVertical:'5%'
  },
  button: { 
    borderRadius:8, 
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:15, 
  },
  buttonText: {
    fontSize:20,
    fontWeight:'600', 
  },
  navigateToOppositeText: {
    fontSize:17, 
    fontWeight:'600',
    textAlign:'center',
    letterSpacing:0.15,
  },
})