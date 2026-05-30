import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CampusCard = ({ name, focus, description, address, color, onPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>

        <View style={[styles.line, { backgroundColor: color }]} />

        <Text style={[styles.focus, { color: color }]}>{focus}</Text>

        <Text style={styles.description}>{description}</Text>

        <Text style={styles.address}>{address}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: color }]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>Naar campus →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  
  content: {
    padding: 20,
  },

  title: {
    fontSize: 22,
    color: "#111111",
    fontWeight: "700",
    marginBottom: 10,
  },

  line: {
    width: 40,
    height: 3,
    borderRadius: 2,
    marginBottom: 14,
  },

  focus: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: "#555555",
    lineHeight: 20,
    marginBottom: 16,
  },

  address: {
    fontSize: 14,
    color: "#111111",
    fontWeight: "700",
    lineHeight: 20,
  },

  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "flex-end",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default CampusCard;