import React from "react";
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
import Message from "../components/Message";
import chatRoomData from "../assets/dummy-data/Chats";
import MessageInput from "../components/MessageInput";
import { useNavigation, useRoute } from "@react-navigation/core";

export default () => {
  const route = useRoute();
  const navigation = useNavigation();

  // ? 헤더바 이름을 여기서도 바꿀 수 있다.
  // navigation.setOptions({ title: "헤더바 이름을 여기서도 바꿀 수 있다." });

  console.log(route.params?.id);

  return (
    // ? View 대신 SafeAreaView 를 쓰면, 노치 같은 곳에 데이터가 표출되지 않는다. 굳!
    <SafeAreaView style={styles.page}>
      <FlatList
        data={chatRoomData.messages}
        renderItem={({ item }) => <Message message={item} />}
        inverted // ? 렌더링 순서 역전
      />
      <MessageInput />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
