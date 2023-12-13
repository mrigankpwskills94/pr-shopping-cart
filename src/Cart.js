// src/Cart.js
import React from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "./redux/actions";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleUpdateQuantity = (productId, quantity) => {
        dispatch(updateCartItemQuantity(productId, quantity));
    };

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Text style={styles.cartItemName}>{item.name}</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity
                    style={styles.quantityBtnContainer}
                    onPress={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                    }>
                    <Text style={styles.quantityBtn}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                    style={styles.quantityBtnContainer}
                    onPress={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                    }>
                    <Text style={styles.quantityBtn}>+</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.removeBtnContainer}
                onPress={() => handleRemoveFromCart(item.id)}>
                <Text style={styles.removeBtn}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={() => <Text>Your cart is empty.</Text>}
            />
        </View>
    );
};

// src/Cart.js

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    cartItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        padding: 15,
        backgroundColor: "#fff", // Initial background color
    },
    cartItemName: { fontWeight: "bold" },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantityText: {
        marginHorizontal: 10,
    },
    quantityBtnContainer: {
        backgroundColor: "blue",
        borderRadius: 5,
    },
    quantityBtn: {
        color: "white",
        fontWeight: "bold",
        padding: 5,
    },
    removeBtnContainer: {
        backgroundColor: "red",
        borderRadius: 7,
    },
    removeBtn: {
        color: "white",
        fontWeight: "bold",
        padding: 5,
    },
});

export default Cart;
