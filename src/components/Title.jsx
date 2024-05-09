import { Text } from 'react-native';


export default function Title({ text, color }) {
  return (
    <Text
      style={{
        color:color,
        textAlign:'center',
        fontSize:34,
        fontFamily:'Glegoo-Bold'
      }}
    >
      {text}
    </Text>
  )
}