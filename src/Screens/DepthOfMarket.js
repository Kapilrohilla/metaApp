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
import Entypo from 'react-native-vector-icons/Entypo';
const screenHeight = Dimensions.get('window').height;

const screenWidth = Dimensions.get('window').width;

const DepthOfMarket = ({route}) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(loading, 'loadingSignIn');

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
        <View style ={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
        <TouchableOpacity >
          <Entypo
            name="database"
            color="#fff"
            size={25}
           
          />
        </TouchableOpacity>
        <TouchableOpacity style ={{marginHorizontal:10}} >
          <Entypo
            name="dots-three-vertical"
            color="#fff"
            size={25}
            
          />
        </TouchableOpacity>
        </View>
      </View>
      <ScrollView></ScrollView>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          padding:15
        }}>
        <TouchableOpacity>
          <Text
            style={{
              color: 'red',
              fontSize: 16,
              fontWeight: '600',
              fontFamily: 'Actor-Regular',
            }}>
            SELL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              color: 'yellow',
              fontSize: 16,
              fontWeight: '600',
              fontFamily: 'Actor-Regular',
            }}>
            CLOSE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              color: '#0388fc',
              fontSize: 16,
              fontWeight: '600',
              fontFamily: 'Actor-Regular',
            }}>
            BUY
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DepthOfMarket;

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
  },
});
