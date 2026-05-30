import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const NewsCard = ({ image, title, intro, category, author, date, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.category}>{category}</Text>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.intro}>{intro}</Text>

        <View style={styles.authorRow}>
          <View style={styles.authorCircle}>
            <Text style={styles.authorInitial}>
              {author ? author.charAt(0) : "A"}
            </Text>
          </View>

          <View>
            <Text style={styles.author}>{author}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    color: "#111111",
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 19,
    color: "#111111",
    fontWeight: "700",
    marginBottom: 8,
  },
  intro: {
    fontSize: 14,
    color: "#555555",
    lineHeight: 20,
    marginBottom: 16,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  authorCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#86BC25",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  authorInitial: {
    color: "#ffffff",
    fontWeight: "700",
  },
  author: {
    fontSize: 13,
    color: "#111111",
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
});

export default NewsCard;