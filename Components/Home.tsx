import React from 'react';
import {ScrollView, View, ImageBackground, StyleSheet} from 'react-native';
import {Text} from '@rneui/base';
import Highlights from './Highlights';
import Catergories from './Catergories';
import TravelGuide from './TravelGuide';

const Home = () => {
  return (
    <ScrollView>
      <View>
        <ImageBackground
          style={styles.bgImg}
          source={require('../assets/alohaBG.jpg')}>
          <View style={styles.bgView}>
            <Text style={styles.bgText}>Welcome</Text>
            <Text style={styles.bgText}>to Hawaii</Text>
          </View>
        </ImageBackground>
      </View>
      <View>
        <Highlights />
      </View>
      <View>
        <Catergories />
        <View>
          <TravelGuide />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bgView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgText: {
    textAlign: 'center',
    fontFamily: 'IBMPlexMono-Bold',
    fontSize: 56,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 56,
    color: 'white',
  },
  bgImg: {
    width: '100%',
    height: 480,
  },
});

export default Home;
