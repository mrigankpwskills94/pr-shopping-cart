// src/ProductList.js
import React from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/actions";
import { Animated, Easing } from "react-native";

const ProductList = ({ route, navigation }) => {
    const { products } = route.params; // Retrieve the products from route.params

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                {item.imageSource && (
                    <Image source={item.imageSource} style={styles.cardImage} />
                )}
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>${item.price}</Text>
                <TouchableOpacity
                    style={styles.addToCartBtnContainer}
                    onPress={() => handleAddToCart(item)}>
                    <Text style={styles.addToCartBtn}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

// src/ProductList.js

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    addToCartBtnContainer: {
        backgroundColor: "blue",
        padding: 8,
        borderRadius: 7,
        marginTop: 10,
    },
    addToCartBtn: {
        color: "white",
        fontWeight: "bold",
    },
    card: {
        borderRadius: 20,
        padding: 20,
        margin: 10,
        backgroundColor: "#2c3e50",
        shadowColor: "#34495e",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    cardImage: {
        width: "100%",
        height: 200,
        borderRadius: 15,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ecf0f1",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: "#bdc3c7",
    },
});

export default ProductList;
