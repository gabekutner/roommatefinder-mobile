import {StatusBar} from "react-native";
import {Container, HeaderTitle, Version} from "./SplashScreen.view";


function SplashScreen() {
  return (
    <Container>
      {/* StatusBar deprecated after custom statusbar  */}
      <StatusBar barStyle="light-content" />
      <HeaderTitle />
      <Version version="1.0.0." />
    </Container>
  );
};

export default SplashScreen;