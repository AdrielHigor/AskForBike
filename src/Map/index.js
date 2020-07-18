import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Button,
  Modal,
  Picker,
  BackHandler
} from 'react-native';

import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {Header, Left, Right, Body, Icon} from 'native-base';
import MapViewDirections from 'react-native-maps-directions';

Geocoder.init('GOOGLE API TOKEN');
var width = Dimensions.get('window').width;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        latitude: 0,
        longitude: 0,
      },
      mapLocation: {
        latitude: 0,
        longitude: 0,
      },
      errorMessage: '',
      marginBottom: 1,
      modalVisible: false,

      userLocationOption: null,
      userLocationLatitude: 0,
      userLocationLongitude: 0,
      userLocationAddress: '',
      userLocationTitle: '',
      userLocationMkOMLabel: 'Marcar no mapa',

      destinationLocationOption: null,
      destinationLocationLatitude: 0,
      destinationLocationLongitude: 0,
      destinationLocationAddress: '',
      destinationLocationTitle: '',
      destinationLocationMkOMLabel: 'Marcar no mapa',

      userDestinationDistance: null,
      userDestinationDuration: null,
    };
  }
  static navigationOptions = {
    title: 'Ínicio',
  };

  _onMapReady = () => this.setState({marginBottom: 0});

  confirmRide() {
    // TODO
    return true;
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  geocodeUserUpdate(latitude, longitude) {
    Geocoder.from(latitude, longitude)
      .then(json => {
        var addressComponent = json.results[0].address_components[1];
        this.setState({userLocationAddress: addressComponent});
        if (
          latitude == this.state.currentLocation.latitude ||
          longitude == this.state.currentLocation.longitude
        ) {
          this.setState({userLocationTitle: 'Sua localização atual'});
        } else {
          this.setState({
            userLocationTitle: 'Ponto de encontro',
            userLocationMkOMLabel: this.state.userLocationAddress.long_name,
          });
        }
      })
      .catch(error => console.warn(error));
  }

  geocodeDestinationUpdate(latitude, longitude) {
    Geocoder.from(latitude, longitude)
      .then(json => {
        var addressComponent = json.results[0].address_components[1];
        this.setState({destinationLocationAddress: addressComponent});
        if (
          latitude == this.state.currentLocation.latitude ||
          longitude == this.state.currentLocation.longitude
        ) {
          this.setState({destinationLocationTitle: 'Sua localização atual'});
        } else {
          this.setState({
            destinationLocationTitle: 'Destino',
            destinationLocationMkOMLabel: this.state.destinationLocationAddress
              .long_name,
          });
        }
      })
      .catch(error => console.warn(error));
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Map');
      this.props.navigation.closeDrawer()
      return true;
    });
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          currentLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          mapLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          userLocationLatitude: position.coords.latitude,
          userLocationLongitude: position.coords.longitude,
          errorMessage: null,
        });
        this.geocodeUserUpdate(
          position.coords.latitude,
          position.coords.longitude,
        );
        this.geocodeDestinationUpdate(
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      errorMessage => {
        console.log(errorMessage.code, errorMessage.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  handleUserLocation(itemValue) {
    console.log(itemValue);
    this.geocodeUserUpdate(
      this.state.currentLocation.latitude,
      this.state.currentLocation.longitude,
    );
    if (itemValue == 'markOnMap') {
      this.setState({
        userLocationOption: itemValue,
        userLocationLatitude: this.state.currentLocation.latitude,
        userLocationLongitude: this.state.currentLocation.longitude,
      });
      this.setModalVisible(false);
    } else {
      this.setState({
        userLocationOption: itemValue,
        userLocationLatitude: this.state.currentLocation.latitude,
        userLocationLongitude: this.state.currentLocation.longitude,
      });
    }
  }

  handleDestinationLocation(itemValue) {
    console.log(itemValue);
    this.geocodeDestinationUpdate(
      this.state.currentLocation.latitude,
      this.state.currentLocation.longitude,
    );
    if (itemValue == 'markOnMap') {
      this.setState({
        destinationLocationOption: itemValue,
        destinationLocationLatitude: this.state.currentLocation.latitude,
        destinationLocationLongitude: this.state.currentLocation.longitude,
      });
      this.setModalVisible(false);
    } else {
      this.setState({
        destinationLocationOption: itemValue,
        destinationLocationLatitude: this.state.currentLocation.latitude,
        destinationLocationLongitude: this.state.currentLocation.longitude,
      });
    }
  }

  renderUserMarker() {
    return (
      <MapView.Marker
        draggable
        coordinate={{
          latitude: this.state.userLocationLatitude,
          longitude: this.state.userLocationLongitude,
        }}
        onDragEnd={e => (
          this.setState({
            mapLocation: {
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            },

            userLocationLatitude: e.nativeEvent.coordinate.latitude,
            userLocationLongitude: e.nativeEvent.coordinate.longitude,
          }),
          this.geocodeUserUpdate(
            e.nativeEvent.coordinate.latitude,
            e.nativeEvent.coordinate.longitude,
          )
        )}
        title={this.state.userLocationTitle}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>{this.state.userLocationAddress.long_name}</Text>
          <Text style={{fontSize: 12, color: 'gray'}}>
            {this.state.userLocationAddress.short_name}
          </Text>
          <Image
            style={styles.marker}
            source={require('../../src/Icons/map_marker.png')}
          />
        </View>
      </MapView.Marker>
    );
  }

  renderDestinationMarker() {
    return (
      <MapView.Marker
        draggable
        coordinate={{
          latitude: this.state.destinationLocationLatitude,
          longitude: this.state.destinationLocationLongitude,
        }}
        onDragEnd={e => (
          this.setState({
            mapLocation: {
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            },

            destinationLocationLatitude: e.nativeEvent.coordinate.latitude,
            destinationLocationLongitude: e.nativeEvent.coordinate.longitude,
          }),
          this.geocodeDestinationUpdate(
            e.nativeEvent.coordinate.latitude,
            e.nativeEvent.coordinate.longitude,
          )
        )}
        title={this.state.destinationLocationTitle}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>{this.state.destinationLocationAddress.long_name}</Text>
          <Text style={{fontSize: 12, color: 'gray'}}>
            {this.state.destinationLocationAddress.short_name}
          </Text>
          <Image
            style={styles.marker}
            source={require('../../src/Icons/destination_marker.png')}
          />
        </View>
      </MapView.Marker>
    );
  }

  renderDistanceTime() {
    return (
      <View style={{marginTop:10}}>
        <Text>
          Distancia entre ponto de partida e destino:{' '}
          {this.state.userDestinationDistance
            .toFixed(2)
            .toString()
            .replace(/\./g, ',')}{' '}
          km
        </Text>
        <Text>
          Tempo estimado da corrida:{' '}
          {this.state.userDestinationDuration
            .toFixed(2)
            .toString()
            .replace(/\./g, ',')}{' '}
          min
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header style={{backgroundColor: '#fbb13c'}}>
          <Left>
            <Icon
              name="menu"
              style={{color: '#fff'}}
              onPress={() => this.props.navigation.openDrawer()}></Icon>
          </Left>
          <Body></Body>
          <Right></Right>
        </Header>
        <MapView
          showsMyLocationButton
          showsUserLocation
          showsBuildings
          showsTraffic
          loadingEnabled
          style={{flex: 1, marginBottom: this.state.marginBottom}}
          region={{
            latitude: this.state.mapLocation.latitude,
            longitude: this.state.mapLocation.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          onMapReady={this._onMapReady}>
          <MapViewDirections
            origin={{
              latitude: this.state.userLocationLatitude,
              longitude: this.state.userLocationLongitude,
            }}
            destination={{
              latitude: this.state.destinationLocationLatitude,
              longitude: this.state.destinationLocationLongitude,
            }}
            apikey={'GOOGLE API TOKEN'}
            onReady={result => {
              this.setState({
                userDestinationDistance: result.distance,
                userDestinationDuration: result.duration,
              });
            }}
            onError={errorMessage => {
              // console.log('GOT AN ERROR');
            }}
          />
          {this.state.userLocationOption ? this.renderUserMarker() : null}
          {this.state.destinationLocationOption
            ? this.renderDestinationMarker()
            : null}
        </MapView>
        <Button
          title="Pedir Corrida"
          color="#fbb13c"
          onPress={() => {
            this.setModalVisible(true);
          }}></Button>
        <Modal
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
          <View style={{flex: 1}}>
            <Header style={{backgroundColor: '#fbb13c'}}>
              <Left>
                <Icon
                  name="md-arrow-back"
                  style={{color: '#fff'}}
                  onPress={() => this.setModalVisible(false)}></Icon>
              </Left>
              <Body></Body>
              <Right></Right>
            </Header>
            <View style={styles.container}>
              <Text style={styles.Txt}>Seu Local</Text>
              <View
                style={{
                  height: 50,
                  width: width,
                  borderBottomWidth: 1,
                  borderBottomColor: 'black',
                }}>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.userLocationOption}
                  onValueChange={(itemValue, itemIndex) =>
                    this.handleUserLocation(itemValue)
                  }>
                  <Picker.Item label="Sua localização atual" value={null} />
                  <Picker.Item
                    label={this.state.userLocationMkOMLabel}
                    value="markOnMap"
                  />
                </Picker>
              </View>
              <Text style={styles.Txt}>Seu Destino</Text>
              <View
                style={{
                  height: 50,
                  width: width,
                  borderBottomWidth: 1,
                  borderBottomColor: 'black',
                }}>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.destinationLocationOption}
                  onValueChange={(itemValue, itemIndex) =>
                    this.handleDestinationLocation(itemValue)
                  }>
                  <Picker.Item label="Sua localização atual" value={null} />
                  <Picker.Item
                    label={this.state.destinationLocationMkOMLabel}
                    value="markOnMap"
                  />
                </Picker>
                {this.state.userDestinationDistance
                  ? this.renderDistanceTime()
                  : null}
              </View>
            </View>
            <View style={{justifyContent: 'flex-end'}}>
              <Button
                title="Confirmar Corrida"
                color="#fbb13c"
                onPress={this.confirmRide}></Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  marker: {
    height: 38,
    width: 38,
  },
  container: {
    flex: 1,
  },
  Txt: {
    fontSize: 14,
    color: 'gray',
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 5,
  },
});
