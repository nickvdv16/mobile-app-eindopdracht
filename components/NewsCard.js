import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";

const NewsCard = ({ image, title, intro, category, author, date, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <View style={styles.content}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.intro}>{intro}</Text>
        <Text style={styles.meta}>{author}</Text>
        <Text style={styles.meta}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
  },

  image: {
    width: "100%",
    height: 200,
  },

  content: {
    padding: 20,
  },

  category: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 10,
  },

  title: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 10,
  },

  intro: {
    color: "#000000",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 14,
  },

  meta: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default NewsCard;