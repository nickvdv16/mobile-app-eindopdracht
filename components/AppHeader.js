import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const AppHeader = ({ navigation }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <View style={styles.header}>
        <Image
          source={require("../assets/ba-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuOpen(!menuOpen)}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {menuOpen && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              setMenuOpen(false);
              navigation.navigate("Home");
            }}
          >
            <Text style={styles.dropdownText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              setMenuOpen(false);
              navigation.navigate("Webshop");
            }}
          >
            <Text style={styles.dropdownText}>Webshop</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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

  dropdownMenu: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  dropdownItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  dropdownText: {
    color: "#111111",
    fontSize: 17,
    fontWeight: "700",
  },
});

export default AppHeader;