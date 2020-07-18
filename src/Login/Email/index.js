import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  StatusBar,
  Alert,
} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {LinearGradient} from 'expo-linear-gradient';

export default class Email_Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: null,
    };
  }

  static navigationOptions = {
    drawerLabel: () => null,
  };

  login = () => {
    if (this.state.email == '' || this.state.password == '') {
      Alert.alert('Falha no Login', 'Email e/ou senha invalídos');
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Map'))
        .catch(() =>
          Alert.alert('Falha no Login', 'Email e/ou senha invalídos'),
        );
    }
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          this.props.navigation.navigate('Email_Login');
          return true;
        },
      );
    });
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Email_Login');
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#ffae00" />
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
            <Text style={styles.titleText}>Logo/Icon</Text>
            {this.state.errorMessage && (
              <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
            )}
            <View style={styles.textInputContainer}>
              <Image
                style={styles.icon}
                source={require('./../../Icons/user.png')}></Image>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Email"
                onChangeText={email => this.setState({email})}
                value={this.state.email}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Image
                style={styles.icon}
                source={require('./../../Icons/lock.png')}></Image>
              <TextInput
                secureTextEntry
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Senha"
                onChangeText={password => this.setState({password})}
                value={this.state.password}
              />
            </View>
            <View style={styles.buttonCotainer}>
              <TouchableOpacity style={styles.button} onPress={this.login}>
                <Text style={styles.buttonTxt}> Entrar com Email </Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.lineStyle} />
              <Text style={styles.simpleText}>Ou se preferir</Text>
              <View style={styles.lineStyle} />
            </View>
            <View style={styles.buttonCotainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate('Number_Login')}>
                <Text style={styles.buttonTxt}>
                  Entrar com Número de Telefone
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: '#fff',
              }}>
              Ainda não tem conta?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}>
              <Text
                style={{
                  color: '#fff',
                  borderBottomColor: '#fff',
                  borderBottomWidth: 1,
                  fontWeight: 'bold',
                }}>
                Cadastre-se!
              </Text>
            </TouchableOpacity>
          </View>
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
  lineStyle: {
    borderWidth: 0.5,
    borderColor: '#fff',
    margin: 10,
    width: 100,
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
  simpleText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 38,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 90,
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
});
