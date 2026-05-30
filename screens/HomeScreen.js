import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
  Switch,
  Image,
} from "react-native";

import ProductCard from "../components/ProductCard.js";
import NewsCard from "../components/NewsCard.js";
import CampusCard from "../components/CampusCard.js";

const HomeScreen = ({ navigation }) => {
  const [selectedCampusFilter, setSelectedCampusFilter] =
    useState("Alle Opleidingen");

  const [selectedProductFilter, setSelectedProductFilter] =
    useState("Alle Producten");

  const products = [
    {
      id: 1,
      name: "BA Pennenzak",
      description:
        "Praktische pennenzak met BA-logo. Ruim genoeg voor al je pennen, potloden en schoolspullen.",
      price: 8,
      category: "Schoolaccessoires",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "BA Sportzak",
      description:
        "Handige sportzak voor turnles, sportdagen en buitenschoolse activiteiten.",
      price: 15,
      category: "Tassen",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "BA Drinkfles",
      description:
        "Herbruikbare drinkfles met BA-logo. Ideaal voor schooldagen en uitstappen.",
      price: 10,
      category: "Drinkflessen",
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "BA Hoodie",
      description:
        "Comfortabele hoodie met herkenbare BA-stijl. Perfect voor elke schooldag.",
      price: 35,
      category: "Kleding",
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "BA Lunchbox",
      description:
        "Stevige lunchbox voor boterhammen, snacks en gezonde tussendoortjes.",
      price: 12,
      category: "Lunchmateriaal",
      image:
        "https://images.unsplash.com/photo-1604908554027-4b228b4f8b37?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const productFilters = [
    "Alle Producten",
    "Kleding",
    "Drinkflessen",
    "Lunchmateriaal",
    "Tassen",
    "Schoolaccessoires",
  ];

  const filteredProducts = products
    .filter((product) => {
      if (selectedProductFilter === "Alle Producten") {
        return true;
      }

      return product.category === selectedProductFilter;
    })
    .slice(0, 4);

  const newsItems = [
    {
      id: 1,
      title: "STEM-project op BA Pitzemburg",
      intro:
        "Leerlingen van BA Pitzemburg werkten samen aan een creatief STEM-project waarin techniek, wetenschap en probleemoplossend denken centraal stonden.",
      category: "Projecten",
      author: "Alex Vermeulen",
      date: "2026-04-18",
      image:
        "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Infodag op 4 mei",
      intro:
        "Bezoek onze campussen en ontdek alle studierichtingen tijdens onze infodag.",
      category: "Infodag",
      author: "Alex Vermeulen",
      date: "2026-05-04",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Projectweek rond gezondheid en wetenschap",
      intro:
        "Tijdens een interactieve projectweek onderzochten leerlingen thema’s rond gezondheid, wetenschap en welzijn.",
      category: "Projecten",
      author: "Alex Vermeulen",
      date: "2026-05-27",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Nieuwe collectie in de BA Webshop",
      intro:
        "De BA Webshop kreeg een nieuwe collectie met hoodies, drinkflessen, lunchboxen en andere schoolartikelen.",
      category: "Schoolnieuws",
      author: "Alex Vermeulen",
      date: "2026-03-12",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const latestNews = [...newsItems]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const campuses = [
    {
      id: 1,
      name: "Basisverpleegkundige",
      focus: "Graduaat Basisverpleegkundige",
      category: "Graduaat Basisverpleegkundige",
      description: "Bij BA Botaniek draait alles rond GEZONDHEID & WETENSCHAP.",
      address: "Laarbeeklaan 121\n1090 Jette",
      color: "#E85597",
    },
    {
      id: 2,
      name: "Caputsteen",
      focus: "Integraal & Creatief",
      category: "Integraal & Creatief",
      description:
        "Bij BA Caputsteen draait alles rond integraal en creatief leren.",
      address: "Caputsteenstraat 51\n2800 Mechelen",
      color: "#1F62A9",
    },
    {
      id: 3,
      name: "Botaniek",
      focus: "Gezondheid & Wetenschap",
      category: "Gezondheid & Wetenschap",
      description:
        "Bij BA Botaniek draait alles rond gezondheid en wetenschap.",
      address: "Augustijnenstraat 92\n2800 Mechelen",
      color: "#E85597",
    },
    {
      id: 4,
      name: "De Beemden",
      focus: "Buiten-gewoon Leren",
      category: "Buiten-gewoon Leren",
      description: "Bij BA De Beemden staat buiten-gewoon leren centraal.",
      address: "Stuivenbergbaan 135\n2800 Mechelen",
      color: "#1CAFC8",
    },
    {
      id: 5,
      name: "Nekkerspoel",
      focus: "Werken & Leren",
      category: "Werken & Leren",
      description:
        "Bij BA Nekkerspoel combineer je leren op school met praktijkervaring.",
      address: "Nekkerspoelstraat 74\n2800 Mechelen",
      color: "#C6C334",
    },
    {
      id: 6,
      name: "Pitzemburg",
      focus: "Kennis & Onderzoek",
      category: "Kennis & Onderzoek",
      description:
        "Bij BA Pitzemburg staan kennis, onderzoek en verdieping centraal.",
      address: "Bruul 129\n2800 Mechelen",
      color: "#A6398A",
    },
    {
      id: 7,
      name: "Stassart",
      focus: "Mens & Welzijn",
      category: "Mens & Welzijn",
      description: "Bij BA Stassart draait alles rond mens, zorg en welzijn.",
      address: "Wollemarkt 36\n2800 Mechelen",
      color: "#F5A529",
    },
    {
      id: 8,
      name: "Zandpoort",
      focus: "IT & Ondernemen",
      category: "IT & Ondernemen",
      description:
        "Bij BA Zandpoort staan technologie, ondernemen en innovatie centraal.",
      address: "Zandpoortvest 9A\n2800 Mechelen",
      color: "#E4342D",
    },
    {
      id: 9,
      name: "Pitzemburg Tweedegraad",
      focus: "Kennis & Onderzoek",
      category: "Kennis & Onderzoek",
      description:
        "Een campus met focus op sterke basisvorming en onderzoekend leren.",
      address: "2800 Mechelen",
      color: "#A6398A",
    },
  ];

  const campusFilters = [
    "Alle Opleidingen",
    "Graduaat Basisverpleegkundige",
    "IT & Ondernemen",
    "Mens & Welzijn",
    "Kennis & Onderzoek",
    "Werken & Leren",
    "Buiten-gewoon Leren",
    "Integraal & Creatief",
    "Gezondheid & Wetenschap",
  ];

  const filteredCampuses = campuses.filter((campus) => {
    if (selectedCampusFilter === "Alle Opleidingen") {
      return true;
    }

    return campus.category === selectedCampusFilter;
  });

  return (
    <ScrollView style={styles.page}>
      <View style={styles.header}>
        <Image
          source={require("../assets/ba-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

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

      <View style={styles.footerSection}>
        <Text style={styles.footerTitle}>
          Samen leren. Samen groeien. Samen sterk.
        </Text>

        <View style={styles.footerColumns}>
          <View style={styles.footerColumn}>
            <Text style={styles.footerSmallTitle}>Snelkoppelingen</Text>
            <Text style={styles.footerLink}>Opleidingen</Text>
            <Text style={styles.footerLink}>Campussen</Text>
            <Text style={styles.footerLink}>Nieuws</Text>
            <Text style={styles.footerLink}>Webshop</Text>
            <Text style={styles.footerLink}>Contact</Text>
          </View>

          <View style={styles.footerColumn}>
            <Text style={styles.footerSmallTitle}>Contact</Text>
            <Text style={styles.footerLink}>Adres</Text>
            <Text style={styles.footerLink}>Telefoon</Text>
            <Text style={styles.footerLink}>E-mail</Text>
            <Text style={styles.footerLink}>Openingsuren</Text>
            <Text style={styles.footerLink}>Route</Text>
          </View>
        </View>

        <Text style={styles.newsletterTitle}>
          Blijf op de hoogte van nieuws en events.
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaaaaa"
          style={styles.footerInput}
        />

        <TouchableOpacity style={styles.subscribeButton}>
          <Text style={styles.subscribeButtonText}>Subscribe</Text>
        </TouchableOpacity>

        <Text style={styles.privacyText}>Lees onze privacyverklaring.</Text>

        <View style={styles.footerLogoBox}>
          <Image
            source={require("../assets/ba-logo.png")}
            style={styles.footerLogo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.copyright}>
          Alle rechten voorbehouden © 2025 Busleyden Atheneum
        </Text>

        <View style={styles.legalRow}>
          <Text style={styles.legalLink}>Disclaimer</Text>
          <Text style={styles.legalLink}>Cookies</Text>
          <Text style={styles.legalLink}>Toegankelijkheid</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#000000",
  },

  header: {
    backgroundColor: "#ffffff",
    paddingTop: 55,
    paddingBottom: 18,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    width: 210,
    height: 45,
  },

  menuButton: {
    padding: 8,
  },

  menuIcon: {
    fontSize: 30,
    color: "#111111",
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

  footerSection: {
    backgroundColor: "#000000",
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 50,
  },

  footerTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 30,
    marginBottom: 46,
  },

  footerColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 54,
  },

  footerColumn: {
    width: "48%",
  },

  footerSmallTitle: {
    color: "#aaaaaa",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 18,
  },

  footerLink: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },

  newsletterTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 26,
    marginBottom: 18,
  },

  footerInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 12,
  },

  subscribeButton: {
    backgroundColor: "#86BC25",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 36,
  },

  subscribeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  privacyText: {
    color: "#555555",
    fontSize: 15,
    marginBottom: 36,
  },

  footerLogoBox: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 36,
  },

  footerLogo: {
    width: "100%",
    height: 48,
  },

  copyright: {
    color: "#ffffff",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
  },

  legalRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  legalLink: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: 8,
    marginBottom: 8,
  },
});

export default HomeScreen;