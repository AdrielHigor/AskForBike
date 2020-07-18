import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

export default class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmResult: this.props.navigation.state.params.confirmResult,
      verificationCode: '',
      userId: '',
      errorMessage: '',
      phoneNumber: this.props.navigation.state.params.phoneNumber,
    };
  }

  static navigationOptions = {
    drawerLabel: () => null,
  };

  changePhoneNumber = () => {
    this.props.navigation.navigate('Number_Login');
  };

  handleVerifyCode = () => {
    // Request for OTP verification
    const {confirmResult, verificationCode} = this.state;
    if (this.state.verificationCode != '') {
      confirmResult
        .confirm(verificationCode)
        .then(user => {
          this.setState({userId: user.uid});
        })
        .catch(e => {
          this.setState({errorMessage: e.message});
        });
    } else {
      Alert.alert('Falha na Verificação', 'Código de verificação invalído');
    }
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({
        phoneNumber: this.props.navigation.state.params.phoneNumber,
      });
      this.backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          this.props.navigation.navigate('Number_Login');
          return true;
        },
      );
    });
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Number_Login');
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

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
            <Text style={styles.titleText}>
              Verificando {this.state.phoneNumber}{' '}
            </Text>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                width: '90%',
                margin: 10,
              }}>
              Uma mensagem de texto com um código de verificação foi enviada
              para o número acima.
            </Text>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Código de verificação"
                value={this.state.verificationCode}
                keyboardType="numeric"
                onChangeText={verificationCode => {
                  this.setState({verificationCode});
                }}
                maxLength={6}
              />
            </View>

            <View style={styles.buttonCotainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.handleVerifyCode}>
                <Text style={styles.buttonTxt}>Verificar Código</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                margin: 10,
              }}>
              <TouchableOpacity onPress={this.changePhoneNumber}>
                <Text
                  style={{
                    color: '#fff',
                    borderBottomColor: '#fff',
                    borderBottomWidth: 1,
                    fontWeight: 'bold',
                  }}>
                  Mudar Número de Telefone.
                </Text>
              </TouchableOpacity>
            </View>
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
  titleText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 40,
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
