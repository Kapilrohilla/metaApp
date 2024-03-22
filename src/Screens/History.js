/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useMemo, useCallback, useContext, createContext} from 'react';
import {StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import {Menu, Modal, Portal, Button} from 'react-native-paper';
// import Octicons from 'react-native-vector-icons/Octicons';
import {scale} from '../utils/overAllNormalization';
// import {Image} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import {AuthContext} from '../Navigation/AuthProvider';
import axios from 'react-native-axios';
import store from '../../ReduxToolkit/store';
import HistoryCard from '../components/HistoryCard';
// import {BASEURL} from '@env';
import Header from './History/Header';
import {useDispatch, useSelector} from 'react-redux';
import {populatePositionHistory} from '../../ReduxToolkit/slices/historyPositionSlice';
import {changeType} from '../../ReduxToolkit/slices/HistoryTypeSlice';
import {HistoryContext} from '../Navigation/HistoryProvider';
import {populateOrderHistory} from '../../ReduxToolkit/slices/historyOrderSlice';
import {populateDealHistory} from '../../ReduxToolkit/slices/historyDealSlice';
// import HistoryDealSlice from '../../ReduxToolkit/slices/historyDealSlice';

// const HistoryContext = createContext();

const History = () => {
  const BASEURL = useSelector(state => state.baseUrl);
  const [calendar, setCalendar] = useState(false);
  const [modalDate, setModalDate] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFiltereData] = useState(null);
  const [loading, setLoading] = useState(false);
  const {Token} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const balance = Number(Number(store.getState().user?.balance).toFixed(2));
  const userCreatedDate = store.getState().user?.createdAt;
  const dispatch = useDispatch();
  const selectedTab = useSelector(state => state.historyType);
  const formattedUserCreatedDate =
    userCreatedDate?.split('T')[0] + '   ' + userCreatedDate?.split('T')[1]?.split('.')[0];
  // const [dealData, setDealData] = useState([]);
  const {positionData, orderData, dealData} = useContext(HistoryContext);
  // const positionData = useSelector(state => state?.historyPosition);
  // sorting start
  // console.log(positionData, ', position data');
  // const handleCloseTimeSort = () => {
  //   const sortedData = positionData.sort((a, b) => {
  //     const time1 = new Date(a?.updatedAt).getTime();
  //     const time2 = new Date(b?.updatedAt).getTime();

  //     return closeTimeSort ? time1 - time2 : time2 - time1;
  //   });
  //   setPositionData(sortedData);
  //   setVisible(false);
  //   setcloseTimeSort(!closeTimeSort);
  // };
  // const handleProfitSort = () => {};
  // // sorting end
  /*
  const today = useMemo(() => moment().format('l'), []);
  const lastweek = useMemo(() => moment().subtract(7, 'days').format('l'), []);
  const lastMonth = useMemo(() => moment().subtract(1, 'month').calendar(), []);
  const last3Month = useMemo(() => moment().subtract(3, 'month').calendar(), []);
*/
  // time based filters top
  /*
  const todayFilter = () => {
    let filteredArray = [];
    for (let i = 0; i < positionData.length; i++) {
      if (
        new Date(positionData[i].createdAt).toDateString() ===
        new Date(today.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$1-$2')).toDateString()
      ) {
        // console.log('found');
        filteredArray.push(positionData[i]);
      } else {
        console.log('not found');
        console.log(new Date(positionData[i].createdAt).toDateString());
        console.log(new Date(today).toDateString());
      }
    }
    setCalendar(false);
    console.log(filteredArray);
    setFiltereData(filteredArray);
  };
  */
  /*
  const lastWeekFilter = useCallback(() => {
    let filterArray = [];
    const reFormattedLastWeek = lastweek.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$1-$2');

    let date2compare = new Date(reFormattedLastWeek).getTime();
    const orderDate = new Date(positionData[0]?.createdAt).getTime();
    for (let i = 0; i < positionData.length; i++) {
      if (orderDate > date2compare) {
        filterArray.push(positionData[i]);
      } else {
      }
    }
    // console.log(positionData.length);
    // console.log(filterArray.length);
    setCalendar(false);
    setFiltereData(filterArray);
  }, [positionData]);
*/
  /* const lastMonthFilter = useCallback(() => {
    let filter = [];
    const reFormattedLastMonth = lastMonth.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$1-$2');
    for (let i = 0; i < positionData.length; i++) {
      if (new Date(positionData[i].createdAt).getTime() > new Date(reFormattedLastMonth).getTime()) {
        filter.push(positionData[i]);
      }
    }
    setCalendar(false);
    setFiltereData(filter);
  }, []);
*/
  /*
  const last3MonthFilter = useCallback(() => {
    let filter = [];
    const reFormattedLast3Month = last3Month.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$1-$2');
    for (let i = 0; i < positionData.length; i++) {
      if (new Date(positionData[i].createdAt).getTime() > new Date(reFormattedLast3Month).getTime()) {
        filter.push(positionData[i]);
      }
    }
    setCalendar(false);
    setFiltereData(filter);
  }, []);
  */
  const customDateFilter = useCallback(() => {
    console.log(startDate);
    const initialDate = new Date(startDate).getTime();
    const finalDate = new Date(endDate).getTime();
    let filter = [];
    for (let i = 0; i < positionData.length; i++) {
      if (
        new Date(positionData[i]?.createdAt).getTime() >= new Date(initialDate).getTime() &&
        new Date(positionData[i]?.createdAt).getTime() <= new Date(finalDate).getTime()
      ) {
        filter.push(positionData[i]);
      }
    }
    console.log(filter);
  }, []);
  // time based filter end

  let profit = 0,
    deposit = 100000,
    swap = 0,
    commission = 0;
  if (selectedTab === 1 || selectedTab == 3) {
    {
      for (let i = 0; i < positionData?.length; i++) {
        // console.log(Number(positionData[i]?.profit));
        profit += Number(positionData[i]?.profit);
        swap = Number(positionData[i]?.swap);
        commission = Number(positionData[i]?.comission);
      }
      profit = profit.toFixed(2);
      swap.toFixed(2);
      commission.toFixed(2);
      deposit.toFixed(2);
    }
  }
  let filled = 0,
    canceled = 0,
    total = 0;
  if (selectedTab === 2) {
    total = positionData?.length;
    for (let i = 0; i < positionData?.length; i++) {
      if (!positionData[i]?.status) {
        canceled++;
      }
    }
    filled = total - canceled;
  }
  const GetPositionDetails = useCallback(() => {
    setLoading(true);
    const apiUrl = `${BASEURL}/get-closed-positions`;
    try {
      axios
        .get(apiUrl, {
          headers: {
            Authorization: Token,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          if (response?.status === 200) {
            const res = response?.data;
            // console.log('response: while fetchin hisotry/position data ', res);
            // setPositionData(res);
            dispatch(populatePositionHistory(res));
            setLoading(false);
          }
        });
    } catch (error) {
      console.log(error, 'error while fetching position data in history');
      setLoading(false);
    }
  }, [selectedTab]);
  const GetOrderDetail = () => {
    // setLoading(true);
    try {
      axios
        .get(`${BASEURL}/get-user-orders`, {
          headers: {
            Authorization: Token,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          // setOrderData(response.data);
          dispatch(populateOrderHistory(response?.data));
          // console.log(response.data);
          // setLoading(false);
        });
    } catch (error) {
      console.log(error, 'error');
      // setLoading(false);
    }
  };
  const GetDealDetail = () => {
    // setLoading(true);
    try {
      axios
        .get(`${BASEURL}/get-user-deals`, {
          headers: {
            Authorization: Token,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          // setDealData(response.data);
          dispatch(populateDealHistory(response.data));
          // setLoading(false);
        });
    } catch (error) {
      console.log(error, 'error');
      // setLoading(false);
    }
  };
  useEffect(() => {
    if (isFocused) {
      if (selectedTab === 1) {
        GetPositionDetails();
      } else if (selectedTab === 2) {
        GetOrderDetail();
      } else if (selectedTab === 3) {
        GetDealDetail();
      }
    }
  }, [isFocused, selectedTab]);
  const handleDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null); // Reset end date when selecting a new start date
    }
  };

  return (
    // <HistoryContext.Provider value={positionData}>
    <View style={styles.container}>
      <StatusBar backgroundColor="#1a1a1a" />
      <Header />
      {/* tabs start */}
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginBottom: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            // setSelect(1);
            dispatch(changeType(1));
            setFiltereData(null);
          }}
          style={{
            borderBottomWidth: selectedTab === 1 ? 1 : 0,
            borderBottomColor: '#0388fc',
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              fontSize: 12,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              paddingBottom: 10,
            }}>
            POSITION
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // setSelect(2);
            dispatch(changeType(2));
            setFiltereData(null);
          }}
          style={{
            borderBottomWidth: selectedTab === 2 ? 1 : 0,
            borderBottomColor: '#0388fc',
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              fontSize: 12,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              paddingBottom: 10,
            }}>
            ORDERS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // setSelect(3);
            dispatch(changeType(3));
            setFiltereData(null);
          }}
          style={{
            borderBottomWidth: selectedTab === 3 ? 1 : 0,
            borderBottomColor: '#0388fc',
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              fontSize: 12,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              paddingBottom: 10,
            }}>
            DEALS
          </Text>
        </TouchableOpacity>
      </View>
      {/* tabs end */}
      <></>
      {selectedTab === 1 ? (
        <>
          <View style={{paddingBottom: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', fontWeight: '500'}}>Profit: </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: '#ccc',
                  width: '50%',
                }}></View>
              <Text style={{color: '#fff'}}>{profit}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', fontWeight: '500'}}>Deposit: </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: '#ccc',
                  width: '50%',
                }}></View>
              <Text style={{color: '#fff'}}>{deposit}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', fontWeight: '500'}}>Swap: </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: '#ccc',
                  width: '50%',
                }}></View>
              <Text style={{color: '#fff'}}>{swap}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', fontWeight: '500'}}>Commission: </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: '#ccc',
                  width: '50%',
                }}></View>
              <Text style={{color: '#fff'}}>{commission}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', fontWeight: '500'}}>Balance: </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: '#ccc',
                  width: '50%',
                }}></View>
              <Text style={{color: '#fff'}}>{balance}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                borderTopWidth: 1,
                borderColor: '#808080',
                marginTop: 10,
                paddingVertical: 3,
              }}>
              <Text style={{color: '#fff', fontWeight: '500', fontSize: 16}}>Balance:</Text>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={{fontSize: 11, color: '#ccc'}}>{formattedUserCreatedDate}</Text>
                <Text style={{color: '#4687d8', fontWeight: '600', fontSize: 12}}>{balance}</Text>
              </View>
            </View>
          </View>
          <FlatList
            data={positionData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => <HistoryCard data={item} type={'positions'} />}
          />
        </>
      ) : null}

      {selectedTab === 2 ? (
        <>
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
                Filled:
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
                {filled}
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
                Canceled:
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
                {canceled}
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
                Total:
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
                {total}
              </Text>
            </View>
          </>
          <View
            style={{
              borderBottomWidth: 1,
              borderStyle: 'solid',
              borderColor: '#525150',
              width: '150%',
              paddingHorizontal: -20,
              alignSelf: 'center',
              marginTop: 15,
            }}></View>
          <FlatList
            data={orderData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => <HistoryCard type="orders" data={item} />}
          />
        </>
      ) : null}
      {selectedTab === 3 ? (
        <>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', fontWeight: '500'}}>Profit: </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: '#ccc',
                  width: '50%',
                }}></View>
              <Text style={{color: '#fff'}}>{profit}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', fontWeight: '500'}}>Deposit: </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: '#ccc',
                  width: '50%',
                }}></View>
              <Text style={{color: '#fff'}}>{deposit}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', fontWeight: '500'}}>Swap: </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: '#ccc',
                  width: '50%',
                }}></View>
              <Text style={{color: '#fff'}}>{swap}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', fontWeight: '500'}}>Commission: </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: '#ccc',
                  width: '50%',
                }}></View>
              <Text style={{color: '#fff'}}>{commission}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', fontWeight: '500'}}>Balance: </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: '#ccc',
                  width: '50%',
                }}></View>
              <Text style={{color: '#fff'}}>{balance}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              borderTopWidth: 1,
              borderColor: '#808080',
              marginTop: 10,
              paddingVertical: 3,
            }}>
            <Text style={{color: '#fff', fontWeight: '500', fontSize: 16}}>Balance:</Text>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={{fontSize: 11, color: '#ccc'}}>{formattedUserCreatedDate}</Text>
              <Text style={{color: '#4687d8', fontWeight: '600', fontSize: 12}}>{balance}</Text>
            </View>
          </View>
          <FlatList
            data={dealData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => <HistoryCard type="deals" data={item} />}
          />
        </>
      ) : null}
      <Portal>
        <Modal visible={modalDate} onDismiss={() => setModalDate(false)} contentContainerStyle={containerStyle}>
          <View>
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={true}
              selectedStartDate={startDate}
              selectedEndDate={endDate}
              onDateChange={handleDateChange}
              todayBackgroundColor="#3F0280"
              selectedDayColor="#7300e6"
              selectedDayTextColor="#FFFFFF"
              textStyle={{
                color: '#fff',
              }}
              headingStyle={{
                color: '#fff',
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingTop: scale(10),
              }}>
              <Button onPress={() => setModalDate(false)} textColor="#ffffff">
                Cancel
              </Button>
              <Button
                onPress={() => {
                  customDateFilter();
                  setModalDate(false);
                }}
                textColor="#ffffff">
                Ok
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
    // </HistoryContext.Provider>
  );
};
const containerStyle = {backgroundColor: '#1a1a1a', padding: 20};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
  },
});

export default History;
