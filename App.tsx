import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Components/Home';
import Activities from './Components/Activities';

// Store & States
import store from './State/store';
import {Provider, useDispatch} from 'react-redux';
import {getHighlights} from './State/slices/DataSlice';
import axios from 'axios';
import {Button} from '@rneui/themed';

const Tab = createBottomTabNavigator();

function AppContent() {
  const dispatch = useDispatch();
  const [highlights, setHighlights] = useState([]);

  const getAllHighlights = () => {
    axios
      .get('https://web-dev.dev.kimo.ai/v1/highlights')
      .then((res: any) => {
        setHighlights(res.data);
        dispatch(getHighlights(res.data));
      })
      .catch(error => {
        setHighlights([]);
        console.error(error);
      });
  };

  useEffect(() => {
    getAllHighlights();
  }, []);

  const IconHeader = () => (
    <View style={styles.navbar}>
      <Image source={require('./assets/Aloha.png')} />
    </View>
  );

  return (
    <View style={styles.screen}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={() => ({
            tabBarActiveTintColor: '#008080',
            tabBarInactiveTintColor: 'gray',
            tabBarOptions: {
              showIcon: true,
            },
            header: (props: any) => <IconHeader {...props} />,
            tabBarLabelStyle: {
              fontSize: 15,
              fontFamily: 'IBMPlexMono-Bold',
            },
          })}>
          <Tab.Screen
            name="Home"
            children={() => (
              <>
                <Home />
                <View style={styles.fabBtnContainer}>
                  <Button
                    titleStyle={styles.fabBtnText}
                    buttonStyle={styles.fabBtn}>
                    Book a trip
                  </Button>
                </View>
              </>
            )}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({size}) => (
                <Image
                  style={{width: size, height: size}}
                  source={require('./assets/Icon.png')}
                />
              ),
            }}
          />
          {highlights.map((item: any, key: any) => {
            let imagePath = '';
            let tabLabel = '';
            if (item.title === 'Surfing') {
              imagePath = require('./assets/surfing.png');
              tabLabel = 'Surfing';
            } else if (item.title === 'Traditional Festivals') {
              imagePath = require('./assets/nightlife.png');
              tabLabel = 'Hula';
            } else {
              imagePath = require('./assets/filter_hdr.png');
              tabLabel = 'Vulcano';
            }
            return (
              <Tab.Screen
                name={item.title}
                key={key}
                children={() => (
                  <>
                    <Activities activity_type={item.title} />
                    <View style={styles.fabBtnContainer}>
                      <Button
                        titleStyle={styles.fabBtnText}
                        buttonStyle={styles.fabBtn}>
                        Book a trip
                      </Button>
                    </View>
                  </>
                )}
                options={{
                  tabBarLabel: tabLabel,
                  tabBarIcon: ({size}) => (
                    <Image
                      style={{width: size, height: size}}
                      source={imagePath}
                    />
                  ),
                }}
              />
            );
          })}
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    height: 80,
  },
  navbarTitle: {
    fontSize: 25,
    padding: 5,
    paddingLeft: 10,
  },
  fabBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  fabBtn: {
    height: 40,
    width: 360,
    backgroundColor: '#008080',
    padding: 0,
    borderRadius: 8,
  },
  fabBtnText: {
    fontFamily: 'IBMPlexMono-Bold',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
