import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import TravelGuide from './TravelGuide';

const Activities = ({activity_type}: any) => {
  const [activities, setActivities] = useState({});
  const [spots, setSpots] = useState([]);

  const getAllActivities = () => {
    axios
      .get(`https://web-dev.dev.kimo.ai/v1/activities/${activity_type}`)
      .then((res: any) => {
        setActivities(res.data);
        setSpots(res.data.activities);
      })
      .catch(error => {
        setActivities({});
        setSpots([]);
        console.error(error);
      });
  };

  useEffect(() => {
    getAllActivities();
  }, []);

  return (
    <ScrollView>
      <View>
        <ImageBackground style={styles.bgImg} source={{uri: activities.image}}>
          <View style={styles.bgView}>
            <Text style={styles.bgText}>{activities.name}</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionText}>{activities.description}</Text>
      </View>
      <View>
        <Text style={styles.spotsText}>Top spots</Text>
        <View style={styles.items}>
          {spots.map((item: any, key: any) => {
            return (
              <View style={styles.item}>
                <Text style={styles.itemText}>{`${key + 1}.${item.name}`}</Text>
                <Image
                  style={styles.itemImg}
                  source={require('../assets/activitiesImg.png')}
                />
              </View>
            );
          })}
        </View>
      </View>
      <View>
        <TravelGuide />
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
    fontSize: 40,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 52,
    color: 'white',
  },
  bgImg: {
    width: '100%',
    height: 240,
  },
  descriptionBox: {
    padding: 20,
  },
  descriptionText: {
    textAlign: 'center',
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
    color: 'black',
  },
  spotsText: {
    fontFamily: 'IBMPlexMono-Bold',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
    padding: 20,
    color: 'black',
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#E6F2F2',
    paddingHorizontal: 20,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  itemText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 20,
    color: '#008080',
    paddingHorizontal: 20,
    width: 160,
  },
  itemImg: {
    width: 130,
    height: '100%',
    padding: 0,
    margin: 0,
  },
});

export default Activities;
