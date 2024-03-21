import {View, Text} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

export default function HistoryNew() {
  const BASEURL = useSelector(state => state.baseUrl);
  const {Token} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const balance = Number(Number(store.getState().user?.balance).toFixed(2));
  const userCreatedDate = store.getState().user?.createdAt;
  const dispatch = useDispatch();
  const selectedTab = useSelector(state => state.historyType);
  const [orderData, setOrderData] = useState([]);
  const [dealData, setDealData] = useState([]);
  return (
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
  );
}
