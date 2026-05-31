import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

const AppFooter = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
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

export default AppFooter;