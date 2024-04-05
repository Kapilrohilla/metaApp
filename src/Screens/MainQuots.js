/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useRef, useState, useEffect, useMemo, useCallback, useContext} from 'react';
import {StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, DrawerActions, useIsFocused} from '@react-navigation/native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {scale} from '../utils/overAllNormalization';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'react-native-axios';
import {CandlestickChart} from 'react-native-wagmi-charts';
import {AuthContext} from '../Navigation/AuthProvider';
import {WebView} from 'react-native-webview';
// import WebViewText from '../components/WebViewText';
import {populateUser} from '../../ReduxToolkit/slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {populateWatchlist} from '../../ReduxToolkit/slices/watchlistslice';
// import {BASEURL} from '@env';

const MainQuots = () => {
  const {Token} = useContext(AuthContext);
  const BASEURL = useSelector(state => state.baseUrl);
  const [messages, setMessages] = useState([]);
  const [isFocusHeight, setIsFocusHeight] = useState(false);
  const [heightvalue, setHeightValue] = useState('');
  const [volum, setVolum] = useState('1');
  const [volums, setVolums] = useState('1');
  const [limit, setLimit] = useState('1');
  const [stopLoss, setStopLoss] = useState('1');
  const [takeProfit, setTakeProfit] = useState('1');
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [firstload, setFirstload] = useState(true);
  const [heightvalues, setHeightValues] = useState(null);
  const [isFocusHeights, setIsFocusHeights] = useState(false);
  const navigation = useNavigation();
  const [bottomSheet, setBottomSheets] = useState(false);
  const sheetRef = useRef(null);
  const OrdersheetRef = useRef(null);
  const ChartsheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '90%'], []);
  const OrdersnapPoints = useMemo(() => ['90%', '100%'], []);
  const [bottomSheetItem, setBottomSheetItem] = useState({});
  const [orderBottomSheet, setorderBottomSheet] = useState(false);
  const [ChartBottomSheet, setChartBottomSheet] = useState(false);
  const [chartSockData, setchartSockData] = useState([]);
  // const [SelectSellType, setSelectSellType] = useState('');
  const [orderAction, setOrderAction] = useState(null);
  const [orderPrice, setOrderPrice] = useState(0);

  const [orderExpiration, setOrderExpiration] = useState(null);
  const isFocuesed = useIsFocused();

  const dispatch = useDispatch();
  const orderBottomSheetActions = [
    {label: 'Instant Sell ', value: '1'},
    {label: 'Instant Buy', value: '2'},
    {label: 'Buy Limit', value: '3'},
    {label: 'Sell Limit', value: '4'},
    {label: 'Buy Stop', value: '5'},
    {label: 'Sell Stop', value: '6'},
    {label: 'Buy Stop Limit', value: '7'},
    {label: 'Sell Stop Limit', value: '8'},
  ];
  const orderBottomSheet_ExpirationActions = [
    {label: 'GTC', value: '1'},
    {label: 'Today', value: '2'},
    {label: 'Specified', value: '3'},
    {label: 'Specified Day', value: '4'},
  ];
  const webViewRef = useRef(null);

  const [symbolData, setSymbolData] = useState(null);

  const getWebviewContent = () => {
    return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width, height=device-height, target-densitydpi=device-dpi">
    <title>Display Array in List</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
      rel="stylesheet"
    />

    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
      crossorigin="anonymous"
    />
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 10px;
      }
      *{
        -webkit-user-select: none;  
        -moz-user-select: none;    
        -ms-user-select: none;      
        user-select: none;
      }
      ul {
        list-style: none;
        padding: 0;
      }
    </style>
  </head>

  <body>
    <div class="table-responsive">
      <table id="dataTable" class="table table-striped">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Bid</th>
            <th>Ask</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>

    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.1/socket.io.js"
      integrity="sha512-Z6C1p1NIexPj5MsVUunW4pg7uMX6/TT3CUVldmjXx2kpip1eZcrAnxIusDxyFIikyM9A61zOVNgvLr/TGudOQg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>

    <script src="https://cdn.socket.io/4.0.0/socket.io.min.js"></script>

    <script>
      const symbolDataMap = new Map();
      let symbolColor;
      let changeColor;
      let bidColor;
      let askColor;
      let symbolIcon;
      let symbolMap = [];
      // Function to handle row click
      const handleRowClick = (symbol, rowElement) => {
        const {
          symbol: symbolData,
          change_percent,
          change_points,
          bid,
          ask,
          description,
        } = symbolDataMap.get(symbol);
        console.log(symbolDataMap);
        console.log(description, "------------description------------");

        console.log("Clicked row data:", {
          symbol: symbolData,
          change_percent,
          change_points,
          bid,
          ask,
        });
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            symbol: symbolData,
            change_percent,
            change_points,
            bid,
            ask,
            description,
          })
        );
      };

      const fetchElseData = async () => {
        const apiUrl = '${BASEURL}/get-watchlist-data';
        const response = await fetch(apiUrl,
          {
            headers: {
              Authorization: '${Token}',
            },
          }
        );

        const data = await response.json();
        const data2 = await data?.message;
        console.log(data2);
        data2.forEach((data) => {
          const obj = {
            symbol: data?.symbol,
            digit: data?.digits,
          };
          symbolMap.push(obj);

          console.log(data?.description, "<< -- description");
          symbolDataMap.set(data?.symbol, {
            symbol: data?.symbol,
            change_percent: parseFloat(data?.changePercent).toFixed(
              getDecimalPlaces(data?.symbol)
            ),
            change_points: parseFloat(data?.changePoints).toFixed(
              getDecimalPlaces(data?.symbol)
            ),
            bid: parseFloat(data?.bid).toFixed(getDecimalPlaces(data?.symbol)),
            ask: parseFloat(data?.ask).toFixed(getDecimalPlaces(data?.symbol)),
            bidChange: data?.bidChange,
            askChange: data?.askChange,
            description: data?.description,
          });

          updateTable();
        });
      };

      const getDecimalPlaces = (symbol) => {
        const symbolInfo = symbolMap.find((info) => {
          return info.symbol === symbol;
        });
        
        return symbolInfo ? symbolInfo.digit : 2;
      };

      fetchElseData();

      const updateTable = () => {
        const tableBody = document.querySelector("#dataTable tbody");
        tableBody.innerHTML = "";

        symbolDataMap.forEach((data) => {
          const newRow = document.createElement("tr");
          newRow.setAttribute("data-symbol", data.symbol);
          newRow.addEventListener("click", () =>
            handleRowClick(data.symbol, newRow)
          ); // Pass the row element

          const symbolCell = document.createElement("td");
          if (data.askChange === "falling") {
            symbolColor = "red";
            symbolIcon = "<i class='fa fa-arrow-down'> ";
          } else if (data.askChange === "rising") {
            symbolColor = "green";
            symbolIcon = "<i class='fa fa-arrow-up'>";
          } else {
            symbolColor = "";
            symbolIcon = "";
          }
          symbolCell.innerHTML = symbolIcon;
          symbolCell.style.color = symbolColor;
          symbolCell.innerHTML += data.symbol;
          newRow.appendChild(symbolCell);

          const changeCell = document.createElement("td");
          const changePoints = Number(data.change_points).toFixed(2);
          const changePercent = Number(data.change_percent).toFixed(2);
          if (changePercent < 0) {
            changeColor = "red";
          } else if (changePercent > 0) {
            changeColor = "green";
          }

          const bidCell = document.createElement("td");
          bidCell.textContent = data.bid;
          newRow.appendChild(bidCell);

          const askCell = document.createElement("td");
          askCell.textContent = data.ask;
          newRow.appendChild(askCell);

          changeCell.style.color = changeColor;
          changeCell.textContent = changePercent + "%";
          newRow.appendChild(changeCell);

          tableBody.appendChild(newRow);
        });
      };

      const socket = io('${BASEURL}', {
        transports: ["websocket"],
        withCredentials: false,
      });
      socket.on("connect", () => {
        console.log("Connected to server");
      });

      socket.on("newMessage", (newDataPoint) => {
        let tableData = newDataPoint.newMessage;
        let symbol = tableData.symbol;
        if (symbolDataMap.has(symbol)) {
          symbolDataMap.set(symbol, {
            symbol: symbol,
            change_percent: parseFloat(tableData.changePercent).toFixed(
              getDecimalPlaces(symbol)
            ),
            change_points: parseFloat(tableData.changePoints).toFixed(
              getDecimalPlaces(symbol)
            ),
            bid: parseFloat(tableData.bid).toFixed(getDecimalPlaces(symbol)),
            ask: parseFloat(tableData.ask).toFixed(getDecimalPlaces(symbol)),
            bidChange: tableData.bidChange,
            askChange: tableData.askChange,
            description: symbolDataMap.get(symbol).description,
          });
          //   console.log(symbolDataMap, 1);
        }
        updateTable();
      });
    </script>
  </body>
