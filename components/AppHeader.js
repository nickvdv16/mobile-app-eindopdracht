import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";

const AppHeader = ({ navigation, logoSource }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <View
        style={[
          styles.header,
          darkMode ? styles.headerDark : styles.headerLight,
        ]}
      >
        <Image
          source={logoSource || require("../assets/ba-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuOpen(!menuOpen)}
        >
          <Text
            style={[
              styles.menuIcon,
              darkMode ? styles.menuIconDark : styles.menuIconLight,
            ]}
          >
            ☰
          </Text>
        </TouchableOpacity>
      </View>

      {menuOpen && (
        <View
          style={[
            styles.dropdownMenu,
            darkMode ? styles.dropdownMenuDark : styles.dropdownMenuLight,
          ]}
        >
          <TouchableOpacity
            style={[
              styles.dropdownItem,
              darkMode ? styles.dropdownItemDark : styles.dropdownItemLight,
            ]}
            onPress={() => {
              setMenuOpen(false);
              navigation.navigate("Home");
            }}
          >
            <Text
              style={[
                styles.dropdownText,
                darkMode ? styles.dropdownTextDark : styles.dropdownTextLight,
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.dropdownItem,
              darkMode ? styles.dropdownItemDark : styles.dropdownItemLight,
            ]}
            onPress={() => {
              setMenuOpen(false);
              navigation.navigate("Webshop");
            }}
          >
            <Text
              style={[
                styles.dropdownText,
                darkMode ? styles.dropdownTextDark : styles.dropdownTextLight,
              ]}
            >
              Webshop
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.dropdownItem,
              darkMode ? styles.dropdownItemDark : styles.dropdownItemLight,
            ]}
            onPress={() => {
              setMenuOpen(false);
              navigation.navigate("Game");
            }}
          >
            <Text
              style={[
                styles.dropdownText,
                darkMode ? styles.dropdownTextDark : styles.dropdownTextLight,
              ]}
            >
              Mini-game
            </Text>
          </TouchableOpacity>

          <View
            style={[
              styles.switchItem,
              darkMode ? styles.dropdownItemDark : styles.dropdownItemLight,
            ]}
          >
            <View>
              <Text
                style={[
                  styles.dropdownText,
                  darkMode
                    ? styles.dropdownTextDark
                    : styles.dropdownTextLight,
                ]}
              >
                Dark mode
              </Text>

              <Text
                style={[
                  styles.switchSubText,
                  darkMode
                    ? styles.switchSubTextDark
                    : styles.switchSubTextLight,
                ]}
              >
                Wissel tussen licht en donker
              </Text>
            </View>

            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#cccccc", true: "#86BC25" }}
              thumbColor={darkMode ? "#ffffff" : "#ffffff"}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 55,
    paddingBottom: 18,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerLight: {
    backgroundColor: "#ffffff",
  },

  headerDark: {
    backgroundColor: "#111111",
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
  },

  menuIconLight: {
    color: "#111111",
  },

  menuIconDark: {
    color: "#ffffff",
  },

  dropdownMenu: {
    paddingHorizontal: 24,
    paddingBottom: 18,
    borderBottomWidth: 1,
  },

  dropdownMenuLight: {
    backgroundColor: "#ffffff",
    borderBottomColor: "#eeeeee",
  },

  dropdownMenuDark: {
    backgroundColor: "#111111",
    borderBottomColor: "#333333",
  },

  dropdownItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
  },

  dropdownItemLight: {
    borderBottomColor: "#eeeeee",
  },

  dropdownItemDark: {
    borderBottomColor: "#333333",
  },

  dropdownText: {
    fontSize: 17,
    fontWeight: "700",
  },

  dropdownTextLight: {
    color: "#111111",
  },

  dropdownTextDark: {
    color: "#ffffff",
  },

  switchItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  switchSubText: {
    fontSize: 13,
    marginTop: 4,
  },

  switchSubTextLight: {
    color: "#777777",
  },

  switchSubTextDark: {
    color: "#bbbbbb",
  },
});

export default AppHeader;