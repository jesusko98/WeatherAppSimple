import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { currentWeatherCondition } from '../tools/currentWeatherCondition'

const Weather = ({ weather, temperature }) => {
  console.log(weather);
  console.log(temperature);
  const colorWeather = currentWeatherCondition[weather]?.color;
  
  if (weather != null && colorWeather != null) {

    return (
      <View
      style={[
        styles.weatherContainer,
        { backgroundColor: currentWeatherCondition[weather]?.color }
      ]}
    >
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons
            size={72}
            name={currentWeatherCondition[weather]?.icon}
            color={'#fff'}
          />
          <Text style={styles.tempText}>{temperature}˚</Text>
        </View>
        <View style={styles.bodyContainer}>
        <Text style={styles.title}>{currentWeatherCondition[weather]?.title}</Text>
        <Text style={styles.subtitle}>
            {currentWeatherCondition[weather]?.subtitle}
          </Text>
        </View>
      </View>
    );

  }else{

    return (
      <View>
        <Text>Ups! Algo salió mal. Intenta de nuevo</Text>
      </View>
    )

  }

};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: '#f7b733'
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tempText: {
    fontSize: 48,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 48,

    color: '#fff'
  },
  h3: {
    fontSize: 12,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  }
});

export default Weather;