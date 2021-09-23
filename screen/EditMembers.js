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
  const [inputs, setInputs] = useState([{ key: "", name: "" }]);
  const membersFB = firebase.database().ref("members");
  const commonOrderMembersFB = firebase.database().ref("commonOrderMembers");

  const addHandler = () => {
    const _inputs = [...inputs];
    _inputs.push({ key: "", name: "" });
    setInputs(_inputs);
  };

  const deleteHandler = (key) => {
    const _inputs = inputs.filter((input, index) => index != key);
    setInputs(_inputs);
  };

  const PersonNameChangeHandler = (name, key) => {
    const _inputs = [...inputs];
    _inputs[key].key = key;
    _inputs[key].name = name;
    setInputs(_inputs);
  };

  const SubmitHandler = () => {
    let _inputs = [...inputs];
    _inputs = _inputs.filter((word) => word.name.length > 2);
    membersFB.set(_inputs);

    var commonMembers = [];
    commonOrderMembersFB.on("value", (dataSnap) => {
      commonMembers = dataSnap.val();
      commonMembers = commonMembers ? Object.values(commonMembers) : [];
    });

    var members = [...commonMembers, ..._inputs];

    members = members.map((member) => member.name);
    members = members.filter((member, index) => {
      return members.indexOf(member) == index;
    });
    members = members.map((member, index) => ({ key: index, name: member }));

    commonOrderMembersFB.set(members);

    navigation.navigate("per Person Order");
  };

  React.useEffect(() => {
    membersFB.on("value", (dataSnap) => {
      var dataSnapVal = dataSnap.val();
      if (dataSnapVal) {
        setInputs(Object.values(dataSnapVal));
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.inputsContainer}>
        {inputs.map((input, key) => (
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              onChangeText={(name) => {
                PersonNameChangeHandler(name, key);
              }}
              placeholder="Item Name"
              value={input.name}
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
