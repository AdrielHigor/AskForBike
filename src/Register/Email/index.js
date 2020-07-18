import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {LinearGradient} from 'expo-linear-gradient';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', confirmPassword: '', message: null};
  }

  static navigationOptions = {
    drawerLabel: () => null,
  };

  SignUp = () => {
    if (
      this.state.email == '' ||
      this.state.password == '' ||
      this.state.confirmPassword == ''
    ) {
      Alert.alert('Falha no cadastro', 'Todos os campos são obrigatórios');
    } else {
      if (this.state.password == this.state.confirmPassword) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => this.props.navigation.navigate('Map'))
          .catch(e => Alert.alert('Falha no cadastro', e.message));
      } else {
        Alert.alert('Falha no cadastro', 'Senhas não coincidem');
      }
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
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
            <Text style={styles.titleText}>Cadastro</Text>
            {this.state.errorMessage && (
              <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
            )}

            <View style={styles.textInputContainer}>
              <Image
                style={styles.icon}
                source={require('./../../Icons/email.png')}></Image>
              <TextInput
                placeholder="Email"
                autoCapitalize="none"
                style={styles.textInput}
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
                placeholder="Senha"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={password => this.setState({password})}
                value={this.state.password}
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
                placeholder="Confirmar Senha"
                onChangeText={confirmPassword =>
                  this.setState({confirmPassword})
                }
                value={this.state.confirmPassword}
              />
            </View>
            <View style={styles.buttonCotainer}>
              <TouchableOpacity style={styles.button} onPress={this.SignUp}>
                <Text style={styles.buttonTxt}> Cadastrar-se </Text>
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
              Já tem conta?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Email_Login')}>
              <Text
                style={{
                  color: '#fff',
                  borderBottomColor: '#fff',
                  borderBottomWidth: 1,
                  fontWeight: 'bold',
                }}>
                Conecte-se!
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
