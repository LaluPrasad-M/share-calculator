import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import {
  AddBillItemsStackScreen,
  EditMembersStackScreen,
  PerPersonOrderStackScreen,
  CommonOrderStackScreen,
  CalculateShareStackScreen,
} from "./StackNav"; 

import DrawerContent from "../components/DrawerContents";

const Drawer = createDrawerNavigator();

export function Navigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
               drawerContent={props => <DrawerContent { ...props} /> } >
                <Drawer.Screen name="Add Bill Items" component={AddBillItemsStackScreen} />
                <Drawer.Screen name="Edit Members" component={EditMembersStackScreen} />
                <Drawer.Screen name="per Person Order" component={PerPersonOrderStackScreen} />
                <Drawer.Screen name="Common Order" component={CommonOrderStackScreen} />
                <Drawer.Screen name="Calculate Share" component={CalculateShareStackScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
  }