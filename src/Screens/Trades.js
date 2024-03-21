/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import {useIsFocused} from '@react-navigation/native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'react-native-axios';
import {scale} from '../utils/overAllNormalization';
import moment from 'moment';
import {AuthContext} from '../Navigation/AuthProvider';
import {Actionsheet, useDisclose, Box} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import {Menu, Divider} from 'react-native-paper';
import {io} from 'socket.io-client';
import store from '../../ReduxToolkit/store';
import {useSelector} from 'react-redux';
// import {BASEURL} from '@env';

function getDigit(symbol) {
  const watchlistData = store.getState().watchlist;
  for (let i = 0; i < watchlistData.length; i++) {
    if (symbol === watchlistData[i].symbol) {
      return watchlistData[i].digits;
    }
  }
}

const Trades = () => {
  const BASEURL = useSelector(state => state.baseUrl);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const {Token} = useContext(AuthContext);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [selectData, setSelectData] = useState({});
  const [visible, setVisible] = React.useState(false);
  const [bulkOperations, setBulkOperations] = useState(false);
  const [socketData, setSocketData] = useState([]);
  const [toggleTime, setToggleTime] = useState(false);
  const [toggleSymbol, setToggleSymbol] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  // watchlist data from store
  // const watchlistData = store.getState().watchlist;
  // console.log(watchlistData, '  watchlistData ');
  const GetAllOrderDetailsFirst = useCallback(() => {
    try {
      axios
        .get(`${BASEURL}/get-positions`, {
          headers: {
            Authorization: Token,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          if (response?.status === 200) {
            console.log(response.data);
            const res = response?.data?.positions;
            // console.log(response?.data, '<-- response');
            res.forEach(item => (item.isActive = false));
            setData(response?.data?.positions?.reverse());
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleIsExpanded = useCallback(
    item => {
      const dataFaq = [...data];
      dataFaq.forEach(itm => {
        itm.isActive = itm._id === item?._id;
      });
      setData(dataFaq);
    },
    [data],
  );

  useEffect(() => {
    if (isFocused) {
      const timer = setTimeout(() => {
        GetAllOrderDetailsFirst();
        // fetchUserDetails();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isFocused]);

  const socketEffectFunction = useCallback(() => {
    if (isFocused) {
      const socket = io('http://65.0.59.137:9000');
      socket.on('newMessage', data => {
        const newMessage = JSON.parse(data?.newMessage);
        setSocketData(newMessage);
      });
      return () => {
        socket.off('newMessage');
        socket.disconnect();
      };
    }
  }, [isFocused]);
  useEffect(socketEffectFunction, [isFocused]);

  const MemoizedItem = React.memo(({item}) => {
    const symbolSpecificSocketData = socketData.filter(
      data => data.symbol.split('.')[0] === item?.symbol,
    );
    const symbol = item?.symbol;
    let digit = useMemo(() => getDigit(symbol), []);
    const ask = Number(symbolSpecificSocketData[0]?.ask).toFixed(digit);
    const volume = item?.volume;
    const price = Number(item?.price).toFixed(digit);
    let profit =
      item?.type === 1
        ? (ask * volume * 100 - price * volume * 100).toFixed(digit)
        : (price * volume * 100 - ask * volume * 100).toFixed(digit);

    return (
      <>
        {item?.isActive ? (
          <TouchableOpacity
            onPress={() => handleIsExpanded()}
            onLongPress={() => {
              console.log('long pressed');
              setSelectData(item);
              onOpen();
            }}>
            <>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#525150',
                  width: '100%',
                  alignSelf: 'center',
                }}></View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: scale(14),
                        fontWeight: '600',
                        alignSelf: 'center',
                      }}>
                      {item?.symbol}
                    </Text>
                    <Text
                      style={{
                        color:
                          item?.type === 1 ||
                          item?.type === 2 ||
                          item?.type === 4 ||
                          item?.type === 6
                            ? '#48FF00'
                            : '#C10101CF',

                        fontSize: scale(12),
                        fontWeight: '600',
                        marginLeft: scale(5),
                        textAlignVertical: 'bottom',
                      }}>
                      {item?.type === 0
                        ? 'Sell'
                        : item?.type === 1
                        ? 'Buy'
                        : item?.type === 2
                        ? 'Buy Limit'
                        : item?.type === 3
                        ? 'Sell Limit'
                        : item?.type === 4
                        ? 'Buy stop'
                        : item?.type === 5
                        ? 'Sell stop'
                        : item?.type === 6
                        ? 'Buy Stop Limit'
                        : item?.type === 7
                        ? 'Sell Stop Limit'
                        : null}{' '}
                      {Number(item?.volume)}
                      {/* {Number(item?.volume).toFixed(5)} */}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#FFFFFF8E',
                      fontSize: scale(12),
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    {/* 1.1023 → 1.0748 */}
                    {price} →{' '}
                    {Number(symbolSpecificSocketData[0]?.ask).toFixed(digit)}
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: scale(14),
                    fontWeight: '500',
                    alignSelf: 'center',
                  }}>
                  {/* {item?.price} */}
                  {profit}
                </Text>
              </View>
            </>
            <>
              <Text
                style={{
                  color: '#FFFFFFB4',
                  fontSize: scale(12),
                  fontWeight: '500',
                  marginTop: scale(5),
                }}>
                {moment(item?.createdAt).format('LLL')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '49%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: scale(12),
                        fontWeight: '500',
                      }}>
                      S/L
                    </Text>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: scale(12),
                        fontWeight: '500',
                      }}>
                      - {Number(item.stopLoss).toFixed(digit)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: scale(12),
                        fontWeight: '500',
                      }}>
                      T/P
                    </Text>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: scale(12),
                        fontWeight: '500',
                      }}>
                      - {Number(item.takeProfit).toFixed(digit)}
                    </Text>
                  </View>
                </View>
                <View style={{width: '49%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: scale(12),
                        fontWeight: '500',
                      }}>
                      Swap
                    </Text>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: scale(12),
                        fontWeight: '500',
                      }}>
                      -
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: scale(12),
                      fontWeight: '500',
                      textAlign: 'right',
                    }}>
                    #{item?.ticket}
                  </Text>
                </View>
              </View>
            </>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              // console.log('btn pressed');
              handleIsExpanded(item);
            }}
            onLongPress={() => {
              console.log('long pressed');
              setSelectData(item);
              onOpen();
            }}>
            <>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#525150',
                  width: '100%',
                  alignSelf: 'center',
                }}></View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: scale(14),
                        fontWeight: '600',
                        alignSelf: 'center',
                      }}>
                      {symbol}
                    </Text>
                    <Text
                      style={{
                        color:
                          item?.type === 1 ||
                          item?.type === 2 ||
                          item?.type === 4 ||
                          item?.type === 6
                            ? '#48FF00'
                            : '#C10101CF',

                        fontSize: scale(12),
                        fontWeight: '600',
                        marginLeft: scale(5),
                        textAlignVertical: 'bottom',
                      }}>
                      {item?.type === 0
                        ? 'Sell'
                        : item?.type === 1
                        ? 'Buy'
                        : item?.type === 2
                        ? 'Buy Limit'
                        : item?.type === 3
                        ? 'Sell Limit'
                        : item?.type === 4
                        ? 'Buy stop'
                        : item?.type === 5
                        ? 'Sell stop'
                        : item?.type === 6
                        ? 'Buy Stop Limit'
                        : item?.type === 7
                        ? 'Sell Stop Limit'
                        : null}{' '}
                      {Number(item?.volume)}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#ffFFFF8E',
                      fontSize: scale(12),
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    {/* 1.1023 → 1.0748 */}
                    {Number(item.price).toFixed(digit)} →{' '}
                    {Number(symbolSpecificSocketData[0]?.ask).toFixed(digit)}
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: scale(14),
                    fontWeight: '500',
                    alignSelf: 'center',
                  }}>
                  {profit}
                </Text>
              </View>
            </>
          </TouchableOpacity>
        )}
      </>
    );
  });

  let profit = 0;
  for (let i = 0; i < data.length; i++) {
    const symbolSpecificSocketData = socketData.filter(singleSocketdata => {
      return singleSocketdata.symbol.split('.')[0] === data[i]?.symbol;
    });
    const ask = symbolSpecificSocketData[0]?.ask;
    const volume = data[i]?.volume;
    const price = data[i]?.price;
    let pro =
      data[i]?.type === 1
        ? Number((ask * volume * 100 - price * volume * 100).toFixed(2))
        : Number((price * volume * 100 - ask * volume * 100).toFixed(2));
    if (pro) {
      profit += pro;
    }
  }

  const handleSortByTime = useCallback(() => {
    const sorted = data.sort((first, second) => {
      const firstTime = new Date(first?.createdAt).getTime();
      const secondTime = new Date(second?.createdAt).getTime();
      return toggleTime ? firstTime - secondTime : secondTime - firstTime;
    });
    setToggleTime(!toggleTime);
    setData(sorted);
  }, [data, toggleTime]);

  const handleSortBySymbol = () => {
    const sorted = data.sort((first, second) => {
      const firstTime = first.symbol;
      const secondTime = second.symbol;

      return toggleSymbol
        ? firstTime.localeCompare(secondTime)
        : secondTime.localeCompare(firstTime);
    });
    setToggleSymbol(!toggleSymbol);
    setData(sorted);
  };
  const margin = useMemo(() => store.getState().user.margin, []);
  const balance = Number(Number(store.getState().user.balance).toFixed(5));
  const equity = balance + profit;
  const freeMargin = equity - margin;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1a1a1a" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
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
            Trade
          </Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity
                onPress={openMenu}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 20,
                  transform: [{rotate: `90deg`}],
                }}>
                <Octicons name="arrow-switch" color={'#fff'} size={scale(25)} />
              </TouchableOpacity>
            }>
            <Menu.Item onPress={() => {}} title="Order" />
            <Divider />
            <Menu.Item onPress={handleSortByTime} title="Time" />
            <Divider />
            <Menu.Item onPress={handleSortBySymbol} title="Symbol" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Profit" />
          </Menu>
          <AntDesign
            name="addfile"
            color={'#fff'}
            size={scale(25)}
            onPress={() => navigation.navigate('OrderCreate', {key: 'New'})}
          />
        </View>
      </View>
      <>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              marginLeft: 10,
            }}>
            Balance:
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderStyle: 'dashed',
              borderColor: '#ccc',
              width: '45%',
            }}></View>
          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              marginLeft: 10,
            }}>
            {balance.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              marginLeft: 10,
            }}>
            Equity:
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderStyle: 'dashed',
              borderColor: '#ccc',
              width: '45%',
            }}></View>
          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              marginLeft: 10,
            }}>
            {/* 0.00 */}
            {equity.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              marginLeft: 10,
            }}>
            Margin:
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderStyle: 'dashed',
              borderColor: '#ccc',
              width: '45%',
            }}></View>
          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              marginLeft: 10,
            }}>
            {/* 0.00 */}
            {margin.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              marginLeft: 10,
            }}>
            Free Margin:
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderStyle: 'dashed',
              borderColor: '#ccc',
              width: '40%',
            }}></View>
          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              marginLeft: 10,
            }}>
            {/* 0.00 */}
            {freeMargin.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              marginLeft: 10,
            }}>
            {`Margin Level (%):`}
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderStyle: 'dashed',
              borderColor: '#ccc',
              width: '40%',
            }}></View>
          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              marginLeft: 10,
            }}>
            0.00
          </Text>
        </View>
      </>
      {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <MemoizedItem item={item} index={index} />
          )}
        />
      ) : (
        <Text>Failed to fetch data</Text>
      )}

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content style={{backgroundColor: '#1a1a1a'}}>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 10,
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: scale(14),
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    {selectData?.symbol}
                  </Text>
                  <Text
                    style={{
                      color: selectData?.type === '1' ? '#48FF00' : '#C10101CF',
                      fontSize: scale(12),
                      fontWeight: '600',
                      marginLeft: scale(5),
                      textAlignVertical: 'bottom',
                    }}>
                    {selectData?.type === '1' ? 'Buy' : 'Sell'}{' '}
                    {selectData?.volume}
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#FFFFFF8E',
                    fontSize: scale(12),
                    fontWeight: '600',
                    alignSelf: 'center',
                  }}>
                  1.1023 → 1.0748
                </Text>
              </View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: scale(14),
                  fontWeight: '500',
                  alignSelf: 'center',
                }}>
                {selectData?.price}
              </Text>
            </View>
          </Box>
          <Actionsheet.Item
            onPress={() => {
              onClose();
              navigation.navigate('OrderCreate', {key: 'Close'});
            }}
            style={{
              backgroundColor: '#1a1a1a',
            }}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: scale(12),
                fontWeight: '600',
              }}>
              Close Position
            </Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              onClose();
              navigation.navigate('OrderCreate', {key: 'Modify'});
            }}
            style={{
              backgroundColor: '#1a1a1a',
            }}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: scale(12),
                fontWeight: '600',
              }}>
              Modify Position
            </Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            style={{
              backgroundColor: '#1a1a1a',
            }}
            onPress={() => {
              onClose();
              navigation.navigate('OrderCreate', {key: 'New'});
            }}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: scale(12),
                fontWeight: '600',
              }}>
              New Order
            </Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              onClose();
              navigation.navigate('Charts1');
            }}
            style={{
              backgroundColor: '#1a1a1a',
            }}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: scale(12),
                fontWeight: '600',
              }}>
              Chart
            </Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              onClose();
              setBulkOperations(true);
            }}
            style={{
              backgroundColor: '#1a1a1a',
            }}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: scale(12),
                fontWeight: '600',
              }}>
              {' '}
              Bulk Operations...
            </Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <Actionsheet
        isOpen={bulkOperations}
        onClose={() => {
          setBulkOperations(false);
        }}>
        <Actionsheet.Content style={{backgroundColor: '#1a1a1a'}}>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <View
              style={{
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  color: '#FFFFFFBB',
                  fontSize: scale(12),
                  fontWeight: '400',
                  textAlign: 'center',
                }}>
                #{selectData?.ticket}
                {selectData?.type === '1' ? 'Buy' : 'Sell'} {selectData?.volume}{' '}
                {selectData?.symbol} {selectData?.price}
              </Text>
            </View>
          </Box>
          <Actionsheet.Item
            onPress={() => {
              setBulkOperations(false);
            }}
            style={{
              backgroundColor: '#1a1a1a',
            }}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: scale(12),
                fontWeight: '600',
              }}>
              Close All Position
            </Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              setBulkOperations(false);
            }}
            style={{
              backgroundColor: '#1a1a1a',
            }}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: scale(12),
                fontWeight: '600',
              }}>
              Close Profitable Position
            </Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            style={{
              backgroundColor: '#1a1a1a',
            }}
            onPress={() => {
              setBulkOperations(false);
            }}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: scale(12),
                fontWeight: '600',
              }}>
              Close Buy Position
            </Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              setBulkOperations(false);
            }}
            style={{
              backgroundColor: '#1a1a1a',
            }}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: scale(12),
                fontWeight: '600',
              }}>
              Close USDJPY Position
            </Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              setBulkOperations(false);
            }}
            style={{
              backgroundColor: '#1a1a1a',
            }}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: scale(12),
                fontWeight: '600',
              }}>
              Close USDJPY Buy Position
            </Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
});

export default Trades;
