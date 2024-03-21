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
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
const screenHeight = Dimensions.get('window').height;

const screenWidth = Dimensions.get('window').width;

const MainIndicator = () => {
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
          <Text style={styles.buttonTxt}>Indicators On XAUUSD, D1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <AntDesign name="delete" color="#fff" size={25} style={{marginRight:10}}  />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('Indicator')}
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{
              color: '#0388fc',
              fontSize: 18,
              fontWeight: '800',
              fontFamily: 'Actor-Regular',
              marginLeft: 10,
            }}>
            MAIN CHART
          </Text>
          <FontAwesome6 name="cart-plus" color="#0388fc" size={25} style={{marginRight:10}} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MainIndicator;

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
