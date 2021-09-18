import React, { useState } from "react";
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
  const [inputs, setInputs] = useState([{ key: "", name: "", price: "" }]);

  const addHandler = () => {
    const _inputs = [...inputs];
    _inputs.push({ key: "", name: "", price: "" });
    setInputs(_inputs);
  };

  const deleteHandler = (key) => {
    const _inputs = inputs.filter((input, index) => index != key);
    setInputs(_inputs);
  };

  const ItemNameChangeHandler = (name, key) => {
    const _inputs = [...inputs];
    _inputs[key].key = key;
    _inputs[key].name = name;
    setInputs(_inputs);
  };

  const ItemPriceChangeHandler = (price, key) => {
    const _inputs = [...inputs];
    _inputs[key].key = key;
    _inputs[key].price = price;
    setInputs(_inputs);
  };

  const SubmitHandler = () => {
    const BillData = firebase.database().ref("BillData");
    BillData.set(inputs);
    navigation.navigate("Edit Members");
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.inputsContainer}>
        {inputs.map((input, key) => (
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
            <TouchableOpacity onPress={() => deleteHandler(key)}>
              <Text style={{ color: "red", fontSize: 13 }}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Button title="Add" onPress={addHandler} />
        <Button
          onPress={() => {
            SubmitHandler();
          }}
          title="Submit Data"
          color="#841584"
        />
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
  inputsContainer: {
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
