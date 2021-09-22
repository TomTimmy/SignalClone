import * as React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import ChatRoomItem from "../components/ChatRoomItem";
import chatRoomsData from "../assets/dummy-data/ChatRooms";

export default () => {
  return (
    <View style={styles.page}>
      <FlatList
        data={chatRoomsData}
        // ? { item } 은 chatRoomsData 안에 있는 원소들(item)을 가리킨다!
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        // ? 아래와 같은 표현식도 가능하다!
        // renderItem={({ item: chatRoom }) => <ChatRoomItem chatRoom={chatRoom} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {},
});
