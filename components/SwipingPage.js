import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import SwipeCards from "./SwipeCards";

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function SwipingPage() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "flex-start" }}>
        <SwipeCards />
      </View>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
        <View style={styles.icons}>
          <Icon size={27} reverse name="cancel" />
        </View>
        <View style={styles.icons}>
          <Icon size={27} reverse name="info" />
        </View>
        <View style={styles.icons}>
          <Icon size={27} reverse name="favorite" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  icons: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
});
