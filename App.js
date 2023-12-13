// App.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import store from "./src/redux/store";
import ProductList from "./src/ProductList";
import Cart from "./src/Cart";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const products = [
    {
        id: 1,
        name: "Chair",
        price: 10,
        imageSource: require("./assets/product1.jpg"),
    },
    {
        id: 2,
        name: "Vase",
        price: 15,
        imageSource: require("./assets/product2.jpg"),
    },
    // Add more products here if needed
];

const App = () => {
    // const cartItems = useSelector((state) => state.cart);

    const CartIcon = () => (
        <View style={styles.cartIconContainer}>
            <MaterialIcons name="shopping-cart" size={24} color="white" />
            {/* <Text style={styles.cartItemCount}>{cartItems.length}</Text> */}
        </View>
    );

    const CartButton = ({ navigation }) => (
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <CartIcon />
        </TouchableOpacity>
    );
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={({ navigation }) => ({
                        headerRight: () => (
                            <CartButton navigation={navigation} />
                        ),
                        headerTitleAlign: "center",
                        headerStyle: {
                            backgroundColor: "#4CAF50",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    })}>
                    <Stack.Screen
                        name="ProductList"
                        component={ProductList}
                        initialParams={{ products }} // Pass the products data as initialParams
                        options={{ title: "Product List" }}
                    />
                    <Stack.Screen
                        name="Cart"
                        component={Cart}
                        options={{ title: "Cart" }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

const styles = StyleSheet.create({
    cartIconContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
    },
    cartItemCount: {
        backgroundColor: "red",
        color: "white",
        borderRadius: 10,
        paddingHorizontal: 6,
        marginLeft: 6,
    },
});

export default App;
