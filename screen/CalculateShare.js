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
import { max } from "react-native-reanimated";

export default function CalculateShareScreen() {
  const individualBillDataFB = firebase.database().ref("individualBillData");
  const commonBillDataFB = firebase.database().ref("commonBillData");
  const membersFB = firebase.database().ref("members");
  const commonOrderMembersFB = firebase.database().ref("commonOrderMembers");

  const [individualBillData, setIndividualBillData] = useState([
    { key: "", name: "", price: "", quantity: 1 },
  ]);
  const [commonBillData, setCommonBillData] = useState([
    { key: "", name: "", price: "" },
  ]);
  const [members, setMembers] = useState([{ key: "", name: "" }]);
  const [commonOrderMembers, setCommonOrderMembers] = useState([
    { key: "", name: "" },
  ]);

  const [totalData, setTotalData] = useState([
    {
      key: "",
      memberName: "",
      sumAmount: 0,
      items: [{ key: "", name: "", price: "", quantity: "" }],
    },
  ]);

  const calcCommonOrder = () => {
    var _commonBillData = commonBillData.map((_member) => ({
      ..._member,
      quantity: "1/" + commonOrderMembers.length,
    }));

    var sum = 0;
    _commonBillData.map(
      (data) =>
        (sum +=
          parseFloat(data.price) / parseFloat(commonOrderMembers.length))
    );

    var _totalData = commonOrderMembers.map((member, key) => ({
      key: key,
      memberName: member.name,
      sumAmount: sum,
      items: _commonBillData,
    }));

    setTotalData(_totalData);
    console.log("inside common fn");
  };

  const calcIndividualOrder = () => {
    console.log("inside indiv fn");
  }
  const calc = () => {
    calcCommonOrder();
    calcIndividualOrder();
  }

  React.useEffect(() => {

    individualBillDataFB.on("value", (dataSnap) => {
      var dataSnapVal = dataSnap.val();
      if (dataSnapVal) {
        setIndividualBillData(Object.values(dataSnapVal));
      }
    });

    commonBillDataFB.on("value", (dataSnap) => {
      var dataSnapVal = dataSnap.val();
      if (dataSnapVal) {
        dataSnapVal = Object.values(dataSnapVal);
        setCommonBillData(dataSnapVal);
      }
    });

    membersFB.on("value", (dataSnap) => {
      var dataSnapVal = dataSnap.val();
      if (dataSnapVal) {
        setMembers(Object.values(dataSnapVal));
      }
    });

    commonOrderMembersFB.on("value", (dataSnap) => {
      var dataSnapVal = dataSnap.val();
      if (dataSnapVal) {
        dataSnapVal = Object.values(dataSnapVal);
        setCommonOrderMembers(dataSnapVal);
      }
    });
    
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.inputsContainer}>
        <TouchableOpacity
          onPress={() => {
            calc();
          }}
        >
          <Text>Common Orders</Text>
        </TouchableOpacity>
        {totalData.map((data, key) => (
          <View>
            <Text style={styles.input}>{data.memberName} </Text>
            <Text style={styles.input}>{data.sumAmount} </Text>
            {data.items.map((item, itemKey) => (
              <View style={styles.inputRow}>
                <Text style={styles.input}>{item.name} </Text>
                <Text style={styles.input}>{item.quantity} </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
    // <View style={styles.container}>
    //   <Text>Open up CalculateShareScreen.js to start working on your app!</Text>
    // </View>
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
