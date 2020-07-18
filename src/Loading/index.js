import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {LinearGradient} from 'expo-linear-gradient';

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
    }
  } catch (err) {
    console.warn(err);
  }
}

export default class Loading extends React.Component {
  static navigationOptions = {
    drawerLabel: () => null,
  };

  async componentDidMount() {
    await requestLocationPermission();
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Map' : 'Email_Login');
    });
  }

  render() {
    return (
      <LinearGradient
        colors={[
          '#ffc854',
          '#ffc854',
          '#ffc241',
          '#ffbc2e',
          '#ffb517',
          '#ffae00',
          '#f7a900',
          '#ffae00',
          '#ffb517',
          '#ffbc2e',
          '#ffc241',
          '#ffc854',
          '#ffc854',
        ]}
        style={{flex: 1}}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}>
        <View style={styles.container}>
          <Text style={{color: '#fff'}}>Carregando</Text>
          <ActivityIndicator size="large" />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
