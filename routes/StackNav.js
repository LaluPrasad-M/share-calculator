import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import AddBillItemsScreen from "../screen/AddBillItems";
import EditMembersScreen from "../screen/EditMembers";
import PerPersonOrderScreen from "../screen/PerPersonOrder";
import CommonOrderScreen from "../screen/CommonOrder";
import CalculateShareScreen from "../screen/CalculateShare";

const AddBillItemsStack = createStackNavigator();
const EditMembersStack = createStackNavigator();
const PerPersonOrderStack = createStackNavigator();
const CommonOrderStack = createStackNavigator();
const CalculateShareStack = createStackNavigator();

const backgroundColor = "#33dd33";
const headerTintColor = "#777777";

export const AddBillItemsStackScreen = ({ navigation }) => (
  <EditMembersStack.Navigator>
    <EditMembersStack.Screen
      name="Add Bill Items"
      component={AddBillItemsScreen}
      options={{
        headerShown: false,
      }}
    />
  </EditMembersStack.Navigator>
);

export const EditMembersStackScreen = ({ navigation }) => (
  <EditMembersStack.Navigator>
    <EditMembersStack.Screen
      name="Edit Members"
      component={EditMembersScreen}
      options={{
        headerShown: false,
      }}
    />
  </EditMembersStack.Navigator>
);

export const PerPersonOrderStackScreen = ({ navigation }) => (
  <EditMembersStack.Navigator>
    <EditMembersStack.Screen
      name="per Person Order"
      component={PerPersonOrderScreen}
      options={{
        headerShown: false,
      }}
    />
  </EditMembersStack.Navigator>
);

export const CommonOrderStackScreen = ({ navigation }) => (
  <EditMembersStack.Navigator>
    <EditMembersStack.Screen
      name="Common Order"
      component={CommonOrderScreen}
      options={{
        headerShown: false,
      }}
    />
  </EditMembersStack.Navigator>
);

export const CalculateShareStackScreen = ({ navigation }) => (
  <EditMembersStack.Navigator>
    <EditMembersStack.Screen
      name="Calculate Share" 
      component={CalculateShareScreen}
      options={{
        headerShown: false,
      }}
    />
  </EditMembersStack.Navigator>
);
