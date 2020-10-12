import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { API_KEY } from './tools/OpenWeatherMap';
import { URL } from './tools/OpenWeatherMap';

import Weather from './components/WeatherComponents'

export default class App extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    error: null
  };




  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log('Request OpenWeather');
        console.log('Lat_'+position.coords.latitude);
        console.log('Lon_'+position.coords.longitude);


        this.fetchOpenWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error al obtener valores del clima'
        });
      }
    );
  }

  fetchOpenWeather(lat, lon) {
    fetch(
      `${URL}lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        // Seteo de valores temperatura y condicion del clima
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false
        });

      });
  }

  render() {
    const { isLoading, weatherCondition, temperature } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Consultando Clima</Text>
          </View>
        ) : (
          <Weather weather={weatherCondition} temperature={temperature} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
