import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {scale} from '../utils/overAllNormalization';
import DropDownPicker from 'react-native-dropdown-picker';
import {Divider} from 'native-base';
import {Menu} from 'react-native-paper';
import axios from 'react-native-axios';
import {AuthContext} from '../Navigation/AuthProvider';
import {io} from 'socket.io-client';
import WebView from 'react-native-webview';
import {useSelector} from 'react-redux';
// import {BASEURL} from '@env';

const symbolMenuItems = [
  'XAUUSD',
  'EURUSD',
  'GBPUSD',
  'USDCHF',
  'USDJPY',
  'USDCNH',
  'USDRUB',
  'AUDUSD',
  'NZDUSD',
];
const expirationItemsList = [
  {label: 'GTC', value: '1'},
  {label: 'Today', value: '2'},
  {label: 'Specified', value: '3'},
  {label: 'Specified day', value: '4'},
];

export default function OrderCreate({route}) {
  const BASEURL = useSelector(state => state.baseUrl);
  const key = route?.params?.key;
  const symbolFromNavigation = route?.params?.symbol;
  const initialOrderSymbol = symbolFromNavigation
    ? symbolFromNavigation
    : symbolMenuItems[0];
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const items = useMemo(
    () => [
      {label: 'Instant Execution', value: '1'},
      {label: 'Buy Limit', value: '2'},
      {label: 'Sell Limit', value: '3'},
      {label: 'Buy Stop', value: '4'},
      {label: 'Sell Stop', value: '5'},
      {label: 'Buy Stop Limit', value: '6'},
      {label: 'Sell Stop Limit', value: '7'},
    ],
    [],
  );
  const [orderType, setOrderType] = useState('1');
  let orderTypeName = null;
  for (let i = 0; i < items.length; i++) {
    if (orderType === items[i].value) {
      orderTypeName = items[i].label;
      break;
    }
  }

  // value with greater , less than 5 meter
  const [quantity, setQuantity] = useState(1);
  const [stopLoss, setStopLoss] = useState(1);
  const [takeProfit, setTakeProfit] = useState(1);
  const [visible, setVisible] = React.useState(false);
  const openMenu = useCallback(() => setVisible(true), []);
  const closeMenu = useCallback(() => setVisible(false), []);
  const [orderSymbol, setOrderSymbol] = useState(initialOrderSymbol);
  const [bidAsk, setBidAsk] = useState({bid: 1.11, ask: 1.11});
  const handleQuantityChange = useCallback(text => {
    setQuantity(Number(text));
  }, []);
  const {Token} = useContext(AuthContext);
  const [openExpiration, setOpenExpiration] = useState(false);
  const [expiration, setExpiration] = useState(null);
  // console.log(bidAsk, ': bidAsk');
  const effectScoketConnection = useCallback(() => {
    const socket = io('http://65.0.59.137:8080');
    socket.connect();
    socket.on('newMessage', data => {
      if (data?.newMessage?.symbol === orderSymbol) {
        setBidAsk({
          bid: data?.newMessage?.bid,
          ask: data?.newMessage?.ask,
          symbol: data?.newMessage?.symbol,
        });
      }
    });
    return () => {
      socket.off('newMessage');
      socket.disconnect();
    };
  }, []);
  useEffect(effectScoketConnection, []);
  let expirationTypeName;
  for (let i = 0; i < expirationItemsList.length; i++) {
    if (expiration === expirationItemsList[i].value) {
      expirationTypeName = expirationItemsList[i].label;
      break;
    }
  }
  const placeNewOrder = (instantType = null) => {
    let type = orderType === 3 || orderType === 5 || orderType === 7 ? 0 : 1;
    if (instantType !== null) {
      if (instantType === 'Buy') {
        type = 1;
      } else {
        type = 0;
      }
    }

    let exec_type = orderType === 1 ? 0 : 1;
    const payload = {
      symbol: orderSymbol,
      type: type,
      exc_type: exec_type,
      qty: quantity,
      stop_loss: stopLoss,
      take_profit: takeProfit,
    };
    if (orderType !== 1) {
      payload.expiration = expirationTypeName;
    }

    console.log(payload);

    axios
      .post(`${BASEURL}/create-order`, payload, {
        headers: {
          Authorization: Token,
        },
      })
      .then(response => {
        console.log('create-order');
        console.log(response.status, 'status');
        console.log(response.data, 'data');
        navigation.goBack();
      });
  };

  function handleQuantityIncDec(changeAmount) {
    setQuantity(Number(quantity) + Number(changeAmount));
  }
  let firstClick = 0;
  const charturl = `${BASEURL}/new-chart/?symbol=${
    symbolFromNavigation ? symbolFromNavigation : 'XAUUSD'
  }&time=${1}`;

  console.log(expirationTypeName);
  return (
    <>
      <StatusBar backgroundColor="#1a1a1a" />
      <View style={styles.container}>
        <View style={styles.headerBox}>
          <View style={styles.headerBox1}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <AntDesign name="arrowleft" color={'#ffffff'} size={scale(25)} />
            </TouchableOpacity>
            <View style={styles.marginBox}>
              <Text style={styles.headerText}>{orderSymbol}</Text>
              <Text style={styles.headerText1}>{orderSymbol}</Text>
            </View>
          </View>
        </View>
        {key === 'New' && (
          <View style={{paddingBottom: scale(15)}}>
            <DropDownPicker
              open={open}
              value={Number(orderType)}
              items={items}
              setOpen={setOpen}
              style={[styles.dropdown]}
              setValue={setOrderType}
              //   setItems={setItems}
              placeholder={orderTypeName ? orderTypeName : 'Chose a Limit.'}
              textStyle={{color: '#ffffff'}}
              arrowColor="#ffffff"
              dropDownContainerStyle={{
                backgroundColor: '#3B3B3BF6',
                color: '#ffffff',
              }}
            />
            <View style={styles.borderBottom}></View>
          </View>
        )}
        {key !== 'Modify' && (
          <>
            <View>
              <View style={styles.inputContainerSelect}>
                <TouchableOpacity
                  onPress={() => {
                    handleQuantityIncDec(-5);
                  }}>
                  <View style={styles.buttonContainer}>
                    <Text style={styles.buttonTitle1}>-5</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleQuantityIncDec(-1);
                  }}>
                  <View style={styles.buttonContainer}>
                    <Text style={styles.buttonTitle1}>-1</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleQuantityIncDec(-0.1);
                  }}>
                  <View style={styles.buttonContainer}>
                    <Text style={styles.buttonTitle1}>-0.1</Text>
                  </View>
                </TouchableOpacity>
                <TextInput
                  style={styles.inputSelect}
                  value={quantity.toString()}
                  onChangeText={handleQuantityChange}
                  keyboardType="numeric"
                  maxLength={3}
                />
                <TouchableOpacity
                  onPress={() => {
                    handleQuantityIncDec(0.1);
                  }}>
                  <View style={styles.buttonContainer}>
                    <Text style={styles.buttonTitle1}>+0.1</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleQuantityIncDec(1);
                  }}>
                  <View style={styles.buttonContainer}>
                    <Text style={styles.buttonTitle1}>+1</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleQuantityIncDec(5);
                  }}>
                  <View style={styles.buttonContainer}>
                    <Text style={styles.buttonTitle1}>+5</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.borderBottom}></View>
            </View>
            {key === 'New' && (
              <View
                style={{
                  marginTop: scale(12),
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <View style={styles.containerText}>
                  <Text style={styles.baseText}>
                    {bidAsk?.bid.toString().split('.')[0]}.
                    <Text style={{fontSize: scale(25)}}>
                      {Number(bidAsk?.bid?.toString()?.split('.')[1])}
                    </Text>
                  </Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.baseText}>
                    {bidAsk?.ask.toString().split('.')[0]}.
                    <Text style={{fontSize: scale(25)}}>
                      {Number(bidAsk?.ask?.toString()?.split('.')[1])}
                    </Text>
                  </Text>
                </View>
              </View>
            )}
          </>
        )}
        <View style={styles.inputBox}>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => {
                if (firstClick === 0) {
                  setStopLoss(Number(bidAsk?.bid));
                  firstClick++;
                } else {
                  setStopLoss(stopLoss - 0.1);
                }
              }}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonTitle}>-</Text>
              </View>
            </TouchableOpacity>
            <TextInput
              style={styles.inputOrange}
              value={stopLoss.toFixed(2).toString()}
              onChangeText={text => setStopLoss(Number(text))}
              keyboardType="numeric"
            />
            <TouchableOpacity
              onPress={() => {
                if (firstClick === 0) {
                  setStopLoss(Number(bidAsk?.bid));
                  firstClick++;
                } else {
                  setStopLoss(stopLoss + 0.1);
                }
              }}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonTitle}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => {
                if (firstClick === 0) {
                  setTakeProfit(Number(bidAsk?.bid));
                  firstClick = Number(bidAsk?.bid);
                } else {
                  setTakeProfit(takeProfit - 0.1);
                }
              }}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonTitle}>-</Text>
              </View>
            </TouchableOpacity>
            <TextInput
              style={styles.inputGreen}
              value={takeProfit.toFixed(2).toString()}
              onChangeText={text => setTakeProfit(Number(text))}
              keyboardType="numeric"
            />
            <TouchableOpacity
              onPress={() => {
                if (firstClick === 0) {
                  setTakeProfit(Number(bidAsk?.bid));
                  firstClick = Number(bidAsk?.bid);
                } else {
                  setTakeProfit(takeProfit + 1);
                }
              }}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonTitle}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {key !== 'Modify' && (
          <>
            <View>
              <View style={styles.inputContainer1}>
                <TouchableOpacity onPress={() => {}}>
                  <View style={styles.buttonContainer}>
                    <Text style={styles.buttonTitle}>-</Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '90%',
                  }}>
                  <Text style={styles.buttonTitle1}>Deviation</Text>
                  <TextInput
                    style={styles.input1}
                    value={quantity.toString()}
                    onChangeText={handleQuantityChange}
                    keyboardType="numeric"
                  />
                </View>
                <TouchableOpacity onPress={() => {}}>
                  <View style={styles.buttonContainer}>
                    <Text style={styles.buttonTitle}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.borderBottom}></View>
            </View>
            {orderType !== '1' && (
              <DropDownPicker
                open={openExpiration}
                value={Number(orderType)}
                items={expirationItemsList}
                setOpen={setOpenExpiration}
                style={[styles.dropdown]}
                setValue={setExpiration}
                placeholder={
                  expiration === null ? 'Expiration' : expirationTypeName
                }
                textStyle={{
                  color: '#ffffff',
                }}
                arrowColor="#ffffff"
                dropDownContainerStyle={{
                  backgroundColor: '#3B3B3BF6',
                  color: '#ffffff',
                }}
              />
            )}
          </>
        )}
        <WebView
          source={{
            uri: charturl,
          }}
          style={{
            width: Dimensions.get('screen').width,
            height: 400,
            marginTop: 10,
          }}
        />
        {key === 'New' ? (
          <>
            {Number(orderType) !== 1 ? (
              <>
                <TouchableOpacity
                  onPress={() => placeNewOrder()}
                  style={styles.buttonBottom1}>
                  <Text style={styles.buy}>Place</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => placeNewOrder('Sell')}
                  style={styles.buttonBottom}>
                  <Text style={styles.sell}>SELL</Text>
                </TouchableOpacity>
                <Divider
                  bg="#FFFFFFA1"
                  thickness="1"
                  my="1"
                  h={scale(20)}
                  orientation="vertical"
                />

                <TouchableOpacity
                  onPress={() => placeNewOrder('Buy')}
                  style={styles.buttonBottom}>
                  <Text style={styles.buy}>BUY</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : key === 'Modify' ? (
          <TouchableOpacity onPress={() => {}} style={styles.buttonBottom1}>
            <Text style={styles.buy}>MODIFY</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => {}} style={styles.buttonBottom1}>
            <Text style={styles.buy1}>Close With Profit 3.76</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: scale(15),
  },
  headerText: {
    fontSize: scale(14),
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
  headerText1: {
    fontSize: scale(10),
    color: '#FFFFFFA1',
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: scale(20),
    paddingTop: scale(5),
  },
  headerBox1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginBox: {
    paddingHorizontal: scale(10),
  },
  dropdown: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  label: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    justifyContent: 'center',
  },
  inputContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: scale(10),
  },
  inputContainerSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    width: '68%',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: scale(10),
    paddingVertical: 5,
  },
  inputOrange: {
    width: '68%',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#C45811',
    borderRadius: 5,
    marginHorizontal: scale(10),
    paddingVertical: 5,
  },
  inputGreen: {
    width: '68%',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#4AC411',
    borderRadius: 5,
    marginHorizontal: scale(10),
    paddingVertical: 5,
  },
  input1: {
    // width: '80%',
    textAlign: 'center',
    marginHorizontal: scale(10),
    paddingVertical: 5,
  },
  inputSelect: {
    width: '12%',
    textAlign: 'center',
    marginHorizontal: scale(10),
    paddingVertical: 5,
    color: '#ffffff',
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    padding: scale(2),
    borderRadius: 5,
  },
  buttonTitle: {
    fontSize: scale(18),
    color: 'white',
  },
  buttonTitle1: {
    fontSize: scale(12),
    color: '#FFFFFFA1',
  },
  sell: {
    fontSize: scale(15),
    color: '#DF0606A1',
    fontWeight: '600',
  },
  buy: {
    fontSize: scale(15),
    color: '#0664DFA1',
    fontWeight: '600',
  },
  buy1: {
    fontSize: scale(15),
    color: '#DFC906A1',
    fontWeight: '600',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: scale(10),
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FFFFFF8F',
    width: '100%',
    alignSelf: 'center',
  },
  buttonBottom: {
    width: '49%',
    paddingVertical: scale(10),
    alignItems: 'center',
  },
  buttonBottom1: {
    width: '100%',
    paddingVertical: scale(10),
    alignItems: 'center',
  },
  baseText: {
    fontSize: scale(15),
    color: '#FFFFFF8A',
  },
  superscriptText: {
    fontSize: scale(12),
    position: 'relative',
    top: -scale(12),
    marginLeft: 2,
  },
  containerText: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
});
