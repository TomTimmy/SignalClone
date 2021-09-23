import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

// ? AWS Amplify 사용하기!
//  ! 아래 라이브러리들 사전설치 필요!
// curl -sL https://aws-amplify.github.io/amplify-cli/install | bash && $SHELL
// npm install aws-amplify aws-amplify-react-native @react-native-community/netinfo @react-native-async-storage/async-storage
import Amplify, { Auth } from "aws-amplify";
import config from "./src/aws-exports";
//? Auth, "aws-amplify-react-native" 빨간줄 뜨면 무시할 것.
import { withAuthenticator } from "aws-amplify-react-native";

Amplify.configure(config);

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  Auth.currentAuthenticatedUser().then(console.log);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

// ? 이렇게 해주면, 첫화면에 로그인/회원가입 스크린이 뜬다! 단 코드 4줄만으로...
// ? 스크린 커스터마이징도 가능하다.
export default withAuthenticator(App);
