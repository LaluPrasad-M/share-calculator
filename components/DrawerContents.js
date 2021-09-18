import React from "react";
import { View, StyleSheet } from "react-native";

import {
    Avatar,
    Title,
    Caption,
    Drawer,
} from 'react-native-paper';

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

export default function DrawerContent(props) {
  return (
    <View>
      <DrawerContentScrollView {...props}>
        <View>
          <Drawer.Section>
            <DrawerItem
              //   icon={({ color, size }) => (
              //     <Icon name="account-outline" color={color} size={size} />
              //   )}
              label="Add Bill Items" 
              onPress={() => {
                props.navigation.navigate("Add Bill Items");
              }}
            />
             <DrawerItem
              //   icon={({ color, size }) => (
              //     <Icon name="account-outline" color={color} size={size} />
              //   )}
              label="Edit Members" 
              onPress={() => {
                props.navigation.navigate("Edit Members");
              }}
            />
            <DrawerItem
              //   icon={({ color, size }) => (
              //     <Icon name="account-outline" color={color} size={size} />
              //   )}
              label="per Person Order"
              onPress={() => {
                props.navigation.navigate("per Person Order");
              }}
            />
            <DrawerItem
              //   icon={({ color, size }) => (
              //     <Icon name="account-outline" color={color} size={size} />
              //   )}
              label="Common Order" 
              onPress={() => {
                props.navigation.navigate("Common Order");
              }}
            />
            <DrawerItem
              //   icon={({ color, size }) => (
              //     <Icon name="account-outline" color={color} size={size} />
              //   )}
              label="Calculate Share" 
              onPress={() => {
                props.navigation.navigate("Calculate Share");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}
