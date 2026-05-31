import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import ProductCard from "../components/ProductCard.js";
import AppHeader from "../components/AppHeader.js";
import AppFooter from "../components/AppFooter.js";

import { API_TOKEN, WEBFLOW_COLLECTIONS } from "../config/webflow.js";
import { productCategoryNames } from "../constants/categories.js";
import { checkResponse } from "../utils/apiHelpers.js";

const WebshopScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedProductFilter, setSelectedProductFilter] =
    useState("Alle Producten");
  const [productSearch, setProductSearch] = useState("");
  const [productSort, setProductSort] = useState("Standaard");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    Promise.all([
      fetch(WEBFLOW_COLLECTIONS.products, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }).then(checkResponse),

      fetch(WEBFLOW_COLLECTIONS.skus, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }).then(checkResponse),
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

  const productFilters = [
    "Alle Producten",
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  const productSortOptions = [
    "Standaard",
    "Prijs laag/hoog",
    "Prijs hoog/laag",
    "Naam A/Z",
    "Naam Z/A",
  ];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(productSearch.toLowerCase());

      const matchesCategory =
        selectedProductFilter === "Alle Producten" ||
        product.category === selectedProductFilter;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (productSort === "Prijs laag/hoog") {
        return a.price - b.price;
      }

      if (productSort === "Prijs hoog/laag") {
        return b.price - a.price;
      }

      if (productSort === "Naam A/Z") {
        return a.name.localeCompare(b.name);
      }

      if (productSort === "Naam Z/A") {
        return b.name.localeCompare(a.name);
      }

      return 0;
    });

  return (
    <ScrollView style={styles.page}>
      <AppHeader navigation={navigation} />

      <View style={styles.productPageSection}>
        <Text style={styles.productPageTitle}>School Producten</Text>

        <Text style={styles.productPageSubtitle}>
          Koop je studiemateriaal, boeken en merchandise direct via onze shop.
        </Text>

        <TextInput
          placeholder="Zoek product op naam..."
          placeholderTextColor="#777777"
          value={productSearch}
          onChangeText={setProductSearch}
          style={styles.searchInput}
        />

        <Text style={styles.controlLabel}>Filter op categorie</Text>

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

        <Text style={styles.controlLabel}>Sorteer producten</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {productSortOptions.map((sortOption) => (
            <TouchableOpacity
              key={sortOption}
              style={[
                styles.sortButton,
                productSort === sortOption && styles.sortButtonActive,
              ]}
              onPress={() => setProductSort(sortOption)}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  productSort === sortOption && styles.sortButtonTextActive,
                ]}
              >
                {sortOption}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.resultText}>
          {filteredProducts.length} product(en) gevonden
        </Text>

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

      <AppFooter />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },

  productPageSection: {
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 60,
  },

  productPageTitle: {
    color: "#111111",
    fontSize: 52,
    fontWeight: "700",
    lineHeight: 58,
    marginBottom: 22,
  },

  productPageSubtitle: {
    color: "#555555",
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 34,
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

  filterRow: {
    paddingBottom: 28,
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
});

export default WebshopScreen;