import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import db from "../firebase";
//TODO: Install and implement stripe
const ProfileScreen = ({ navigation }) => {
  const user = useSelector(selectUser);

  const [products, setProducts] = useState([]);
  const [sub, setSub] = useState();

  useEffect(() => {
    const getPlans = async () => {
      let plans = [];

      const plansRef = collection(db, `products`);
      const q = query(plansRef, where("active", "==", true));
      const results = await getDocs(q);

      for (const item of results.docs) {
        const priceRef = collection(item.ref, "prices");
        const priceSnap = await getDocs(priceRef);
        for (const price of priceSnap.docs) {
          plans.push({ ...item.data(), priceId: price.id });
        }
      }
      setProducts(plans);
    };

    // getPlans();
  }, []);

  const getSubscription = async () => {
    const subRef = collection(db, `customers/${user.uid}/subscriptions`);
    const subs = await getDocs(subRef);
    for (const item of subs.docs) {
      const subId = item.id;
      const priceId = item.data().items[0].price.id;
      setSub({ priceId, subId, ...item.data() });
    }
  };

  useEffect(() => {
    getSubscription();
  }, []);

  useEffect(() => {
    console.log(sub);
  }, [sub]);

  return (
    <View style={styles.profile}>
      <Nav opacity={1} navigation={navigation} />
      <StatusBar style="light" backgroundColor="#000" />
      <View style={styles.content}>
        <Text
          style={{
            color: "white",
            fontSize: 42,
            borderBottomWidth: 1,
            borderColor: "gray",
          }}
        >
          Edit Profile
        </Text>
        <View style={{ backgroundColor: "gray", marginTop: 10, padding: 10 }}>
          <Text style={{ color: "white" }}>{user.email}</Text>
        </View>

        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Text
            style={{
              color: "white",
              borderColor: "gray",
              borderBottomWidth: 1,
              fontSize: 20,
            }}
          >
            Plans
          </Text>

          {/* {sub && <} */}
          {/* {products.map((product) => (
            <View key={product.id} style={styles.product}>
              <View>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>
                  {product.description}
                </Text>
              </View>
              <View>
                <Pressable
                  style={styles.productButton}
                  onPress={() => Linking.openURL("https://google.com/")}
                >
                  <Text style={{ color: "white" }}>Subscribe</Text>
                </Pressable>
              </View>
            </View>
          ))} */}

          <Pressable
            onPress={() =>
              Linking.openURL("https://netflix-clone-9024c.web.app/profile")
            }
            style={{ padding: 10, backgroundColor: "#004cff" }}
          >
            <Text style={{ color: "white" }}>
              Click here to manage your subscription online
            </Text>
          </Pressable>
        </View>

        <Pressable>
          <Text
            style={{
              backgroundColor: "red",
              textAlign: "center",
              fontSize: 24,
              color: "white",
              padding: 5,
              marginTop: 10,
            }}
          >
            Sign Out
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    backgroundColor: "black",
    marginTop: 20,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
  },
  content: {
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
    top: "10%",
  },

  product: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  productName: {
    color: "white",
    fontSize: 20,
  },

  productDescription: {
    color: "white",
  },

  productButton: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 2.5,
  },
});

export default ProfileScreen;
