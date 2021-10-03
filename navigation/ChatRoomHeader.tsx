import React, { useEffect, useState } from "react";
import { View, Text, useWindowDimensions, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { DataStore, Auth } from "aws-amplify";
import { ChatRoomUser, User, Message } from "../src/models";

export default function ChatRoomHeader({ id, children }) {
  const { width } = useWindowDimensions();
  const [user, setUser] = useState(null); // ? The display user

  useEffect(() => {
    if (!id) {
      //? id 가 null 이면 아무것도 하지 않는다.
      return;
    }

    const fetchUsers = async () => {
      // ? 지금 채팅방과 연결된 ChatRoomUser 를 찾기 위해서
      // ? 지금 채팅방의 id(chatRoom.id) 와 같은 ChatRoomUser.id 를 골라낸다.
      // ? 이후, 각각의 ChatRoomUser 와 연결된 user 의 목록을 가져온다.
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter((ChatRoomUser) => ChatRoomUser.chatroom.id === id)
        .map((ChatRoomUser) => ChatRoomUser.user);

      //? All users in this chatRoom
      // setUsers(fetchedUsers);

      // ? Display user 설정.
      // ? 내가 아닌 다른 유저를 Display 한다. (나 == authUser)
      const authUser = await Auth.currentAuthenticatedUser();
      setUser(
        fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
      );
    };
    fetchUsers();
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: width - 25,
        // marginLeft: 25,
        marginRight: 100,
        padding: 10,
        alignItems: "center",
      }}
    >
      <Image
        //? 상대방(user) 의 이미지를 표출.
        source={{ uri: user?.imageUri }}
        style={{ width: 30, height: 30, borderRadius: 30 }}
      />
      <Text style={{ flex: 1, marginLeft: 10, fontWeight: "bold" }}>
        {user?.name}
      </Text>
      <Feather
        name="camera"
        size={24}
        color={"black"}
        style={{ marginHorizontal: 10 }}
      />
      <Feather
        name="edit-2"
        size={24}
        color={"black"}
        style={{ marginHorizontal: 10 }}
      />
    </View>
  );
}
