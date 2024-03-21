import React, {useRef, useState, useEffect, useMemo, useCallback} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useIsFocused} from '@react-navigation/native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';

const Setting = () => {
  const navigation = useNavigation();
  const [select, setSelect] = useState(true);
  const [select1, setSelect1] = useState(true);
  const [select2, setSelect2] = useState(false);
  const [select3, setSelect3] = useState(true);

  const createThreeButtonAlert = () =>
    Alert.alert(
      'MetaQuotes ID',
      'My ID : JCGBCJHX675GV , Use This ID to send Messages to this device Via notify service',
      [
        {
          text: 'COPY',
          onPress: () => console.log('Cancel Pressed'),
          style: 'OK',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
    );

  const createThreeButtonAlert1 = () =>
    Alert.alert('Vibration', 'Update Vibration Settings', [
      {
        text: 'Never',
        onPress: () => console.log('Ask me later pressed'),
      },
      {
        text: 'Only When Slient',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: '●  Always', onPress: () => console.log('OK Pressed')},
    ]);
  const createThreeButtonAlert12 = () =>
    Alert.alert(
      'Content auto-downloads',
      'Update Content auto-downloads Settings',
      [
        {
          text: 'Never',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Only When Slient',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: '●  Always', onPress: () => console.log('OK Pressed')},
      ],
    );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1a1a1a" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 20,
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
            Setting
          </Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}></View>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: '800',
              borderBottomWidth: 1,
              paddingBottom: 15,
              borderBottomColor: 'gray',
            }}>
            QUOTES
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: '600',
              paddingBottom: 5,
              marginTop: 10,
            }}>
            Advanced mode
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'gray',
                fontSize: 12,
                fontWeight: '800',
                paddingBottom: 5,
                width: '65%',
              }}>
              In the advanced mode, the quotes window contains spreades, time
              data, as well as High and Low price
            </Text>

            <FontAwesome
              name={select === true ? 'check-square-o' : 'square-o'}
              color={select === true ? '#0388fc' : '#fff'}
              size={30}
              onPress={() => setSelect(!select)}
            />
          </View>

          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: '600',
              paddingBottom: 5,
              marginTop: 10,
            }}>
            Order sounds
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'gray',
                fontSize: 12,
                fontWeight: '800',
                paddingBottom: 5,
                width: '65%',
              }}>
              Play order for sounds
            </Text>

            <FontAwesome
              name={select1 === true ? 'check-square-o' : 'square-o'}
              color={select1 === true ? '#0388fc' : '#fff'}
              size={30}
              onPress={() => setSelect1(!select1)}
            />
          </View>

          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: '600',
              paddingBottom: 5,
              marginTop: 10,
            }}>
            One Click Trading
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'gray',
                fontSize: 12,
                fontWeight: '800',
                paddingBottom: 5,
                width: '65%',
              }}>
              Allow Perfoming trade operations with a single tap without
              additional confirmation from the trader
            </Text>

            <FontAwesome
              name={select2 === true ? 'check-square-o' : 'square-o'}
              color={select2 === true ? '#0388fc' : '#fff'}
              size={30}
              onPress={() => setSelect2(!select2)}
            />
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: '800',
              borderBottomWidth: 1,
              paddingBottom: 15,
              borderBottomColor: 'gray',
            }}>
            MESSAGES
          </Text>
          <TouchableOpacity onPress={() => createThreeButtonAlert()}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: '600',
                paddingBottom: 5,
                marginTop: 10,
              }}>
              MetaQuotes ID
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 12,
                  fontWeight: '800',
                  paddingBottom: 5,
                  width: '65%',
                }}>
                JCGBCJHX675GV
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => createThreeButtonAlert1()}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: '600',
                paddingBottom: 5,
                marginTop: 10,
              }}>
              Vibration
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 12,
                  fontWeight: '800',
                  paddingBottom: 5,
                  width: '65%',
                }}>
                Always
              </Text>
            </View>
          </TouchableOpacity>

          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: '600',
              paddingBottom: 5,
              marginTop: 10,
            }}>
            Notification ringtone
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'gray',
                fontSize: 12,
                fontWeight: '800',
                paddingBottom: 5,
                width: '65%',
              }}>
              Default
            </Text>
          </View>
          <TouchableOpacity onPress={() => createThreeButtonAlert12()}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: '600',
                paddingBottom: 5,
                marginTop: 10,
              }}>
              Content auto-download
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 12,
                  fontWeight: '800',
                  paddingBottom: 5,
                  width: '65%',
                }}>
                Always
              </Text>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: '600',
              paddingBottom: 5,
              marginTop: 10,
            }}>
            Language
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'gray',
                fontSize: 12,
                fontWeight: '800',
                paddingBottom: 5,
                width: '65%',
              }}>
              System language
            </Text>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: '800',
              borderBottomWidth: 1,
              paddingBottom: 15,
              borderBottomColor: 'gray',
            }}>
            OTP
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SecurityPin')}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: '600',
                paddingBottom: 5,
                marginTop: 10,
              }}>
              OTP
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 12,
                  fontWeight: '800',
                  paddingBottom: 5,
                  width: '65%',
                }}>
                One time password
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: '800',
              borderBottomWidth: 1,
              paddingBottom: 15,
              borderBottomColor: 'gray',
            }}>
            NEWS
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: '600',
                paddingBottom: 5,
                marginTop: 10,
              }}>
              Enable News
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 12,
                  fontWeight: '800',
                  paddingBottom: 5,
                  width: '65%',
                }}>
                Receive news update
              </Text>
              <FontAwesome
                name={select3 === true ? 'check-square-o' : 'square-o'}
                color={select3 === true ? '#0388fc' : '#fff'}
                size={30}
                onPress={() => setSelect3(!select3)}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
  },
});

export default Setting;
