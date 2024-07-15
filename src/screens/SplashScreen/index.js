import {StatusBar} from "react-native";
import {Container, Title, Version} from "./SplashScreen.view";


function SplashScreen({ props }) {
  return (
    <Container>
      {/* StatusBar deprecated after custom statusbar  */}
      <StatusBar barStyle='light-content' />
      <Title />
      <Version />
    </Container>
  ); 
};

export default SplashScreen;