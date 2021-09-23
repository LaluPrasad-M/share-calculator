import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import firebase from "firebase";

export default function AddBillItemsScreen({ navigation }) {
  const [billItems, setBillItems] = useState([
    { key: "", name: "", price: "" },
  ]);
  const [members, setMembers] = useState([{ key: "", name: "" }]);

  const commonBillDataFB = firebase.database().ref("commonBillData");
  const commonOrderMembersFB = firebase.database().ref("commonOrderMembers");

  const addBillItemHandler = () => {
    const _billItems = [...billItems];
    _billItems.push({ key: "", name: "", price: "" });
    setBillItems(_billItems);
  };

  const deleteBillItemHandler = (key) => {
    const _billItems = billItems.filter((input, index) => index != key);
    setBillItems(_billItems);
  };

  const ItemNameChangeHandler = (name, key) => {
    const _billItems = [...billItems];
    _billItems[key].key = key;
    _billItems[key].name = name;
    setBillItems(_billItems);
  };

  const ItemPriceChangeHandler = (price, key) => {
    const _billItems = [...billItems];
    _billItems[key].key = key;
    _billItems[key].price = price;
    setBillItems(_billItems);
  };

  const addMemberHandler = () => {
    const _members = [...members];
    _members.push({ key: "", name: "" });
    setMembers(_members);
  };

  const deleteMemberHandler = (key) => {
    const _members = members.filter((input, index) => index != key);
    setMembers(_members);
  };
  const memberNameChangeHandler = (name, key) => {
    const _members = [...members];
    _members[key].key = key;
    _members[key].name = name;
    setMembers(_members);
  };

  const SubmitHandler = () => {
    commonBillDataFB.set(billItems);
    navigation.navigate("Common Order");
  };

  React.useEffect(() => {
    commonBillDataFB.on("value", (dataSnap) => {
      var dataSnapVal = dataSnap.val();
      if (dataSnapVal) {
        setBillItems(Object.values(dataSnapVal));
      }
    });
    commonOrderMembersFB.on("value", (dataSnap) => {
      var dataSnapVal = dataSnap.val();
      if (dataSnapVal) {
        setMembers(Object.values(dataSnapVal));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.billItemsContainer}>
        {/* <View>
          {billItems.map((input, key) => (
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                onChangeText={(name) => {
                  ItemNameChangeHandler(name, key);
                }}
                placeholder="Item Name"
                value={input.name}
              />
              <TextInput
                style={styles.input}
                onChangeText={(price) => {
                  ItemPriceChangeHandler(price, key);
                }}
                placeholder="Price"
                value={input.price}
              />
              <TouchableOpacity onPress={() => deleteBillItemHandler(key)}>
                <Text style={{ color: "red", fontSize: 13 }}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
          <Button title="Add" onPress={addBillItemHandler} />
        </View>
        <View style={styles.container}>
          <ScrollView style={styles.inputsContainer}>
            {members.map((input, key) => (
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  onChangeText={(name) => {
                    memberNameChangeHandler(name, key);
                  }}
                  placeholder="Item Name"
                  value={input.name}
                />
                <TouchableOpacity onPress={() => deleteMemberHandler(key)}>
                  <Text style={{ color: "red", fontSize: 13 }}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
            <Button title="Add" onPress={addMemberHandler} />
            <Button
              onPress={() => {
                SubmitHandler();
              }}
              title="Submit Data"
              color="#841584"
            />
          </ScrollView>
        </View> */}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRow: {
    flexDirection: "row",
    alignContent: "space-around",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 5,
  },
  billItemsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
});
