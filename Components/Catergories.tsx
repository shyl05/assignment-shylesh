import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import {getCatergories} from '../State/slices/DataSlice';
import {useDispatch} from 'react-redux';

const Catergories = () => {
  const dispatch = useDispatch();
  const [catergories, setCatergories] = useState([]);

  const getAllCatergories = () => {
    axios
      .get('https://web-dev.dev.kimo.ai/v1/categories')
      .then(res => {
        setCatergories(res.data);
        dispatch(getCatergories(res.data));
      })
      .catch(error => {
        setCatergories([]);
        console.error(error);
      });
  };

  useEffect(() => {
    getAllCatergories();
  }, []);

  return (
    <View style={styles.catergoriesBg}>
      <Text style={styles.catergoriesText}>Catergories</Text>
      <View style={styles.catergoriesContainer}>
        {catergories.map((item: any, key: any) => {
          return (
            <View key={key} style={styles.catergoriesItem}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Image
                style={styles.itemImg}
                source={require('../assets/Group.png')}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  catergoriesBg: {
    backgroundColor: '#E6F2F2',
  },
  catergoriesContainer: {
    margin: 10,
    height: 400,
  },
  catergoriesItem: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  catergoriesText: {
    fontFamily: 'IBMPlexMono-Bold',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
    padding: 20,
    color: 'black',
  },
  itemText: {
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    color: 'black',
  },
  itemImg: {
    width: 40,
    height: 40,
    padding: 0,
    margin: 0,
  },
});

export default Catergories;
