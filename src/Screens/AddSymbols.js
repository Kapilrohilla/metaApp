import React, {useEffect, useState, useContext, useRef} from 'react';
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
  ToastAndroid,
  PanResponder,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {AuthContext} from '../Navigation/AuthProvider';
// import {BASEURL} from '@env';
import {DraxProvider, DraxList} from 'react-native-drax';
import {useSelector} from 'react-redux';

const screenHeight = Dimensions.get('window').height;

const screenWidth = Dimensions.get('window').width;

const AddSymbols = () => {
  const navigation = useNavigation();
  const BASEURL = useSelector(state => state.baseUrl);

  // const [email, setEmail] = useState('');
  // find symbol input text
  const [searchString, setSearchString] = useState('');
  // const [isEnabled, setIsEnabled] = useState(false);
  // const [loading, setLoading] = useState(false);
  const {Token} = useContext(AuthContext);
  // console.log('token: ' + Token);
  // console.log(loading, 'loadingSignIn');
  // console.log('email: ' + email);
  // console.log('seachString : ' + searchString);
  // console.log('isEnabled: ' + isEnabled);
  // console.log('loading: ' + loading);
  // const [currentSymbol, setCurrentSymbol] = useState('');

  const [symbolsList, setSymbolList] = useState(null);
  // const data2 =
  // console.log(data2);
  const data2show = searchString
    ? symbolsList?.filter(symbolData => {
        return new RegExp(searchString, 'i').test(symbolData?.Symbol);
      })
    : symbolsList;
  useEffect(() => {
    const apiUrl = `${BASEURL}/get-group-symbols/`;
    fetch(apiUrl, {
      headers: {
        Authorization: Token,
      },
    })
      .then(r => r.json())
      .then(data => {
        const apiData = data?.symbolData;
        setSymbolList(apiData);
        console.log(apiData, ' symbol get response');
      })
      .catch(err => {
        // console.log('watchlist api failed');
        console.log(err.message);
      });
  }, []);

  function createSymbol(symbolName) {
    //  console.log(symbolName, ': symbolName');
    const payload = JSON.stringify({
      symbol: symbolName,
    });
    //  console.log(payload);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', Token);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      symbol: symbolName,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    console.log(payload, 0);
    const apiUrl = `${BASEURL}/add-symbol`;
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result, '< symbol creation response');
        if (result.valid) {
          ToastAndroid.show(result.message, 500);
        }
        navigation.goBack();
      })
      .catch(error => console.log('error: ', error));
  }

  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    }),
  ).current;

  return (
    <DraxProvider>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#1a1a1a'} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{margin: 10, alignItems: 'center', flexDirection: 'row'}}>
          <AntDesign name="arrowleft" color="#fff" size={25} />
          <Text style={styles.buttonTxt}>Add Symbols</Text>
        </TouchableOpacity>
        {/* <ScrollView contentContainerStyle={{paddingBottom: 20}}> */}
        <TextInput
          style={styles.input}
          onChangeText={e => {
            setSearchString(e);
          }}
          value={searchString}
          placeholder="Find Symbol"
          keyboardType="default"
          placeholderTextColor={'#fff'}
          autoCapitalize="none"
          // right={
          //   searchString?.length !== 0 ? (
          //     <TextInput.Icon
          //       icon={({size, color}) => (
          //         <AntDesign name="search1" color="#fff" size={25} />
          //       )}
          //     />
          //   ) : null
          // }
        />
        {data2show ? (
          // <ScrollView contentContainerStyle={{paddingBottom: 40}}>
          <DraxList
            data={data2show}
            renderItemContent={({item}) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  marginHorizontal: 15,
                  opacity: 0.6,
                  justifyContent: 'space-between',
                }}
                onPress={() => createSymbol(item?.Symbol)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Entypo name="menu" color="#fff" size={25} />
                  <View style={{flexDirection: 'column', marginLeft: 10}}>
                    <Text style={{...styles.buttonTxt, fontSize: 18}}>
                      {item?.Symbol}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            onItemReorder={({fromIndex, toIndex}) => {
              const newData = data2show.slice();
              newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0]);
              setSymbolList(newData);
            }}
            keyExtractor={item => item.Symbol}
          />
        ) : (
          // </ScrollView>
          <Text>Loading...</Text>
        )}
        {/* {DATA?.map((item, index) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => setIsEnabled(!isEnabled)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                  marginHorizontal: 15,
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  borderBottomColor: '#fff',
                }}>
                <Entypo name="folder" color="#ccc" size={25} />
                <Text style={{...styles.buttonTxt}}>{item?.name}</Text>
              </TouchableOpacity>
              {isEnabled === true
                ? item?.AllDAta?.map((items, indexs) => {
                    return (
                      <TouchableOpacity
                        style={{
                          flexDirection: 'column',
                          marginTop: 15,
                          marginHorizontal: 15,
                          opacity: 0.6,
                        }}
                        onPress={() => {
                          createSymbol(items?.Name);
                        }}>
                        <Text style={styles.buttonTxt}>{items?.Name}</Text>
                        <Text style={{...styles.buttonTxt, fontSize: 10}}>
                          {items?.Detail}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                : null}
            </>
          );
        })} */}
        {/* </ScrollView> */}
      </View>
    </DraxProvider>
  );
};

export default AddSymbols;

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
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    backgroundColor: '#1a1a1a',
  },
});
