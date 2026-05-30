import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ProductCard = ({ image, name, description, price, category, onPress }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.category}>{category}</Text>

        <Text style={styles.title}>{name}</Text>

        <Text style={styles.description}>{description}</Text>

        <Text style={styles.price}>€ {Number(price).toFixed(2)}</Text>

        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Bekijk product</Text>
        </TouchableOpacity>
      </View>
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
  image: {
    width: "100%",
    height: 170,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
  category: {
    fontSize: 12,
    color: "#86BC25",
    fontWeight: "700",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 20,
    color: "#111111",
    fontWeight: "700",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    color: "#86BC25",
    fontWeight: "700",
    marginBottom: 14,
  },
  button: {
    borderWidth: 1,
    borderColor: "#111111",
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  buttonText: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default ProductCard;