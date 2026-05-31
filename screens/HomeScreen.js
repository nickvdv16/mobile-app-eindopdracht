import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import ProductCard from "../components/ProductCard.js";
import NewsCard from "../components/NewsCard.js";
import CampusCard from "../components/CampusCard.js";
import AppHeader from "../components/AppHeader.js";
import AppFooter from "../components/AppFooter.js";

const HomeScreen = ({ navigation }) => {
  const API_TOKEN =
    "90676b2c8c33d03684a2724fe323fcca0de28c427e0faec060139a9135a0b248";

  const [selectedCampusFilter, setSelectedCampusFilter] =
    useState("Alle Opleidingen");

  const [selectedProductFilter, setSelectedProductFilter] =
    useState("Alle Producten");

  const [products, setProducts] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [campuses, setCampuses] = useState([]);

  const productCategoryNames = {
    "6a16edbec4c836a09c000068": "Schoolaccessoires",
    "6a16edb1719f7ecaa2496566": "Tassen",
    "6a16eda9aa667d8d7d51c9b5": "Lunchmateriaal",
    "6a16ed9da36a49603175d088": "Drinkflessen",
    "6a16ed8a070156fbb24b51de": "Kleding",
  };

  const campusFocusNames = {
    "ee69cca064fa0c2dc2900f9ec85cc3ae": "Graduaat Basisverpleegkundige",
    "1a7bbd0612936a87992c350ebb147fcc": "IT & Ondernemen",
    "6792f93197f3ccf638e77f2d463ec33d": "Mens & Welzijn",
    "b41305218572d14ad1c19aac688591c4": "Kennis & Onderzoek",
    "763c43b453d521fdf9ca42a6f7cf2ea6": "Werken & Leren",
    "088918bc60d43fe5ce5ffbcc957966a0": "Buiten-gewoon Leren",
    "aa6dab0235f759127c984a87d9102165": "Integraal & Creatief",
    "36154b2fdc3020da164ab18f4f6c6a01": "Gezondheid & Wetenschap",
  };

  const newsCategoryNames = {
    "d15a0c045a3d650be7cec9d507ffce40": "Projecten",
    "439ec26311937b626995ecfb6a150add": "Campussen",
    "c733002c2a1e6431cf253c10f6b4518e": "Webshop",
    "069209e397439ed0a86481983fed5137": "Activiteiten",
    "4dd5d208d91304d8daed798e8e5db98d": "Infodag",
  };

  useEffect(() => {
    fetchProducts();
    fetchNews();
    fetchCampuses();
  }, []);

  const checkResponse = async (response) => {
    const data = await response.json();

    if (!response.ok) {
      console.log("WEBFLOW API ERROR:", data);
      throw new Error(`API error: ${response.status}`);
    }

    return data;
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);

    return date.toLocaleDateString("nl-BE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const fetchProducts = () => {
    Promise.all([
      fetch(
        "https://api.webflow.com/v2/collections/6a16ed421817ffd033eddcdd/items",
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      ).then(checkResponse),

      fetch(
        "https://api.webflow.com/v2/collections/6a16ed421817ffd033eddcdc/items",
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      ).then(checkResponse),
    ])
      .then(([productsData, skusData]) => {
        const productItems = productsData.items || [];
        const skuItems = skusData.items || [];

        const formattedProducts = productItems.map((product) => {
          const sku = skuItems.find(
            (skuItem) => skuItem.id === product.fieldData["default-sku"]
          );

          const categoryId = product.fieldData.category?.[0];
          const categoryName =
            productCategoryNames[categoryId] || "Geen categorie";

          return {
            id: product.id,
            name: product.fieldData.name,
            description: product.fieldData.description,
            category: categoryName,
            price: sku?.fieldData.price?.value
              ? sku.fieldData.price.value / 100
              : 0,
            image: sku?.fieldData["main-image"]?.url,
            slug: product.fieldData.slug,
          };
        });

        setProducts(formattedProducts);
      })
      .catch((error) => {
        console.error("Fout bij ophalen producten:", error.message);
      });
  };

  const fetchNews = () => {
    fetch(
      "https://api.webflow.com/v2/collections/6a173b0e9f26e0be248049ba/items",
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    )
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

  const fetchCampuses = () => {
    fetch(
      "https://api.webflow.com/v2/collections/6a174087ad7992cf1fc9992a/items",
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    )
      .then(checkResponse)
      .then((data) => {
        const campusItemsFromApi = data.items || [];

        const formattedCampuses = campusItemsFromApi.map((item) => {
          const focusId = item.fieldData["focus-2"];
          const focusName = campusFocusNames[focusId] || "Geen opleiding";

          return {
            id: item.id,
            name: item.fieldData.campus,
            focus: focusName,
            category: focusName,
            description: item.fieldData.intro,
            address: `${item.fieldData.adres}\n${item.fieldData.postcode}`,
            color: item.fieldData["campus-color"],
            image: item.fieldData.image?.url,
            email: item.fieldData.email,
            phone: item.fieldData.phone,
            map: item.fieldData.map?.url,
            content: item.fieldData["beschrijving-campus"],
            slug: item.fieldData.slug,
          };
        });

        setCampuses(formattedCampuses);
      })
      .catch((error) => {
        console.error("Fout bij ophalen campussen:", error.message);
      });
  };

  const productFilters = [
    "Alle Producten",
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  const filteredProducts = products
    .filter((product) => {
      if (selectedProductFilter === "Alle Producten") {
        return true;
      }

      return product.category === selectedProductFilter;
    })
    .slice(0, 4);

  const latestNews = [...newsItems]
    .sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate))
    .slice(0, 3);

  const campusFilters = [
    "Alle Opleidingen",
    ...new Set(campuses.map((campus) => campus.category).filter(Boolean)),
  ];

  const filteredCampuses = campuses.filter((campus) => {
    if (selectedCampusFilter === "Alle Opleidingen") {
      return true;
    }

    return campus.category === selectedCampusFilter;
  });

  return (
    <ScrollView style={styles.page}>
      <AppHeader navigation={navigation} />

      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Jouw toekomst begint hier</Text>

        <Text style={styles.heroText}>
          Ontdek meer dan 100 studierichtingen op onze 8 unieke campussen. Vind
          de opleiding die perfect bij jou past en bereid je voor op een
          succesvolle carrière.
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Bekijk opleidingen</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Schrijf je hier in</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Campussen</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100+</Text>
            <Text style={styles.statLabel}>Opleidingen</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>10k+</Text>
            <Text style={styles.statLabel}>Studenten</Text>
          </View>
        </View>

        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop",
          }}
          style={styles.heroImage}
        />
      </View>

      <View style={styles.talentSection}>
        <Text style={styles.talentTitle}>Jouw talent, onze passie</Text>

        <Text style={styles.talentSubtitle}>
          Kies uit moderne opleidingen en campussen
        </Text>

        <View style={styles.infoBlock}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
            }}
            style={styles.infoImage}
          />

          <Text style={styles.infoTitle}>Meer dan 100 studierichtingen</Text>

          <Text style={styles.infoText}>
            Ontdek flexibele studiekeuzes voor elk talent. Vind jouw perfecte
            richting in ons brede aanbod.
          </Text>

          <TouchableOpacity style={styles.greenButton}>
            <Text style={styles.greenButtonText}>Bekijk opties</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBlock}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
            }}
            style={styles.infoImage}
          />

          <Text style={styles.infoTitle}>Campussen in Mechelen</Text>

          <Text style={styles.infoText}>
            Leer op inspirerende locaties met moderne faciliteiten en een warme
            sfeer.
          </Text>

          <TouchableOpacity style={styles.greenButton}>
            <Text style={styles.greenButtonText}>Bekijk locaties</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBlock}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop",
            }}
            style={styles.infoImage}
          />

          <Text style={styles.infoTitle}>Begeleiding op maat</Text>

          <Text style={styles.infoText}>
            Persoonlijke ondersteuning door ervaren leerkrachten. Groei in je
            eigen tempo.
          </Text>

          <TouchableOpacity style={styles.greenButton}>
            <Text style={styles.greenButtonText}>Lees verder</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.campusSection}>
        <Text style={styles.campusTitle}>Onze Campussen</Text>

        <Text style={styles.campusSubtitle}>
          Ontdek onze diverse campussen en vind de opleiding die bij jou past.
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {campusFilters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedCampusFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedCampusFilter(filter)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedCampusFilter === filter &&
                    styles.filterButtonTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filteredCampuses.map((campus) => (
          <CampusCard
            key={campus.id}
            name={campus.name}
            focus={campus.focus}
            description={campus.description}
            address={campus.address}
            color={campus.color}
            onPress={() => navigation.navigate("CampusDetails", campus)}
          />
        ))}
      </View>

      <View style={styles.gallerySection}>
        <Text style={styles.galleryTitle}>Schoolleven in één oogopslag</Text>

        <Text style={styles.gallerySubtitle}>
          Bekijk sfeerbeelden van onze campussen
        </Text>

        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
          }}
          style={styles.galleryImage}
        />

        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop",
          }}
          style={styles.galleryImage}
        />

        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop",
          }}
          style={styles.galleryImage}
        />

        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop",
          }}
          style={styles.galleryImage}
        />
      </View>

      <View style={styles.productSection}>
        <Text style={styles.productTitle}>School Producten</Text>

        <Text style={styles.productSubtitle}>
          Koop je studiemateriaal, boeken en merchandise direct via onze shop.
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {productFilters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedProductFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedProductFilter(filter)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedProductFilter === filter &&
                    styles.filterButtonTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            category={product.category}
            image={product.image}
            onPress={() => navigation.navigate("ProductDetails", product)}
          />
        ))}

        <TouchableOpacity
          style={styles.viewAllProductsButton}
          onPress={() => navigation.navigate("Webshop")}
        >
          <Text style={styles.viewAllProductsButtonText}>
            Bekijk alle producten
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.newsSection}>
        <Text style={styles.newsLabel}>LAATSTE UPDATES</Text>

        <Text style={styles.newsTitle}>Altijd actueel, altijd dichtbij</Text>

        <Text style={styles.newsSubtitle}>
          Lees het meest recente nieuws, activiteiten en projecten van onze
          school.
        </Text>

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

      <View style={styles.contactSection}>
        <Text style={styles.contactLabel}>CONTACT</Text>

        <Text style={styles.contactTitle}>Vragen? Neem contact op</Text>

        <Text style={styles.contactSubtitle}>
          Heb je een vraag? Vul het formulier in en wij helpen je snel verder.
        </Text>

        <View style={styles.contactItem}>
          <View style={styles.contactIconBox}>
            <Text style={styles.contactIcon}>✉</Text>
          </View>

          <Text style={styles.contactItemTitle}>E-mail</Text>

          <Text style={styles.contactItemText}>
            We reageren binnen één werkdag.
          </Text>

          <Text style={styles.contactLink}>info@busleydenatheneum.be</Text>
        </View>

        <View style={styles.contactItem}>
          <View style={styles.contactIconBox}>
            <Text style={styles.contactIcon}>☎</Text>
          </View>

          <Text style={styles.contactItemTitle}>Telefoon</Text>

          <Text style={styles.contactItemText}>Ma - Vr: 8u tot 16u30</Text>

          <Text style={styles.contactLink}>015 28 07 60</Text>
        </View>
      </View>

      <AppFooter />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#000000",
  },

  heroSection: {
    backgroundColor: "#000000",
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 34,
  },

  heroTitle: {
    color: "#ffffff",
    fontSize: 54,
    fontWeight: "700",
    lineHeight: 64,
    marginBottom: 28,
  },

  heroText: {
    color: "#d4d4d4",
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 36,
  },

  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 48,
  },

  primaryButton: {
    backgroundColor: "#86BC25",
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 9,
    marginRight: 14,
  },

  primaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 9,
  },

  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },

  statsRow: {
    borderTopWidth: 1,
    borderTopColor: "#333333",
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },

  statItem: {
    width: "31%",
  },

  statNumber: {
    color: "#86BC25",
    fontSize: 38,
    fontWeight: "800",
    marginBottom: 6,
  },

  statLabel: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },

  heroImage: {
    width: "100%",
    height: 260,
    borderRadius: 16,
    resizeMode: "cover",
  },

  talentSection: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 50,
  },

  talentTitle: {
    color: "#111111",
    fontSize: 44,
    fontWeight: "700",
    lineHeight: 52,
    textAlign: "center",
    marginBottom: 18,
  },

  talentSubtitle: {
    color: "#555555",
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 42,
  },

  infoBlock: {
    marginBottom: 42,
  },

  infoImage: {
    width: "100%",
    height: 250,
    borderRadius: 16,
    resizeMode: "cover",
    marginBottom: 28,
  },

  infoTitle: {
    color: "#111111",
    fontSize: 21,
    fontWeight: "700",
    marginBottom: 12,
  },

  infoText: {
    color: "#222222",
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 24,
  },

  greenButton: {
    backgroundColor: "#86BC25",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 9,
    alignItems: "center",
  },

  greenButtonText: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "700",
  },

  campusSection: {
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 50,
  },

  campusTitle: {
    color: "#111111",
    fontSize: 52,
    fontWeight: "700",
    lineHeight: 58,
    marginBottom: 22,
  },

  campusSubtitle: {
    color: "#555555",
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 34,
  },

  filterRow: {
    paddingBottom: 30,
  },

  filterButton: {
    backgroundColor: "#000000",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginRight: 10,
  },

  filterButtonActive: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#111111",
  },

  filterButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },

  filterButtonTextActive: {
    color: "#111111",
  },

  gallerySection: {
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 50,
  },

  galleryTitle: {
    color: "#111111",
    fontSize: 46,
    fontWeight: "700",
    lineHeight: 54,
    textAlign: "center",
    marginBottom: 20,
  },

  gallerySubtitle: {
    color: "#555555",
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 42,
  },

  galleryImage: {
    width: "100%",
    height: 320,
    borderRadius: 16,
    resizeMode: "cover",
    marginBottom: 28,
  },

  productSection: {
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 50,
  },

  productTitle: {
    color: "#111111",
    fontSize: 52,
    fontWeight: "700",
    lineHeight: 58,
    marginBottom: 22,
  },

  productSubtitle: {
    color: "#555555",
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 34,
  },

  viewAllProductsButton: {
    backgroundColor: "#86BC25",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 9,
    alignItems: "center",
    marginTop: 10,
  },

  viewAllProductsButtonText: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "700",
  },

  newsSection: {
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 50,
  },

  newsLabel: {
    color: "#666666",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 18,
  },

  newsTitle: {
    color: "#111111",
    fontSize: 44,
    fontWeight: "700",
    lineHeight: 52,
    textAlign: "center",
    marginBottom: 20,
  },

  newsSubtitle: {
    color: "#555555",
    fontSize: 17,
    lineHeight: 25,
    textAlign: "center",
    marginBottom: 42,
  },

  contactSection: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 70,
    alignItems: "center",
  },

  contactLabel: {
    color: "#666666",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 22,
  },

  contactTitle: {
    color: "#111111",
    fontSize: 44,
    fontWeight: "700",
    lineHeight: 52,
    textAlign: "center",
    marginBottom: 26,
  },

  contactSubtitle: {
    color: "#555555",
    fontSize: 17,
    lineHeight: 25,
    textAlign: "center",
    marginBottom: 48,
  },

  contactItem: {
    width: "100%",
    alignItems: "center",
    marginBottom: 42,
  },

  contactIconBox: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  contactIcon: {
    fontSize: 30,
    color: "#111111",
  },

  contactItemTitle: {
    fontSize: 22,
    color: "#111111",
    fontWeight: "700",
    marginBottom: 10,
  },

  contactItemText: {
    fontSize: 16,
    color: "#555555",
    textAlign: "center",
    marginBottom: 12,
  },

  contactLink: {
    fontSize: 16,
    color: "#111111",
    textDecorationLine: "underline",
  },
});

export default HomeScreen;