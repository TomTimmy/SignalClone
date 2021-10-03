import { FontAwesome, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import {
  ColorSchemeName,
  Pressable,
  View,
  Text,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/HomeScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import UsersScreen from "../screens/UsersScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { useNavigation } from "@react-navigation/core";
import Auth from "@aws-amplify/auth";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../src/models";
import ChatRoomHeader from "./ChatRoomHeader";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: HomeHeader }}
      />
      <Stack.Screen
        name="ChatRoomScreen"
        component={ChatRoomScreen}
        options={({ route }) => ({
          //? ChatRoomHeader 컴포넌트에게 ChatRoomScreen 의 route 를 props 로 전달 할 수 있다!
          headerTitle: () => <ChatRoomHeader id={route.params?.id} />,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="UsersScreen"
        component={UsersScreen}
        options={{
          title: "Users",
        }}
      />
    </Stack.Navigator>
  );
}

const HomeHeader = (props) => {
  const { width } = useWindowDimensions();
  const [authUser, setAuthUser] = useState(undefined);
  const [userImgUri, setUserImgUri] = useState("");
  const navigation = useNavigation();

  // ? DataStore 에서, authUser 의 User 데이터 가져오기.
  useEffect(() => {
    const fetchAuthUser = async () => {
      await Auth.currentAuthenticatedUser().then(setAuthUser);
    };
    fetchAuthUser();
  }, []);

  if (!authUser) {
    return <ActivityIndicator />;
  }

  // ? imgaeUri 가져오기.
  const fetchImageUri = async () => {
    const user = await DataStore.query(User, authUser.attributes.sub);
    setUserImgUri(user?.imageUri);
    // console.log("여기야 ->", userImgUri);
  };
  fetchImageUri();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Image
        source={{
          uri: userImgUri,
        }}
        style={{ width: 30, height: 30, borderRadius: 30 }}
      />
      <View style={{ flex: 1 }}>
        <Text ellipsizeMode="tail" numberOfLines={1}>
          {authUser.attributes.email}
        </Text>
      </View>
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          marginLeft: 50,
          fontWeight: "bold",
        }}
      >
        {/* //? 스크린의 이름 출력. */}
        {props.children}
      </Text>
      <Feather
        name="camera"
        size={24}
        color={"black"}
        style={{ marginHorizontal: 10 }}
      />
      <Pressable onPress={() => navigation.navigate("UsersScreen")}>
        <Feather
          name="edit-2"
          size={24}
          color={"black"}
          style={{ marginHorizontal: 10 }}
        />
      </Pressable>
    </View>
  );
};
