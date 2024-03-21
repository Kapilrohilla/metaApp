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
// import {BASEURL} from '@env';
import {AuthContext} from '../Navigation/AuthProvider';
import {useSelector} from 'react-redux';
const screenHeight = Dimensions.get('window').height;

const screenWidth = Dimensions.get('window').width;

const Properties = ({route}) => {
  const BASEURL = useSelector(state => state.baseUrl);
  const navigation = useNavigation();
  // const [email, setEmail] = useSt`ate('');
  // const [password, setPassWord] = useSta`te('');
  const [specificationData, setSpecificationData] = useState(null);
  const {Token} = useContext(AuthContext);
  const symbol = route?.params?.symbol;
  const apiUrl = `${BASEURL}/get-specification?symbol=${symbol}`;

  useEffect(() => {
    const header = new Headers();
    header.append('Authorization', Token);
    const requestOptions = {
      method: 'GET',
      headers: header,
      redirect: 'follow',
    };
    fetch(apiUrl, requestOptions)
      .then(r => r.json())
      .then(r => setSpecificationData(r?.message))
      .catch(err => {
        console.error(err);
      });
  }, []);
  const data = {
    Symbol: specificationData?.symbol,
    Description: specificationData?.description,
    Digits: specificationData?.digits,
    'Min Volume': specificationData?.minVolume,
    'Max Volume': specificationData?.maxVolume,
    'Step Volume': specificationData?.stepVolume,
    'Contract Size': specificationData?.contractSize,
    Spread: specificationData?.spread,
    Source: specificationData?.source,
    StopsLevel: specificationData?.stopsLevel,
    MarginCurrency: specificationData?.marginCurrency,
    ProfitCurrency: specificationData?.profitCurrency,
    Calculation: specificationData?.calculation,
    'Chart Mode': specificationData?.chartMode,
    Trade: specificationData?.trade,
    GTC: specificationData?.gtc,
    Fillings: specificationData?.fillings,
    Order: specificationData?.order,
    Expiration: specificationData?.expiration,
    'Swap Type': specificationData?.swapType,
    'Swap Short': specificationData?.swapShort,
    'Swap Long': specificationData?.swapLong,
  };

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
      {specificationData === null ? (
        <ActivityIndicator size={40} color={'#fff'} />
      ) : (
        <ScrollView style={{paddingHorizontal: 20}}>
          {Object.keys(data).map(key => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{fontWeight: '500', fontSize: 16, color: '#fff'}}>
                  {key}
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: 16,
                    color: '#fff',
                    maxWidth: 250,
                  }}>
                  {/* Symbol */}
                  {data[key]}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default Properties;

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
