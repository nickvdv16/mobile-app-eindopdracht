import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";

import ProductCard from "../components/ProductCard.js";
import AppHeader from "../components/AppHeader.js";
import AppFooter from "../components/AppFooter.js";

import { API_TOKEN, WEBFLOW_COLLECTIONS } from "../config/webflow.js";
import { productCategoryNames } from "../constants/categories.js";
import { checkResponse } from "../utils/apiHelpers.js";

const ProductDetailsScreen = ({ route, navigation }) => {
  const product = route.params;

  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);

  useEffect(() => {
    setQuantity(1);
    fetchRelatedProducts();
  }, [product.id]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const totalPrice = product.price * quantity;

  const addToCart = () => {
    setCartAmount((previousAmount) => previousAmount + quantity);

    console.log("Product toegevoegd aan winkelmandje:", {
      product: product.name,
      quantity: quantity,
      totalPrice: totalPrice,
    });

    setQuantity(1);
  };

  const clearCart = () => {
    setCartAmount(0);
    console.log("Winkelmandje volledig leeggemaakt");
  };

  const fetchRelatedProducts = () => {
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

        const formattedProducts = productItems.map((item) => {
          const sku = skuItems.find(
            (skuItem) => skuItem.id === item.fieldData["default-sku"]
          );

          const categoryId = item.fieldData.category?.[0];
          const categoryName =
            productCategoryNames[categoryId] || "Geen categorie";

          return {
            id: item.id,
            name: item.fieldData.name,
            description: item.fieldData.description,
            category: categoryName,
            price: sku?.fieldData.price?.value
              ? sku.fieldData.price.value / 100
              : 0,
            image: sku?.fieldData["main-image"]?.url,
            slug: item.fieldData.slug,
          };
        });

        const sameCategoryProducts = formattedProducts
          .filter((item) => item.id !== product.id)
          .filter((item) => item.category === product.category)
          .slice(0, 3);

        const fallbackProducts = formattedProducts
          .filter((item) => item.id !== product.id)
          .slice(0, 3);

        if (sameCategoryProducts.length > 0) {
          setRelatedProducts(sameCategoryProducts);
        } else {
          setRelatedProducts(fallbackProducts);
        }
      })
      .catch((error) => {
        console.error("Fout bij ophalen aanbevolen producten:", error.message);
      });
  };

  return (
    <ScrollView style={styles.page}>
      <AppHeader navigation={navigation} />

      <View style={styles.topActionRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Terug</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cartButton} onPress={clearCart}>
          <Text style={styles.cartText}>Cart ({cartAmount})</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productSection}>
        {product.image && (
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
        )}

        <Text style={styles.breadcrumb}>Home / Webshop / {product.name}</Text>

        <Text style={styles.productTitle}>{product.name}</Text>

        <Text style={styles.productPrice}>
          $ {product.price.toFixed(2)} USD
        </Text>

        <Text style={styles.productDescription}>{product.description}</Text>

        <View style={styles.divider} />

        <Text style={styles.quantityLabel}>Aantal</Text>

        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={[
              styles.quantityButton,
              quantity === 1 && styles.quantityButtonDisabled,
            ]}
            onPress={decreaseQuantity}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <View style={styles.quantityBox}>
            <Text style={styles.quantityText}>{quantity}</Text>
          </View>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={increaseQuantity}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Totale prijs</Text>
          <Text style={styles.totalPrice}>
            $ {totalPrice.toFixed(2)} USD
          </Text>
        </View>

        <View style={styles.addButton}>
          <Button title="Add to Cart" color="#86BC25" onPress={addToCart} />
        </View>
      </View>

      <View style={styles.relatedSection}>
        <Text style={styles.relatedTitle}>Ook interessant</Text>

        {relatedProducts.map((relatedProduct) => (
          <ProductCard
            key={relatedProduct.id}
            name={relatedProduct.name}
            description={relatedProduct.description}
            price={relatedProduct.price}
            category={relatedProduct.category}
            image={relatedProduct.image}
            onPress={() => navigation.push("ProductDetails", relatedProduct)}
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
    backgroundColor: "#ffffff",
  },

  topActionRow: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    paddingVertical: 13,
    paddingHorizontal: 0,
  },

  backButtonText: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "700",
  },

  cartButton: {
    backgroundColor: "#2f8de4",
    paddingVertical: 13,
    paddingHorizontal: 18,
    alignItems: "center",
  },

  cartText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  productSection: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingBottom: 90,
  },

  productImage: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 52,
  },

  breadcrumb: {
    color: "#5f6673",
    fontSize: 14,
    marginBottom: 22,
  },

  productTitle: {
    color: "#1b1f2a",
    fontSize: 42,
    fontWeight: "400",
    lineHeight: 50,
    marginBottom: 10,
  },

  productPrice: {
    color: "#76af22",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
  },

  productDescription: {
    color: "#4f5865",
    fontSize: 18,
    lineHeight: 30,
    marginBottom: 34,
  },

  divider: {
    height: 1,
    backgroundColor: "#dddddd",
    marginBottom: 34,
  },

  quantityLabel: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  quantityButton: {
    width: 44,
    height: 44,
    backgroundColor: "#86BC25",
    alignItems: "center",
    justifyContent: "center",
  },

  quantityButtonDisabled: {
    backgroundColor: "#cccccc",
  },

  quantityButtonText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
  },

  quantityBox: {
    width: 60,
    height: 44,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#dddddd",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },

  quantityText: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "700",
  },

  totalBox: {
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
  },

  totalLabel: {
    color: "#555555",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
  },

  totalPrice: {
    color: "#76af22",
    fontSize: 26,
    fontWeight: "800",
  },

  addButton: {
    alignSelf: "flex-start",
    borderRadius: 6,
    overflow: "hidden",
  },

  relatedSection: {
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 70,
  },

  relatedTitle: {
    color: "#1b1f2a",
    fontSize: 36,
    fontWeight: "400",
    marginBottom: 34,
  },
});

export default ProductDetailsScreen;