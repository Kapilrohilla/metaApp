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
import {AuthContext} from '../Navigation/AuthProvider';
// import {BASEURL} from '@env';
import {DraxList, DraxProvider} from 'react-native-drax';
import {useSelector} from 'react-redux';

const screenHeight = Dimensions.get('window').height;

const screenWidth = Dimensions.get('window').width;

const SelectedSymbols = () => {
  const BASEURL = useSelector(state => state.baseUrl);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(loading, 'loadingSignIn');
  const {Token} = useContext(AuthContext);
  const DATA = [
    {
      id: 10,
      Name: 'EURRUB',
      Detail: 'Euro  vs Russian Ruble',
    },
    {
      id: 11,
      Name: 'EURSek',
      Detail: 'Euro  vs Swedish Ruble',
    },
    {
      id: 12,
      Name: 'EURTRY',
      Detail: 'Euro  vs Turkish Ruble',
    },
    {
      id: 13,
      Name: 'EURZAR',
      Detail: 'Euro  vs rand',
    },
    {
      id: 14,
      Name: 'GBPAUD',
      Detail: 'Pound Sterling vs Australian Dollar',
    },
    {
      id: 15,
      Name: 'GBPCHF',
      Detail: 'Pound Sterling vs Swiss Franc',
    },
    {
      id: 16,
      Name: 'GBPJPY',
      Detail: 'Pound Sterling vs Yen',
    },
    {
      id: 17,
      Name: 'USDCRE',
      Detail: '',
    },
    {
      id: 18,
      Name: 'GBPNOK',
      Detail: 'Pound Sterling vs NoRwegian Krone',
    },
    {
      id: 19,
      Name: 'GBPNZD',
      Detail: 'Pound Sterling vs New Zealand Dollar',
    },
    {
      id: 20,
      Name: 'GBPPLN',
      Detail: 'Pound Sterling vs Zloty',
    },
    {
      id: 21,
      Name: 'GBPSEK',
      Detail: 'Pound Sterling vs Swedish Krona',
    },
    {
      id: 22,
      Name: 'GBPSGD',
      Detail: 'Pound Sterling vs Singapore Dollar',
    },
    {
      id: 23,
      Name: 'GBPZAR',
      Detail: 'Pound Sterling vs South Africa Rand',
    },
    {
      id: 23,
      Name: 'NZDCAD',
      Detail: 'New Zealand Dollar vs Cnadian Dollar',
    },
    {
      id: 24,
      Name: 'NZDCHF',
      Detail: 'New Zealand Dollar vs Swiss Franc',
    },
    {
      id: 25,
      Name: 'NZDJPY',
      Detail: 'New Zealand Dollar vs Yen',
    },
    {
      id: 26,
      Name: 'NZDSGD',
      Detail: 'New Zealand Dollar vs Singapore Dollar',
    },
    {
      id: 27,
      Name: 'SGDJPY',
      Detail: 'Singapore Dollar vs YEN',
    },
    {
      id: 28,
      Name: 'USDGEL',
      Detail: 'US Dollar vs Lari',
    },
    {
      id: 29,
      Name: 'USDMXN',
      Detail: 'US Dollar vs Mexican Peso',
    },
    {
      id: 30,
      Name: 'ERUMXN',
      Detail: 'Euro vs Mexican Peso',
    },
    {
      id: 31,
      Name: 'CADMXN',
      Detail: 'Canadian Dollar vs Mexican Peso',
    },
    {
      id: 32,
      Name: 'CHFMXN',
      Detail: 'Swiss Franc vs Mexican Peso',
    },
    {
      id: 33,
      Name: 'MXNJPY',
      Detail: 'Mexican Peso vs Japanese Yen',
    },
    {
      id: 34,
      Name: 'NZDMXN',
      Detail: 'New Zealand Dollar vs Mexican Peso',
    },
    {
      id: 35,
      Name: 'USDCLP',
      Detail: 'US Dollar vs Chilian Peso',
    },
    {
      id: 36,
      Name: 'AUDSEK',
      Detail: 'Austrilian Dollar vs Sweden Krona',
    },
    {
      id: 37,
      Name: 'ERUSGD',
      Detail: 'Euro Vs Singapore Dollar',
    },
    {
      id: 38,
      Name: 'GBPDKK',
      Detail: 'Great Britain Pound vs Danish Krone',
    },
    {
      id: 39,
      Name: 'GBPHUF',
      Detail: 'Great Britain Pound vs Hungarian Forint',
    },
    {
      id: 40,
      Name: 'GBPTRY',
      Detail: 'Great Britain Pound vs Turkish Lira',
    },
    {
      id: 41,
      Name: 'NOKSEK',
      Detail: 'Norway Krone vs Sweden Krona',
    },
    {
      id: 41,
      Name: 'USDILS',
      Detail: 'US Dollar vs Israeli Shekel',
    },
    {
      id: 42,
      Name: 'ZARJPY',
      Detail: 'South Africa Rand vs Japanese Yen',
    },
    {
      id: 43,
      Name: 'AUDDKK',
      Detail: 'Austrilian Dollar vs Danish Krona',
    },
    {
      id: 44,
      Name: 'AUDNOK',
      Detail: 'Austrilian Dollar vs Norwegain Krona',
    },
    {
      id: 45,
      Name: 'AUDPLN',
      Detail: 'Austrilian Dollar vs Zloty',
    },
    {
      id: 46,
      Name: 'AUDSGD',
      Detail: 'Austrilian Dollar vs Singapore Dollar',
    },
    {
      id: 47,
      Name: 'AUDZAR',
      Detail: 'Austrilian Dollar vs South Africa Rand',
    },
    {
      id: 48,
      Name: 'XUDZAR',
      Detail: 'Norwegain Krona vs South Africa Rand',
    },
    {
      id: 49,
      Name: 'CADNOK',
      Detail: 'Canadian Dollar vs Norwegian Krona',
    },
    {
      id: 49,
      Name: 'CADPLN',
      Detail: 'Canadian Dollar vs Zloty',
    },

    {
      id: 50,
      Name: 'CAFDKK',
      Detail: 'Swiss Franc vs Danish Krona',
    },

    {
      id: 60,
      Name: 'ERUMXN',
      Detail: 'Euro vs Mexican Peso',
    },
    {
      id: 61,
      Name: 'CADMXN',
      Detail: 'Canadian Dollar vs Mexican Peso',
    },
    {
      id: 62,
      Name: 'CHFMXN',
      Detail: 'Swiss Franc vs Mexican Peso',
    },
    {
      id: 63,
      Name: 'MXNJPY',
      Detail: 'Mexican Peso vs Japanese Yen',
    },
    {
      id: 64,
      Name: 'NZDMXN',
      Detail: 'New Zealand Dollar vs Mexican Peso',
    },
    {
      id: 65,
      Name: 'USDCLP',
      Detail: 'US Dollar vs Chilian Peso',
    },
    {
      id: 66,
      Name: 'AUDSEK',
      Detail: 'Austrilian Dollar vs Sweden Krona',
    },
    {
      id: 67,
      Name: 'ERUSGD',
      Detail: 'Euro Vs Singapore Dollar',
    },
    {
      id: 68,
      Name: 'GBPDKK',
      Detail: 'Great Britain Pound vs Danish Krone',
    },
    {
      id: 69,
      Name: 'GBPHUF',
      Detail: 'Great Britain Pound vs Hungarian Forint',
    },
    {
      id: 70,
      Name: 'GBPTRY',
      Detail: 'Great Britain Pound vs Turkish Lira',
    },
    {
      id: 71,
      Name: 'NOKSEK',
      Detail: 'Norway Krone vs Sweden Krona',
    },
    {
      id: 71,
      Name: 'USDILS',
      Detail: 'US Dollar vs Israeli Shekel',
    },
    {
      id: 72,
      Name: 'ZARJPY',
      Detail: 'South Africa Rand vs Japanese Yen',
    },
    {
      id: 73,
      Name: 'AUDDKK',
      Detail: 'Austrilian Dollar vs Danish Krona',
    },
    {
      id: 74,
      Name: 'AUDNOK',
      Detail: 'Austrilian Dollar vs Norwegain Krona',
    },
    {
      id: 75,
      Name: 'AUDPLN',
      Detail: 'Austrilian Dollar vs Zloty',
    },
    {
      id: 76,
      Name: 'AUDSGD',
      Detail: 'Austrilian Dollar vs Singapore Dollar',
    },
    {
      id: 77,
      Name: 'AUDZAR',
      Detail: 'Austrilian Dollar vs South Africa Rand',
    },
    {
      id: 78,
      Name: 'AUDZAR',
      Detail: 'Austrilian Dollar vs South Africa Rand',
    },
    {
      id: 79,
      Name: 'CADNOK',
      Detail: 'Canadian Dollar vs Norwegian Krona',
    },
    {
      id: 89,
      Name: 'CADPLN',
      Detail: 'Canadian Dollar vs Zloty',
    },

    {
      id: 90,
      Name: 'CAFDKK',
      Detail: 'Swiss Franc vs Danish Krona',
    },
  ];
  const [watchListData, setWatchListData] = useState(null);
  // };
  console.log(Token);
  useEffect(() => {
    console.log('effectRunning');
    const apiUrl = `${BASEURL}/get-watchlist-data`;
    fetch(apiUrl, {
      headers: {
        Authorization: Token,
      },
    })
      .then(r => r.json())
      .then(data => {
        const apiData = data?.message?.map(symbolInfo => {
          return {
            symbol: symbolInfo.symbol,
          };
        });
        // console.log(data.message);
        console.log(apiData, ', apidata');
        setWatchListData(apiData);
      })
      .catch(err => {
        console.log('watchlist api failed');
        console.log(err);
      });
  }, []);
  console.log(watchListData);
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
          <Text style={styles.buttonTxt}>Selected Symbols</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddSymbols')}>
          <Entypo
            name="plus"
            color="#fff"
            size={35}
            style={{marginRight: 10}}
          />
        </TouchableOpacity>
      </View>
      {watchListData ? (
        <ScrollView contentContainerStyle={{paddingBottom: 40}}>
          {watchListData?.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  marginHorizontal: 15,
                  opacity: 0.6,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Entypo name="menu" color="#fff" size={25} />
                  <View style={{flexDirection: 'column', marginLeft: 10}}>
                    <Text style={{...styles.buttonTxt, fontSize: 18}}>
                      {/* {item?.Name} */}
                      {item?.symbol}
                    </Text>
                    {/* <Text style={{...styles.buttonTxt, fontSize: 14}}>
                    {item?.Detail}
                  </Text> */}
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    const myHeaders = new Headers();
                    myHeaders.append('Authorization', Token);
                    myHeaders.append('Content-Type', 'application/json');

                    var raw = JSON.stringify({
                      symbol: item?.symbol,
                    });

                    var requestOptions = {
                      method: 'POST',
                      headers: myHeaders,
                      body: raw,
                      redirect: 'follow',
                    };
                    const apiUrl = `${BASEURL}/delete-symbol`;
                    fetch(apiUrl, requestOptions)
                      .then(response => response.json())
                      .then(result => {
                        console.log(result);
                        if (result?.valid) {
                          navigation.goBack();
                        }
                      })
                      .catch(error => console.log('error', error));
                  }}>
                  <AntDesign name="delete" color="#ccc" size={25} />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
    // <DraxProvider>
    //   <View style={styles.container}>
    //     <StatusBar backgroundColor={'#1a1a1a'} />
    //     <TouchableOpacity
    //       onPress={() => navigation.goBack()}
    //       style={{margin: 10, alignItems: 'center', flexDirection: 'row'}}>
    //       <AntDesign name="arrowleft" color="#fff" size={25} />
    //       <Text style={styles.buttonTxt}>Add Symbols</Text>
    //     </TouchableOpacity>
    //     {/* <ScrollView contentContainerStyle={{paddingBottom: 20}}> */}
    //     {/* <TextInput
    //       style={styles.input}
    //       onChangeText={e => {
    //         setSearchString(e);
    //       }}
    //       value={searchString}
    //       placeholder="Find Symbol"
    //       keyboardType="default"
    //       placeholderTextColor={'#fff'}
    //       autoCapitalize="none"
    //       // right={
    //       //   searchString?.length !== 0 ? (
    //       //     <TextInput.Icon
    //       //       icon={({size, color}) => (
    //       //         <AntDesign name="search1" color="#fff" size={25} />
    //       //       )}
    //       //     />
    //       //   ) : null
    //       // }
    //     /> */}
    //     {data2show ? (
    //       // <ScrollView contentContainerStyle={{paddingBottom: 40}}>
    //       <DraxList
    //         data={data2show}
    //         renderItemContent={({item}) => (
    //           <TouchableOpacity
    //             style={{
    //               flexDirection: 'row',
    //               marginTop: 15,
    //               marginHorizontal: 15,
    //               opacity: 0.6,
    //               justifyContent: 'space-between',
    //             }}
    //             onPress={() => createSymbol(item?.Symbol)}>
    //             <View
    //               style={{
    //                 flexDirection: 'row',
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //               }}>
    //               <Entypo name="menu" color="#fff" size={25} />
    //               <View style={{flexDirection: 'column', marginLeft: 10}}>
    //                 <Text style={{...styles.buttonTxt, fontSize: 18}}>
    //                   {item?.Symbol}
    //                 </Text>
    //               </View>
    //             </View>
    //           </TouchableOpacity>
    //         )}
    //         onItemReorder={({fromIndex, toIndex}) => {
    //           const newData = data2show.slice();
    //           newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0]);
    //           setSymbolList(newData);
    //         }}
    //         keyExtractor={item => item.Symbol}
    //       />
    //     ) : (
    //       // </ScrollView>
    //       <Text>Loading...</Text>
    //     )}
    //     {/* {DATA?.map((item, index) => {
    //       return (
    //         <>
    //           <TouchableOpacity
    //             onPress={() => setIsEnabled(!isEnabled)}
    //             style={{
    //               flexDirection: 'row',
    //               alignItems: 'center',
    //               marginTop: 15,
    //               marginHorizontal: 15,
    //               borderBottomWidth: 1,
    //               paddingBottom: 10,
    //               borderBottomColor: '#fff',
    //             }}>
    //             <Entypo name="folder" color="#ccc" size={25} />
    //             <Text style={{...styles.buttonTxt}}>{item?.name}</Text>
    //           </TouchableOpacity>
    //           {isEnabled === true
    //             ? item?.AllDAta?.map((items, indexs) => {
    //                 return (
    //                   <TouchableOpacity
    //                     style={{
    //                       flexDirection: 'column',
    //                       marginTop: 15,
    //                       marginHorizontal: 15,
    //                       opacity: 0.6,
    //                     }}
    //                     onPress={() => {
    //                       createSymbol(items?.Name);
    //                     }}>
    //                     <Text style={styles.buttonTxt}>{items?.Name}</Text>
    //                     <Text style={{...styles.buttonTxt, fontSize: 10}}>
    //                       {items?.Detail}
    //                     </Text>
    //                   </TouchableOpacity>
    //                 );
    //               })
    //             : null}
    //         </>
    //       );
    //     })} */}
    //     {/* </ScrollView> */}
    //   </View>
    // </DraxProvider>
  );
};

export default SelectedSymbols;

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
