import React, { useState, useEffect } from "react";
import { StyleSheet, View, Pressable, FlatList, Text } from "react-native";
import ChatRoomItem from "../components/ChatRoomItem";
import chatRoomsData from "../assets/dummy-data/ChatRooms";

// ? To use AWS Amplify ㅎㅎ
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, ChatRoomUser } from "../src/models";

const HomeScreen = () => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const userData = await Auth.currentAuthenticatedUser();

      const chatRooms = (await DataStore.query(ChatRoomUser))
        .filter(
          (ChatRoomUser) => ChatRoomUser.user.id === userData.attributes.sub
        )
        .map((ChatRoomUser) => ChatRoomUser.chatroom);
      // console.log("챗", chatRooms);

      setChatRooms(chatRooms);
    };
    fetchChatRooms();

    return () => {};
  }, []);

  // ? 로그아웃 함수
  const logOut = () => {
    Auth.signOut();
  };
  return (
    <View style={styles.page}>
      <FlatList
        data={chatRooms}
        // ? { item } 은 chatRoomsData 안에 있는 원소들(item)을 가리킨다!
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        // ? 아래와 같은 표현식도 가능하다!
        // renderItem={({ item: chatRoom }) => <ChatRoomItem chatRoom={chatRoom} />}
      />

      {/* 로그아웃 버튼 */}
      <Pressable style={styles.logOutContainer} onPress={logOut}>
        <Text>로그아웃</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {},
  logOutContainer: {
    backgroundColor: "skyblue",
    height: 30,
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
