import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import AppHeader from "../components/AppHeader.js";
import AppFooter from "../components/AppFooter.js";
import NewsCard from "../components/NewsCard.js";

import { API_TOKEN, WEBFLOW_COLLECTIONS } from "../config/webflow.js";
import { newsCategoryNames } from "../constants/categories.js";
import { checkResponse, formatDate } from "../utils/apiHelpers.js";

const hexToRgba = (hex, opacity) => {
  if (!hex) {
    return `rgba(134, 188, 37, ${opacity})`;
  }

  const cleanHex = hex.replace("#", "");

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const CampusDetailsScreen = ({ route, navigation }) => {
  const campus = route.params;
  const campusColor = campus.color || "#86BC25";
  const campusLightColor = hexToRgba(campusColor, 0.12);

  const [newsItems, setNewsItems] = useState([]);

  const getCampusLogo = () => {
    const campusSlug = campus.slug?.toLowerCase() || "";
    const campusName = campus.name?.toLowerCase() || "";
    const campusFocus = campus.focus?.toLowerCase() || "";

    const campusText = `${campusSlug} ${campusName} ${campusFocus}`;

    if (campusText.includes("botaniek")) {
      return require("../assets/logo-botaniek.png");
    }

    if (campusText.includes("caput")) {
      return require("../assets/logo-caput.png");
    }

    if (
      campusText.includes("debeemden") ||
      campusText.includes("de-beemden") ||
      campusText.includes("beemden")
    ) {
      return require("../assets/logo-debeemden.png");
    }

    if (
      campusText.includes("hbo5") ||
      campusText.includes("basisverpleegkunde") ||
      campusText.includes("basisverpleegkundige")
    ) {
      return require("../assets/logo-hbo5.png");
    }

    if (campusText.includes("nekkerspoel")) {
      return require("../assets/logo-nekkerspoel.png");
    }

    if (campusText.includes("pitzemburg")) {
      return require("../assets/logo-pitzemburg.png");
    }

    if (campusText.includes("stassart")) {
      return require("../assets/logo-stassart.png");
    }

    if (campusText.includes("zandpoort")) {
      return require("../assets/logo-zandpoort.png");
    }

    return require("../assets/ba-logo.png");
  };

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

  const latestNews = [...newsItems]
    .sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate))
    .slice(0, 2);

  return (
    <ScrollView style={styles.page}>
      <AppHeader navigation={navigation} logoSource={getCampusLogo()} />

      <View style={styles.heroSection}>
        {campus.image && (
          <Image
            source={{ uri: campus.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        )}

        <View style={styles.heroOverlay} />

        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>{campus.focus}</Text>
          <Text style={styles.heroSubtitle}>{campus.name}</Text>

          <TouchableOpacity
            style={[styles.heroButton, { backgroundColor: campusColor }]}
          >
            <Text style={styles.heroButtonText}>Ontdek onze campus</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsWrapper}
        contentContainerStyle={styles.tabsRow}
      >
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>Studieaanbod</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>Onze school</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>Infodagen</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>Inschrijven</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>Contact</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.introSection}>
        <Text style={styles.introTitle}>{campus.focus}</Text>

        <Text style={styles.introText}>
          {campus.content || campus.description}
        </Text>
      </View>

      <View style={styles.featuresSection}>
        <View style={styles.featureItem}>
          <View
            style={[
              styles.featureIconBox,
              { backgroundColor: campusLightColor },
            ]}
          >
            <Text style={[styles.featureIcon, { color: campusColor }]}>🎓</Text>
          </View>

          <View style={styles.featureTextBox}>
            <Text style={styles.featureTitle}>Zorgopleiding</Text>
            <Text style={styles.featureText}>
              Studenten bouwen kennis en vaardigheden op voor een toekomst in de
              zorg.
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <View
            style={[
              styles.featureIconBox,
              { backgroundColor: campusLightColor },
            ]}
          >
            <Text style={[styles.featureIcon, { color: campusColor }]}>👥</Text>
          </View>

          <View style={styles.featureTextBox}>
            <Text style={styles.featureTitle}>Leren in de praktijk</Text>
            <Text style={styles.featureText}>
              Praktijkervaring en stages vormen een belangrijk onderdeel van de
              opleiding.
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <View
            style={[
              styles.featureIconBox,
              { backgroundColor: campusLightColor },
            ]}
          >
            <Text style={[styles.featureIcon, { color: campusColor }]}>💼</Text>
          </View>

          <View style={styles.featureTextBox}>
            <Text style={styles.featureTitle}>Professionele houding</Text>
            <Text style={styles.featureText}>
              Studenten leren verantwoordelijk, zorgvuldig en empathisch werken.
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <View
            style={[
              styles.featureIconBox,
              { backgroundColor: campusLightColor },
            ]}
          >
            <Text style={[styles.featureIcon, { color: campusColor }]}>↗</Text>
          </View>

          <View style={styles.featureTextBox}>
            <Text style={styles.featureTitle}>Diploma met toekomst</Text>
            <Text style={styles.featureText}>
              De opleiding bereidt studenten voor op een job met
              maatschappelijke waarde.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.newsSection}>
        <View style={styles.newsHeaderRow}>
          <Text style={styles.newsTitle}>Nieuws & activiteiten</Text>

          <TouchableOpacity
            style={[styles.allNewsButton, { borderColor: campusColor }]}
          >
            <Text style={[styles.allNewsButtonText, { color: campusColor }]}>
              Alle nieuws van deze campus →
            </Text>
          </TouchableOpacity>
        </View>

        {latestNews.map((news) => (
          <NewsCard
            key={news.id}
            image={news.image}
            title={news.title}
            intro={news.intro}
            category={news.category}
            author={news.author}
            date={news.date}
            onPress={() => navigation.navigate("NewsDetails", news)}
          />
        ))}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Praktische info</Text>

        <View style={styles.infoItem}>
          <Text style={styles.infoItemTitle}>Adres</Text>
          <Text style={styles.infoText}>{campus.address}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoItemTitle}>Telefoon</Text>
          <Text style={styles.infoText}>{campus.phone || "015 00 00 09"}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoItemTitle}>E-mail</Text>
          <Text style={styles.infoText}>
            {campus.email || "info@busleydenatheneum.be"}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoItemTitle}>Openingsuren</Text>
          <Text style={styles.infoText}>Ma - Vr: 8u00 - 17u00</Text>
        </View>
      </View>

      {campus.map && (
        <View style={styles.mapSection}>
          <Image
            source={{ uri: campus.map }}
            style={styles.mapImage}
            resizeMode="cover"
          />
        </View>
      )}

      <View
        style={[styles.infodaySection, { backgroundColor: campusLightColor }]}
      >
        <View
          style={[styles.infodayIconBox, { backgroundColor: campusColor }]}
        >
          <Text style={styles.infodayIcon}>▦</Text>
        </View>

        <Text style={styles.infodayTitle}>Kom langs op onze infodag!</Text>

        <Text style={styles.infodayText}>
          Ontdek onze campus, opleidingen en sfeer tijdens een van onze
          infodagen.
        </Text>

        <TouchableOpacity
          style={[styles.infodayButton, { backgroundColor: campusColor }]}
        >
          <Text style={styles.infodayButtonText}>Bekijk de infodagen →</Text>
        </TouchableOpacity>
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

  heroSection: {
    height: 500,
    position: "relative",
    backgroundColor: "#000000",
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },

  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.50)",
    zIndex: 1,
  },

  heroContent: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 70,
    zIndex: 2,
  },

  heroTitle: {
    color: "#ffffff",
    fontSize: 48,
    fontWeight: "800",
    lineHeight: 54,
    marginBottom: 14,
  },

  heroSubtitle: {
    color: "#ffffff",
    fontSize: 23,
    fontWeight: "500",
    marginBottom: 36,
  },

  heroButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignSelf: "flex-start",
  },

  heroButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },

  tabsWrapper: {
    backgroundColor: "#000000",
  },

  tabsRow: {
    paddingHorizontal: 24,
  },

  tabItem: {
    paddingVertical: 24,
    paddingHorizontal: 12,
    marginRight: 24,
  },

  tabText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "500",
  },

  introSection: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 42,
  },

  introTitle: {
    color: "#111111",
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 12,
  },

  introText: {
    color: "#111111",
    fontSize: 18,
    lineHeight: 29,
  },

  featuresSection: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 80,
  },

  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 34,
  },

  featureIconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 22,
  },

  featureIcon: {
    fontSize: 26,
    fontWeight: "800",
  },

  featureTextBox: {
    flex: 1,
  },

  featureTitle: {
    color: "#111111",
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 10,
  },

  featureText: {
    color: "#444444",
    fontSize: 17,
    lineHeight: 27,
  },

  newsSection: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 70,
  },

  newsHeaderRow: {
    marginBottom: 28,
  },

  newsTitle: {
    color: "#111111",
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    marginBottom: 18,
  },

  allNewsButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 22,
    alignItems: "center",
  },

  allNewsButtonText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },

  infoSection: {
    backgroundColor: "#f7f7f7",
    marginHorizontal: 16,
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingTop: 34,
    paddingBottom: 34,
    marginBottom: 64,
  },

  infoTitle: {
    color: "#111111",
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 28,
  },

  infoItem: {
    marginBottom: 28,
  },

  infoItemTitle: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
  },

  infoText: {
    color: "#444444",
    fontSize: 16,
    lineHeight: 26,
  },

  mapSection: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingBottom: 80,
  },

  mapImage: {
    width: "100%",
    height: 300,
    borderRadius: 16,
  },

  infodaySection: {
    marginHorizontal: 16,
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingTop: 38,
    paddingBottom: 38,
    marginBottom: 80,
  },

  infodayIconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  infodayIcon: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "800",
  },

  infodayTitle: {
    color: "#111111",
    fontSize: 26,
    fontWeight: "500",
    lineHeight: 32,
    marginBottom: 12,
  },

  infodayText: {
    color: "#333333",
    fontSize: 17,
    lineHeight: 27,
    marginBottom: 28,
  },

  infodayButton: {
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 6,
    alignSelf: "flex-start",
  },

  infodayButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
});

export default CampusDetailsScreen;