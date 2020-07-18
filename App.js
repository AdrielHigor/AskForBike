import React, {Component} from 'react';
import {StyleSheet, Button, SafeAreaView, View, ScrollView} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';

import Email_Login from './src/Login/Email/index';
import Number_Login from './src/Login/Number/index';
import Verification from './src/Login/Number/Verification/index';
import Register from './src/Register/Email/index';
import Loading from './src/Loading/index';
import Map from './src/Map/index';

import {firebase} from '@react-native-firebase/auth';

export default class Drawer extends Component {
  render() {
    return <AppContainer></AppContainer>;
  }
}

const signOutUser = async () => {
  try {
    await firebase.auth().signOut();
    navigate('Init');
  } catch (e) {
    console.log(e);
  }
};

const CustomDrawerComponent = props => (
  <SafeAreaView style={{flex:1}}>
    <ScrollView>
      <DrawerItems {...props}></DrawerItems>
    </ScrollView>
    <View style={{justifyContent:'flex-end'}}>
      <Button
        title="Sair"
        color='#fbb13c'
        onPress={signOutUser}></Button>
    </View>
  </SafeAreaView>
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Loading: Loading,
    Email_Login: Email_Login,
    Number_Login: Number_Login,
    Register: Register,
    Map: Map,
    Verification, Verification,
  },
  {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: '#fbb13c',
    },
  },
);

const AppContainer = createAppContainer(AppDrawerNavigator);