</html>

  `;
  };

  const onMessageReceived = event => {
    console.log('================++++++++++++++++++======================');
    const dataArray = JSON.parse(event.nativeEvent.data);
    console.log(dataArray, '< - dataArray');
    setSymbolData(dataArray);
    handelBottomSheet(dataArray);
  };
  const UpdateGeneral = async type => {
    await axios
      .post(
        `${BASEURL}/create-order`,
        JSON.stringify({
          qty: volum,
          exc_type: heightvalue === '1' ? '0' : '1',
          type: type,
          symbol: 'XAUUSD',
        }),
        {
          headers: {
            Authorization: Token,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        console?.log(response, 'UpdateGeneral');
        if (response?.status === 200) {
          setorderBottomSheet(false);
          setChartBottomSheet(false);
        }
      })
      .catch(error => {
        if (error) {
          console?.log(error, ',,,,,,,,,,,,,,,');
        }
      });
  };

  const handlePlaceOrder = () => {
    let type;
    if (orderAction == 1 || orderAction == 4 || orderAction == 6 || orderAction == 8) {
      type = 0;
    } else {
      type = 1;
    }
    console.log(type);
    const data2send = {
      symbol: bottomSheetItem?.symbol,
      type: type,
      exc_type: orderAction === 1 || orderAction === 2 ? 0 : 1, // instant = 0 else 1
      qty: volums,
      price: orderPrice,
      limit: limit,
      stop_loss: stopLoss,
      take_profit: takeProfit,
      // comment: 'test comment',
      // expiration: Date.now().toString(),
    };
    console.log(data2send);
    axios
      .post(`${BASEURL}/create-order`, data2send, {
        headers: {
          Authorization: Token,
        },
      })
      .then(response => {
        console?.log(response.data, 'handlePlaceOrder');
        console.log(response.status);
        if (response?.status === 200) {
          setorderBottomSheet(false);
          setChartBottomSheet(false);

          setOrderAction(null);
          setVolums('');
          setOrderPrice('');
          setLimit('');
          setStopLoss('');
          setTakeProfit('');
          setOrderExpiration(null);
        }
      })
      .catch(error => {
        if (error) {
          console?.log('Error occurred');
          console.log(error);
          console?.log('Error occurred');
        }
      });
  };

  const HeightDatas = [
    {label: '1 Minute', value: '1'},
    {label: '5 Minute', value: '5'},
    {label: '15 Minute', value: '15'},
    {label: '30 Minute', value: '30'},
    {label: '1 Hour', value: '60'},
    {label: '4 Hour', value: '120'},
    // {label: '1 Day', value: '7'},
  ];
  const GetAllOrderDetailsFirst = () => {
    // setLoading(true);
    try {
      axios
        .get(`${BASEURL}/get-data/XAUUSD/${heightvalues}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log(response?.data, 'GetAllOrderDetails');
          if (response?.status === 200) {
            setData(
              response?.data?.map((item, index) => {
                return {
                  timestamp: item?.date,
                  open: item?.open,
                  high: item?.high,
                  low: item?.low,
                  close: item?.close,
                };
              }),
            );
            setFirstload(false);
            // setLoading(false);
          }
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const fetchUserDetails = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', Token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    const apiUrl = `${BASEURL}/user`;
    console.log('apiURL: ' + apiUrl);
    console.log(Token);
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(result => {
        dispatch(populateUser(result?.user));
      })
      .catch(error => {
        console.log('error while fetching user data', error);
      });
  };

  const getWatchlistData = async () => {
    console.log('watchlist called');
    const response = await fetch(`${BASEURL}/get-watchlist-data`, {
      headers: {
        Authorization: `${Token}`,
      },
    });
    // console.log('response recieved');
    const data = await response?.json();
    const message = data?.message;
    // console.log(message, '<<< __ data __');
    dispatch(populateWatchlist(message));
  };
  useEffect(() => {
    if (ChartBottomSheet === true) {
      GetAllOrderDetailsFirst();
    }
    fetchUserDetails();
    getWatchlistData();
  }, []);
  useEffect(() => {
    if (isFocuesed) {
      webViewRef.current.reload();
    }
  }, [isFocuesed]);
  const GetAllOrderDetailsSec = time => {
    try {
      axios
        .get(`${BASEURL}/get-data/XAUUSD/${time}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log(response?.data, 'GetAllOrderDetails');
          if (response?.status === 200) {
            setData(
              response?.data?.map((item, index) => {
                return {
                  timestamp: item?.date,
                  open: item?.open,
                  high: item?.high,
                  low: item?.low,
                  close: item?.close,
                };
              }),
            );

            // setLoading(false);
          }
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const handleSheetChange = useCallback(index => {
    // console.log('handleSheetChange', index);
  }, []);

  const handleItemPress = useCallback(
    title => {
      setBottomSheets(true);
      setBottomSheetItem();
    },
    [setBottomSheets, setBottomSheetItem],
  );
  const handelBottomSheet = dataArray => {
    setBottomSheets(true);
    setBottomSheetItem(dataArray);
  };
  const Item = React.memo(({title, onPress}) => {
    const {symbol, bidChange, changePoints, changePercent, bid, askChange, ask} = title;

    const bidColor =
      bidChange === 'unchanged'
        ? '#6d6d6e'
        : bidChange === 'falling'
        ? 'red'
        : bidChange === 'rising'
        ? '#0388fc'
        : '#6d6d6e';
    const bidSymbol =
      bidChange === 'unchanged' ? '' : bidChange === 'falling' ? '-' : bidChange === 'rising' ? '+' : '';
    const askColor =
      askChange === 'unchanged'
        ? '#6d6d6e'
        : askChange === 'falling'
        ? 'red'
        : askChange === 'rising'
        ? '#0388fc'
        : '#6d6d6e';
    const askSymbol =
      askChange === 'unchanged' ? '' : askChange === 'falling' ? '-' : askChange === 'rising' ? '+' : '';

    const handlePress = useCallback(() => {
      onPress(title);
    }, [onPress, title]);

    return (
      <TouchableOpacity
        onPress={handlePress}
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 15,
          zIndex: 1000,
        }}>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', marginBottom: 5}}></View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '900',
              fontFamily: 'Inter-Regular',
              color: bidColor,
              marginRight: 5,
            }}>
            {`${changePoints} (${changePercent}%)`}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '900',
              fontFamily: 'Inter-Regular',
              color: '#FFF',
              marginBottom: 5,
            }}>
            {symbol?.slice(0, 6)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  fontFamily: 'Inter-Regular',
                  color: bidColor,
                  textAlign: 'left',
                }}>
                {bidSymbol} {bid?.slice(0, 7)}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: 20,
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  fontFamily: 'Inter-Regular',
                  color: askColor,
                  textAlign: 'left',
                }}>
                {askSymbol} {ask?.slice(0, 7)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1a1a1a" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 20,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Entypo name="menu" color={'#fff'} size={30} />
          <Text
            style={{
              fontSize: 18,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              marginLeft: 10,
            }}>
            Quotes
          </Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 10,
          }}>
          <FontAwesome name="refresh" color={'#fff'} size={30} onPress={() => webViewRef.current.reload()} />
          <Entypo name="plus" color={'#fff'} size={35} onPress={() => navigation.navigate('AddSymbols')} />
          <FontAwesome
            name="pencil"
            color={'#fff'}
            size={30}
            // style={{marginLeft: 20}}
            onPress={() => navigation.navigate('SelectedSymbols')}
          />
        </View>
      </View>

      <WebView
        style={{flex: 1}}
        ref={webViewRef}
        source={{
          html: getWebviewContent(),
        }}
        injectedJavaScriptObject={{
          token: Token,
          baseUrl: BASEURL,
        }}
        onMessage={onMessageReceived}
      />
      {bottomSheet === true ? (
        <BottomSheet
          onClose={() => setBottomSheets(false)}
          enablePanDownToClose={true}
          style={{backgroundColor: '#1a1a1a'}}
          ref={sheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChange}>
          <BottomSheetScrollView style={{backgroundColor: '#1a1a1a', flex: 1, padding: scale(20)}}>
            <Text
              style={{
                fontSize: scale(20),
                fontWeight: '800',
                fontFamily: 'Inter-Regular',
                color: '#fff',
                textAlign: 'center',
                marginBottom: scale(20),
              }}>
              {bottomSheetItem?.symbol}
            </Text>
            <TouchableOpacity
              onPress={() => {
                // setorderBottomSheet(true);
                navigation.navigate('OrderCreate', {
                  key: 'New',
                  symbol: {
                    symbol: bottomSheetItem?.symbol,
                    description: bottomSheetItem?.description,
                  },
                });
                setBottomSheets(false);
              }}
              style={{padding: scale(10)}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  fontFamily: 'Inter-Regular',
                  color: '#fff',
                  textAlign: 'left',
                }}>
                New Order
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => {
              //   setBottomSheets(false);
              //   // socket.disconnect();
              //   setChartBottomSheet(true);
              // }}
              onPress={() => {
                setBottomSheets(false);
                //  navigation.navigate('Meal',{})
                // console.log(bottomSheetItem, ' <- bottom');
                navigation.navigate('Chart', {
                  symbol: {
                    name: bottomSheetItem?.symbol,
                    description: bottomSheetItem?.description,
                  },
                });
              }}
              style={{padding: scale(10)}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  fontFamily: 'Inter-Regular',
                  color: '#fff',
                  textAlign: 'left',
                }}>
                Chart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Properties', {
                  // data: bottomSheetItem?.symbol?.slice(0, 6),
                  symbol: bottomSheetItem?.symbol,
                });
                setBottomSheets(false);
              }}
              style={{padding: scale(10)}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  fontFamily: 'Inter-Regular',
                  color: '#fff',
                  textAlign: 'left',
                }}>
                {/* Properties */}
                Specification
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DepthOfMarket', {
                  data: bottomSheetItem?.symbol?.slice(0, 6),
                });
                setBottomSheets(false);
              }}
              style={{padding: scale(10)}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  fontFamily: 'Inter-Regular',
                  color: '#fff',
                  textAlign: 'left',
                }}>
                Depth Of Market
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('MarketStatic', {
                //   data: bottomSheetItem?.symbol,
                // });
                setBottomSheets(false);
              }}
              style={{padding: scale(10)}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  fontFamily: 'Inter-Regular',
                  color: '#fff',
                  textAlign: 'left',
                }}>
                Hide
              </Text>
            </TouchableOpacity>
          </BottomSheetScrollView>
        </BottomSheet>
      ) : null}

      {orderBottomSheet === true ? (
        <BottomSheet
          onClose={() => setorderBottomSheet(false)}
          enablePanDownToClose={true}
          style={{backgroundColor: '#1a1a1a'}}
          ref={OrdersheetRef}
          snapPoints={OrdersnapPoints}
          onChange={handleSheetChange}>
          <BottomSheetScrollView
            contentContainerStyle={{paddingBottom: scale(40)}}
            style={{backgroundColor: '#1a1a1a', flex: 1, padding: scale(20)}}>
            <Text
              style={{
                fontSize: scale(20),
                fontWeight: '800',
                fontFamily: 'Inter-Regular',
                color: '#fff',
                textAlign: 'center',
                marginBottom: scale(20),
              }}>
              {bottomSheetItem?.symbol?.slice(0, 6)}
            </Text>
            <Dropdown
              itemTextStyle={{color: '#000'}}
              selectedTextStyle={{color: '#fff'}}
              placeholderTextColor={'#fff'}
              style={[styles.dropdown]}
              placeholderStyle={{fontSize: 16, color: '#fff'}}
              data={orderBottomSheetActions}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Choose Execution Type'}
              value={orderAction}
              onFocus={() => setIsFocusHeight(true)}
              onBlur={() => setIsFocusHeight(false)}
              onChange={item => setOrderAction(item.value)}
            />
            <View
              style={{
                marginTop: scale(15),
              }}>
              <Text
                style={{
                  fontSize: scale(12),
                  fontWeight: '800',
                  fontFamily: 'Inter-Regular',
                  color: '#fff',
                }}>
                Volume
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={e => setVolums(e)}
                value={volums}
                keyboardType="numeric"
                placeholder="Quantity..."
                placeholderTextColor={'#ccc'}
              />
            </View>
            <View
              style={{
                marginTop: scale(15),
              }}>
              <Text
                style={{
                  fontSize: scale(12),
                  fontWeight: '800',
                  fontFamily: 'Inter-Regular',
                  color: '#fff',
                }}>
                Price
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={e => setOrderPrice(e)}
                value={orderPrice}
                keyboardType="numeric"
                placeholder="Amount..."
                placeholderTextColor={'#ccc'}
              />
            </View>

            {orderAction >= 6 && (
              <View
                style={{
                  marginTop: scale(15),
                }}>
                <Text
                  style={{
                    fontSize: scale(12),
                    fontWeight: '800',
                    fontFamily: 'Inter-Regular',
                    color: '#fff',
                  }}>
                  Limit
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={e => setLimit(e)}
                  value={limit}
                  keyboardType="numeric"
                  placeholder="Limit..."
                  placeholderTextColor={'#ccc'}
                />
              </View>
            )}
            <View
              style={{
                marginTop: scale(15),
              }}>
              <Text
                style={{
                  fontSize: scale(12),
                  fontWeight: '800',
                  fontFamily: 'Inter-Regular',
                  color: '#fff',
                }}>
                Stop Loss
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={e => setStopLoss(e)}
                value={stopLoss}
                keyboardType="numeric"
                placeholder="Stop Loss..."
                placeholderTextColor={'#ccc'}
              />
            </View>
            <View
              style={{
                marginTop: scale(15),
              }}>
              <Text
                style={{
                  fontSize: scale(12),
                  fontWeight: '800',
                  fontFamily: 'Inter-Regular',
                  color: '#fff',
                }}>
                Take Profit
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={e => setTakeProfit(e)}
                value={takeProfit}
                keyboardType="numeric"
                placeholder="Take Profit..."
                placeholderTextColor={'#ccc'}
              />
            </View>
            {orderAction >= 3 && (
              <Dropdown
                itemTextStyle={{color: '#000'}}
                selectedTextStyle={{color: '#fff'}}
                placeholderTextColor={'#fff'}
                style={[
                  styles.dropdown,
                  {
                    marginTop: 20,
                  },
                ]}
                placeholderStyle={{fontSize: 16, color: '#fff'}}
                data={orderBottomSheet_ExpirationActions}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Expiration'}
                value={orderExpiration}
                onFocus={() => setIsFocusHeight(true)}
                onBlur={() => setIsFocusHeight(false)}
                onChange={item => setOrderExpiration(item.value)}
              />
            )}

            <View
              style={{
                justifyContent: 'Center',
                alignItems: 'center',
                marginTop: scale(60),
              }}>
              <TouchableOpacity
                onPress={() => {
                  // handelPlaceOrder('1');
                  handlePlaceOrder();
                }}
                style={{
                  backgroundColor: '#0388fc',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '45%',
                  height: scale(40),
                  opacity: volums === '' ? 0.6 : 1,
                }}>
                <Text
                  style={{
                    fontSize: scale(12),
                    fontWeight: '800',
                    fontFamily: 'Inter-Regular',
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                  Place Order
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      ) : null}

      {ChartBottomSheet === true ? (
        <BottomSheet
          onClose={() => setChartBottomSheet(false)}
          enablePanDownToClose={true}
          style={{backgroundColor: '#1a1a1a'}}
          ref={ChartsheetRef}
          snapPoints={OrdersnapPoints}
          onChange={handleSheetChange}>
          <BottomSheetScrollView
            contentContainerStyle={{paddingBottom: scale(100)}}
            style={{backgroundColor: '#1a1a1a', flex: 1, padding: scale(20)}}>
            <Text
              style={{
                fontSize: scale(20),
                fontWeight: '800',
                fontFamily: 'Inter-Regular',
                color: '#fff',
                textAlign: 'center',
                marginBottom: scale(20),
              }}>
              {bottomSheetItem?.symbol}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: '900',
                  fontFamily: 'Inter-Bold',
                  marginLeft: 20,
                }}>
                Watchlist
              </Text>
              <Dropdown
                itemTextStyle={{color: '#000'}}
                selectedTextStyle={{color: '#000'}}
                placeholderTextColor={'#000'}
                style={{
                  height: 50,
                  borderColor: 'gray',
                  borderWidth: 0.5,
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  marginBottom: 10,
                  width: '50%',
                  backgroundColor: '#fff',
                }}
                placeholderStyle={{fontSize: 16, color: '#000'}}
                data={HeightDatas}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Select'}
                value={heightvalues}
                onFocus={() => setIsFocusHeights(true)}
                onBlur={() => setIsFocusHeights(false)}
                onChange={item => {
                  setHeightValues(item.value);
                  GetAllOrderDetailsSec(item.value);
                }}
              />
            </View>
            <View
              style={{
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (volum !== '') {
                    UpdateGeneral('0');
                  }
                }}
                style={{
                  backgroundColor: '#FC375A',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '30%',
                  height: scale(40),
                  opacity: volum === '' ? 0.6 : 1,
                }}>
                <Text
                  style={{
                    fontSize: scale(14),
                    fontWeight: '800',
                    fontFamily: 'Inter-Regular',
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                  {messages[0]?.newMessage?.bid}
                </Text>
              </TouchableOpacity>
              <TextInput
                style={{
                  height: 40,
                  margin: 12,
                  borderWidth: 1,
                  padding: 10,
                  color: '#fff',
                  borderColor: '#fff',
                  width: '30%',
                  fontSize: scale(10),
                  borderRadius: scale(7),
                }}
                onChangeText={e => setVolum(e)}
                value={volum}
                keyboardType="numeric"
                placeholder="Quantity..."
                placeholderTextColor={'#ccc'}
              />
              <TouchableOpacity
                onPress={() => {
                  if (volum !== '') {
                    UpdateGeneral('1');
                  }
                }}
                style={{
                  backgroundColor: '#0388fc',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '30%',
                  height: scale(40),
                  opacity: volum === '' ? 0.6 : 1,
                }}>
                <Text
                  style={{
                    fontSize: scale(12),
                    fontWeight: '800',
                    fontFamily: 'Inter-Regular',
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                  {messages[0]?.newMessage?.ask}
                </Text>
              </TouchableOpacity>
            </View>
            {heightvalues !== null ? (
              <View>
                <CandlestickChart.Provider data={[...data, chartSockData]}>
                  <CandlestickChart>
                    <CandlestickChart.Candles />
                    <CandlestickChart.Crosshair>
                      <CandlestickChart.Tooltip />
                    </CandlestickChart.Crosshair>
                  </CandlestickChart>

                  <CandlestickChart.PriceText
                    precision={4}
                    style={{color: '#fff', alignSelf: 'center', marginTop: -10}}
                    type="open"
                  />
                  <CandlestickChart.PriceText
                    style={{
                      color: '#0388fc',
                      alignSelf: 'center',
                      marginTop: -10,
                    }}
                    type="high"
                  />
                  <CandlestickChart.PriceText style={{color: 'red', alignSelf: 'center', marginTop: -10}} type="low" />
                  <CandlestickChart.PriceText
                    style={{
                      color: '#6d6d6e',
                      alignSelf: 'center',
                      marginTop: -10,
                    }}
                    type="close"
                  />
                  <CandlestickChart.DatetimeText
                    options={{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                    }}
                    style={{color: '#fff', alignSelf: 'center'}}
                    locale="en-AU"
                  />
                </CandlestickChart.Provider>
              </View>
            ) : null}
          </BottomSheetScrollView>
        </BottomSheet>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#1a1a1a',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor: '#000',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    color: '#fff',
    borderColor: '#fff',
    width: '100%',
    fontSize: scale(10),
    borderRadius: scale(7),
    marginTop: scale(2),
  },
});

export default MainQuots;
