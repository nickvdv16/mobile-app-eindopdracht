import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

import AppHeader from "../components/AppHeader.js";
import AppFooter from "../components/AppFooter.js";
import NewsCard from "../components/NewsCard.js";

import { API_TOKEN, WEBFLOW_COLLECTIONS } from "../config/webflow.js";
import { newsCategoryNames } from "../constants/categories.js";
import { checkResponse, formatDate } from "../utils/apiHelpers.js";

const NewsDetailsScreen = ({ route, navigation }) => {
  const selectedNews = route.params;

  const [newsItems, setNewsItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Alle categorieën");
  const [newsSearch, setNewsSearch] = useState("");
  const [newsSort, setNewsSort] = useState("Standaard");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = () => {
    fetch(WEBFLOW_COLLECTIONS.news, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    })
      .then(checkResponse)
      .then((data) => {
        const newsItemsFromApi = data.items || [];

        const formattedNews = newsItemsFromApi.map((item) => {
          const categoryId = item.fieldData.categories;
          const categoryName =
            newsCategoryNames[categoryId] || "Geen categorie";

          return {
            id: item.id,
            title: item.fieldData.name,
            intro: item.fieldData.intro,
            image: item.fieldData.image?.url,
            date: formatDate(item.fieldData.datum),
            rawDate: item.fieldData.datum,
            category: categoryName,
            author: item.fieldData["autheur-naam"],
            authorImage: item.fieldData["autheur-foto"]?.url,
            content: item.fieldData["inhoud-uitgebreid"],
            htmlContent: item.fieldData.inhoud,
            slug: item.fieldData.slug,
          };
        });

        setNewsItems(formattedNews);
      })
      .catch((error) => {
        console.error("Fout bij ophalen nieuws:", error.message);
      });
  };

  const categoryFilters = [
    "Alle categorieën",
    ...new Set(newsItems.map((news) => news.category).filter(Boolean)),
  ];

  const newsSortOptions = ["Standaard", "Naam A/Z", "Naam Z/A"];

  const relatedNews = newsItems
    .filter((news) => news.id !== selectedNews.id)
    .filter((news) => {
      const matchesSearch = news.title
        .toLowerCase()
        .includes(newsSearch.toLowerCase());

      const matchesCategory =
        selectedCategory === "Alle categorieën" ||
        news.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (newsSort === "Naam A/Z") {
        return a.title.localeCompare(b.title);
      }

      if (newsSort === "Naam Z/A") {
        return b.title.localeCompare(a.title);
      }

      return new Date(b.rawDate) - new Date(a.rawDate);
    })
    .slice(0, 4);

  return (
    <ScrollView style={styles.page}>
      <AppHeader navigation={navigation} />

      <Text style={styles.backText} onPress={() => navigation.goBack()}>
        Terug
      </Text>

      <View style={styles.articleSection}>
        <Text style={styles.categoryBadge}>{selectedNews.category}</Text>

        <Text style={styles.articleTitle}>{selectedNews.title}</Text>

        <Text style={styles.articleContent}>{selectedNews.content}</Text>

        <View style={styles.divider} />

        <View style={styles.authorRow}>
          {selectedNews.authorImage ? (
            <Image
              source={{ uri: selectedNews.authorImage }}
              style={styles.authorImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.authorPlaceholder}>
              <Text style={styles.authorInitial}>
                {selectedNews.author
                  ? selectedNews.author.charAt(0).toUpperCase()
                  : "?"}
              </Text>
            </View>
          )}

          <View>
            <Text style={styles.authorName}>{selectedNews.author}</Text>
            <Text style={styles.articleDate}>{selectedNews.date}</Text>
          </View>
        </View>

        {selectedNews.image && (
          <Image
            source={{ uri: selectedNews.image }}
            style={styles.articleImage}
            resizeMode="cover"
          />
        )}
      </View>

      <View style={styles.relatedSection}>
        <Text style={styles.relatedTitle}>Meer nieuws</Text>

        <TextInput
          placeholder="Zoek nieuws op titel..."
          placeholderTextColor="#777777"
          value={newsSearch}
          onChangeText={setNewsSearch}
          style={styles.searchInput}
        />

        <Text style={styles.controlLabel}>Filter op categorie</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {categoryFilters.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category &&
                    styles.categoryButtonTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.controlLabel}>Sorteer nieuws</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {newsSortOptions.map((sortOption) => (
            <TouchableOpacity
              key={sortOption}
              style={[
                styles.sortButton,
                newsSort === sortOption && styles.sortButtonActive,
              ]}
              onPress={() => setNewsSort(sortOption)}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  newsSort === sortOption && styles.sortButtonTextActive,
                ]}
              >
                {sortOption}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.resultText}>
          {relatedNews.length} nieuwsartikel(en) gevonden
        </Text>

        {relatedNews.map((news) => (
          <NewsCard
            key={news.id}
            image={news.image}
            title={news.title}
            intro={news.intro}
            category={news.category}
            author={news.author}
            date={news.date}
            onPress={() => navigation.push("NewsDetails", news)}
          />
        ))}
      </View>

      <View style={styles.discoverSection}>
        <Text style={styles.discoverTitle}>
          Ontdek meer over Busleyden Atheneum
        </Text>

        <Text style={styles.discoverText}>
          Bekijk onze campussen of start de studiezoeker en vind de richting die
          bij jou past.
        </Text>

        <TouchableOpacity
          style={styles.discoverPrimaryButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.discoverPrimaryButtonText}>
            Bekijk onze campussen →
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.discoverSecondaryButton}>
          <Text style={styles.discoverSecondaryButtonText}>
            Start de studiezoeker →
          </Text>
        </TouchableOpacity>

        <Image
          source={require("../assets/tree.png")}
          style={styles.discoverImage}
          resizeMode="contain"
        />
      </View>

      <AppFooter />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  backText: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "700",
    paddingHorizontal: 24,
    paddingTop: 42,
    paddingBottom: 28,
  },

  articleSection: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 56,
  },

  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#86BC25",
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "800",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginBottom: 24,
  },

  articleTitle: {
    color: "#111111",
    fontSize: 25,
    fontWeight: "800",
    lineHeight: 32,
    marginBottom: 24,
  },

  articleContent: {
    color: "#666666",
    fontSize: 18,
    lineHeight: 29,
    marginBottom: 34,
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e5e5",
    marginBottom: 28,
  },

  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 46,
  },

  authorImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
  },

  authorPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#86BC25",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  authorInitial: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
  },

  authorName: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },

  articleDate: {
    color: "#111111",
    fontSize: 16,
  },

  articleImage: {
    width: "100%",
    height: 290,
    borderRadius: 8,
  },

  relatedSection: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: 42,
    paddingBottom: 60,
  },

  relatedTitle: {
    color: "#111111",
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40,
    marginBottom: 26,
  },

  searchInput: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 16,
    color: "#111111",
    fontSize: 16,
    marginBottom: 26,
  },

  controlLabel: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  categoryRow: {
    paddingBottom: 28,
  },

  categoryButton: {
    backgroundColor: "#000000",
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 7,
    marginRight: 12,
  },

  categoryButtonActive: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#111111",
  },

  categoryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  categoryButtonTextActive: {
    color: "#111111",
  },

  sortButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#111111",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
  },

  sortButtonActive: {
    backgroundColor: "#86BC25",
    borderColor: "#86BC25",
  },

  sortButtonText: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "600",
  },

  sortButtonTextActive: {
    color: "#111111",
  },

  resultText: {
    color: "#555555",
    fontSize: 15,
    marginBottom: 22,
  },

  discoverSection: {
    backgroundColor: "#f5faed",
    marginHorizontal: 16,
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 48,
    alignItems: "center",
    marginBottom: 70,
  },

  discoverTitle: {
    color: "#000000",
    fontSize: 36,
    fontWeight: "800",
    lineHeight: 44,
    textAlign: "center",
    marginBottom: 22,
  },

  discoverText: {
    color: "#333333",
    fontSize: 17,
    lineHeight: 27,
    textAlign: "center",
    marginBottom: 34,
  },

  discoverPrimaryButton: {
    backgroundColor: "#86BC25",
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 28,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },

  discoverPrimaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },

  discoverSecondaryButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#86BC25",
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 28,
    width: "100%",
    alignItems: "center",
    marginBottom: 34,
  },

  discoverSecondaryButtonText: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "800",
  },

  discoverImage: {
    width: 550,
    height: 250,
    marginTop: 24,
    alignSelf: "center",
  },
});

export default NewsDetailsScreen;