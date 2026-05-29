import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CampusDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CampusDetailsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "700",
  },
});

export default CampusDetailsScreen;