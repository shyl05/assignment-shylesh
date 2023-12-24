import {useNavigation} from '@react-navigation/native';
import {Card, Image} from '@rneui/themed';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

const Highlights = () => {
  const navigation = useNavigation();
  const data = useSelector((state: any) => state.highlights);

  return (
    <View style={styles.homeScreen}>
      <Text style={styles.highlightsText}>Highlights</Text>
      <ScrollView
        style={{padding: 16, margin: 5}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {data.map((item: any, key: any) => {
          return (
            <Card
              key={key}
              containerStyle={styles.cardOuter}
              wrapperStyle={styles.cardInner}>
              <Image
                style={{width: 368, height: 170, padding: 0, margin: 0}}
                source={{uri: item.image}}
              />
              <View style={styles.cardText}>
                <Text style={styles.cardHead}>{item.title}</Text>
                <Text style={styles.cardSubTitle}>{item.description}</Text>
                <TouchableOpacity
                  style={styles.arrowBtn}
                  onPress={() => navigation.navigate(`${item.title}`)}>
                  <Image
                    style={{width: 40, height: 40, padding: 0, margin: 0}}
                    source={require('../assets/Group.png')}
                  />
                </TouchableOpacity>
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    backgroundColor: '#FFF',
  },
  highlightsText: {
    fontFamily: 'IBMPlexMono-Bold',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
    padding: 20,
    color: 'black',
  },
  cardOuter: {
    width: 360,
    height: 350,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 0,
    margin: 5,
  },
  cardInner: {
    padding: 0,
    margin: 0,
  },
  cardText: {
    display: 'flex',
    fontFamily: 'IBMPlexMono-Regular',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 24,
    height: 120,
  },
  cardHead: {
    lineHeight: 20,
    color: '#008080',
    fontFamily: 'IBMPlexMono-Bold',
    fontSize: 24,
    fontWeight: '600',
    paddingTop: 10,
  },
  cardSubTitle: {
    color: '#001A1A',
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
  },
  arrowBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Highlights;
