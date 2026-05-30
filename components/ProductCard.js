import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

const ProductCard = ({
  name,
  description,
  price,
  category,
  image,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={styles.category}>{category}</Text>

        <Text style={styles.name}>{name}</Text>

        <Text style={styles.description}>{description}</Text>

        <Text style={styles.price}>$ {price.toFixed(2)} USD</Text>

        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>check out item</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    marginBottom: 26,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#dddddd",
  },

  image: {
    width: "100%",
    height: 230,
  },

  content: {
    padding: 22,
  },

  category: {
    alignSelf: "flex-start",
    backgroundColor: "#eeeeee",
    color: "#111111",
    fontSize: 12,
    fontWeight: "700",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 14,
    textTransform: "uppercase",
  },

  name: {
    color: "#111111",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },

  description: {
    color: "#666666",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 18,
  },

  price: {
    color: "#6CAF1A",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 18,
  },

  button: {
    borderWidth: 1,
    borderColor: "#111111",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default ProductCard;