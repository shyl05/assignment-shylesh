import {Avatar, Button, Card} from '@rneui/themed';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TravelGuide = () => {
  return (
    <View style={styles.travelGuideContainer}>
      <Text style={styles.travelGuideText}>Travel Guide</Text>
      <Card containerStyle={styles.card}>
        <View style={styles.cardMain}>
          <View>
            <Text style={styles.guideTitle}>Haldwin Malone</Text>
            <Text style={styles.guideSubTitle}>Guide since 2012</Text>
          </View>
          <Avatar
            size={80}
            rounded
            source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
          />
        </View>
        <Button
          size="lg"
          type="outline"
          buttonStyle={styles.contactBtn}
          titleStyle={styles.contactBtnTitle}>
          Contact
        </Button>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  travelGuideContainer: {
    height: 340,
  },
  travelGuideText: {
    fontFamily: 'IBMPlexMono-Bold',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
    padding: 20,
    color: 'black',
  },
  card: {
    borderRadius: 15,
    margin: 15,
  },
  cardMain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  guideTitle: {
    fontFamily: 'IBMPlexMono-Bold',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
    padding: 20,
    color: 'black',
  },
  guideSubTitle: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
    padding: 20,
    color: 'black',
  },
  contactBtn: {
    borderColor: '#008080',
    borderWidth: 2,
    height: 50,
    width: 130,
    margin: 5,
  },
  contactBtnTitle: {
    fontFamily: 'IBMPlexMono-Bold',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
    color: '#008080',
  },
});

export default TravelGuide;
