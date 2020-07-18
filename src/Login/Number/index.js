import React, {Component} from 'react';

import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  Alert,
  BackHandler,
} from 'react-native';

import {firebase} from '@react-native-firebase/auth';
import {Header, Left, Right, Body} from 'native-base';
import {LinearGradient} from 'expo-linear-gradient';

export default class Number_Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
    };
  }

  static navigationOptions = {
    drawerLabel: () => null,
  };

  handleSendCode = () => {
    if (this.state.phoneNumber != '') {
      firebase
        .auth()
        .signInWithPhoneNumber(this.state.phoneNumber)
        .then(
          confirmResult => (
            phoneNumber = this.state.phoneNumber,
            this.props.navigation.navigate('Verification', {
              confirmResult,
              phoneNumber,
            })
          ),
        )
        .catch(error => {
          alert(error.message);
          console.log(error);
        });
    } else {
      Alert.alert('Falha ao Enviar Código', 'Número de telefone é obrigatório');
    }
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.navigation.navigate('Email_Login');
        return true;
      });
  });

  }

  render() {
    return (
      <View style={{flex: 1}}>
        {/* <Header style={{backgroundColor: '#fbb13c'}}>
          <Left></Left>
          <Body></Body>
          <Right></Right>
        </Header> */}
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
          <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
              <Text style={styles.titleText}>Verificar Número de Telefone</Text>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  width: '90%',
                  margin: 10,
                }}>
                O Chama Moto vai enviar uma mensagem de texto com um código de
                verificação para o seu número.
              </Text>
              <View style={styles.textInputContainer}>
                <Image
                  style={styles.icon}
                  source={require('./../../Icons/phone.png')}></Image>
                <TextInput
                  style={styles.textInput}
                  placeholder="+55 00 000000000"
                  keyboardType="phone-pad"
                  value={this.state.phoneNumber}
                  onChangeText={phoneNumber => {
                    this.setState({phoneNumber});
                  }}
                  maxLength={15}
                />
              </View>
              <View style={styles.buttonCotainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.handleSendCode}>
                  <Text style={styles.buttonTxt}>Enviar Código</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonCotainer: {
    width: '60%',
    margin: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
  },
  buttonTxt: {
    fontSize: 14,
    color: '#f7a900',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    height: 25,
    width: 25,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    padding: 10,
  },
  textInput: {
    height: 40,
    width: '80%',
    margin: 5,
    padding: 5,
  },
});
