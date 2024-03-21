import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const screenHeight = Dimensions.get('window').height;

const screenWidth = Dimensions.get('window').width;

const MarketStatic = ({route}) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');

  const DATA = [
    {
      id: 1,
      name: 'Bid',
      change: 'Up',
      value: '0.66206',
    },
    {
      id: 2,
      name: 'Bid High',
      change: 'dot',
      value: '0.66506',
    },
    {
      id: 3,
      name: 'Bid low',
      change: 'down',
      value: '0.66506',
    },
    {
      id: 4,
      name: 'Ask',
      change: 'down',
      value: '0.66206',
    },
    {
      id: 5,
      name: 'Ask high',
      change: 'dot',
      value: '0.66906',
    },
    {
      id: 6,
      name: 'Ask low',
      change: 'dot',
      value: '0.66166',
    },
    {
      id: 7,
      name: 'Ask low',
      change: 'dot',
      value: '0.66166',
    },
    {
      id: 7,
      name: 'Price change',
      change: 'down',
      value: '0.66666',
    },
    {
      id: 7,
      name: 'Open price',
      change: 'down',
      value: '0.65666',
    },
    {
      id: 7,
      name: 'Close price',
      change: 'down',
      value: '0.66766',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#1a1a1a'} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{margin: 10, alignItems: 'center', flexDirection: 'row'}}>
          <AntDesign name="arrowleft" color="#fff" size={25} />
          <Text style={styles.buttonTxt}>{route?.params?.data}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="cloud-search-outline"
            color="#fff"
            size={30}
            style={{marginRight: 10}}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {DATA?.map((item, index) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 20,
                marginHorizontal: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesome
                  name={
                    item?.change === 'Up'
                      ? 'chevron-up'
                      : item?.change === 'down'
                      ? 'chevron-down'
                      : 'dot-circle-o'
                  }
                  color="green"
                  size={25}
                />
                <Text style={styles.buttonTxt}> {item?.name} </Text>
              </View>
              <Text style={styles.buttonTxt}> {item?.value} </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MarketStatic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    height: '100%',
    width: '100%',
  },
  buttonTxt: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Actor-Regular',
    marginLeft: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: '#ccc',
    backgroundColor: '#1a1a1a',
    color: '#fff',
  },
});
