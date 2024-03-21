import {useNavigation, DrawerActions} from '@react-navigation/native';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import {Menu} from 'react-native-paper';
import {useContext, useEffect, useState} from 'react';
import store from '../../../ReduxToolkit/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';

// import {BASEURL} from '@env';
import Snackbar from 'react-native-snackbar';
import {AuthContext} from '../../Navigation/AuthProvider';
import {useSelector} from 'react-redux';
export default function AccountSetup() {
  const navigation = useNavigation();
  const [openMenu, setOpenMenu] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const user = store?.getState()?.user;
  useEffect(() => {
    let accountkeys = [];
    AsyncStorage.getAllKeys().then(r => {
      console.log(r);
      accountkeys = r.filter(key => {
        return key !== 'userToken' && key !== 'loggedIn' && key !== 'baseUrl';
      });
      AsyncStorage.multiGet(accountkeys)
        .then(account => {
          const acc = account
            .filter(a => a !== 'baseUrl')
            .map(a => {
              return JSON.parse(a[1]);
            });
          setAccounts(acc);
        })
        .catch(err => {
          console.error(err?.message);
        });
    });
  }, []);
  return (
    <View style={{backgroundColor: '#0f1821', flex: 1}}>
      <View style={styles.topBar}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <MaterialIcon name="arrow-back" size={25} color="#fff" />
            <Text
              style={{
                fontSize: 18,
                color: '#fff',
                fontFamily: 'Inter-SemiBold',
                fontWeight: '600',
                marginLeft: 10,
              }}>
              Accounts
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', gap: 15}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('accountBroker');
            }}>
            <Entypo name="plus" size={25} color="#fff" />
          </TouchableOpacity>
          <Menu
            visible={openMenu}
            style={{}}
            onDismiss={() => setOpenMenu(false)}
            anchor={
              <TouchableOpacity onPress={() => setOpenMenu(true)}>
                <MaterialIcon name="more-vert" size={25} color={'#fff'} />
              </TouchableOpacity>
            }>
            <Menu.Item
              title="Change password"
              style={{}}
              onPress={() => {
                navigation.navigate('ChangePswd');
                setOpenMenu(false);
              }}
            />
          </Menu>
        </View>
      </View>
      <ScrollView style={{marginTop: 10}}>
        {accounts.map((account, index) => {
          if (account?.userId === user?.email) {
            return <AccountCard />;
          }
          function handleRemoveAccount() {
            const accountAfterDeletion = accounts.filter(acc => {
              return account?.userId !== acc?.userId;
            });
            setAccounts(accountAfterDeletion);
          }
          return (
            <>
              {/* <AccountCard /> */}
              <AccountCardSmall accountCredential={account} key={index} handleRemoveAccount={handleRemoveAccount} />
            </>
          );
        })}
      </ScrollView>
    </View>
  );
}

const AccountCard = () => {
  const {name, email, balance, address, city, country} = store.getState().user;
  const user = store.getState().user;
  const width = Dimensions.get('screen').width;
  return (
    <View
      style={{
        backgroundColor: '#293543',
        height: 250,
        width: width - 20,
        marginHorizontal: 10,
        marginTop: 10,
      }}>
      <Image
        source={require('../../assets/demo.png')}
        style={{
          height: 50,
          width: 120,
          position: 'absolute',
          left: -40,
          top: -5,
        }}
        resizeMode="contain"
      />
      <View style={{marginTop: 30, alignItems: 'center'}}>
        <IonicIcons name="person" size={50} color={'#fff'} />
        <Text
          style={{
            color: '#4e80c1',
            fontSize: 14,
            fontWeight: 600,
            marginTop: 25,
          }}>
          Id: {email}
        </Text>
        <Text
          style={{
            fontSize: 18,
            paddingHorizontal: 60,
            textAlign: 'center',
            marginTop: 20,
          }}>
          Name: {name || 'Demo'}
        </Text>
        <Text
          style={{
            color: '#fff',
            fontWeight: '600',
            fontSize: 18,
            marginTop: 15,
          }}>
          Balance {Number(balance).toFixed(3)}
        </Text>
        <View></View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}></View>
    </View>
  );
};

const AccountCardSmall = ({accountCredential, handleRemoveAccount}) => {
  const width = Dimensions.get('screen').width;
  const BASEURL = useSelector(state => state.baseUrl);
  const navigation = useNavigation();
  const [openMenu, setOpenMenu] = useState(false);
  const {setToken} = useContext(AuthContext);
  const userId = accountCredential?.userId;
  const password = accountCredential?.password;
  return (
    <TouchableOpacity
      onPress={() => {
        const apiUrl = BASEURL;
        const snackbarOptions = {
          textColor: 'green',
          numberOfLines: 1,
          backgroundColor: '#fff',
        };
        axios
          .post(
            `${apiUrl}/login`,
            JSON.stringify({
              email: userId,
              password: password,
            }),
            {headers: {'Content-Type': 'application/json'}},
          )
          .then(response => {
            console.log(response?.data, '/SignIn');
            if (response?.data?.status) {
              AsyncStorage.setItem('userToken', response?.data?.token);
              setToken(response?.data?.token);
              Snackbar.show({
                text: `${response?.data?.message}`,
                ...snackbarOptions,
              });
              navigation.reset({
                index: 0,
                routes: [{name: 'Drawer'}],
              });
            } else {
              const snackbarOptions = {
                textColor: 'red',
                numberOfLines: 1,
                backgroundColor: '#fff',
              };
              Snackbar.show({
                text: `${response?.data?.message}`,
                ...snackbarOptions,
              });
            }
          })
          .catch(error => {
            // Handle error
            console.log('Error occurred: ');
            console.log(error);
          });
      }}
      style={{
        backgroundColor: '#293543',
        height: 100,
        width: width - 20,
        marginHorizontal: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}>
      <Image
        source={require('../../assets/demo.png')}
        style={{
          height: 35,
          width: 60,
          position: 'absolute',
          left: -17,
          top: -5,
        }}
        resizeMode="contain"
      />
      <IonicIcons name="person" size={25} color={'#fff'} />
      <Text>#{accountCredential?.userId}</Text>
      <Menu
        visible={openMenu}
        onDismiss={() => setOpenMenu(false)}
        anchor={
          <TouchableOpacity onPress={() => setOpenMenu(true)}>
            <IonicIcons name="menu" size={25} color="#fff" />
          </TouchableOpacity>
        }>
        <Menu.Item
          onPress={() => {
            AsyncStorage.getAllKeys().then(keys => {
              const filteredKeys = keys?.filter(key => {
                return key !== 'userToken' && key !== 'loggedIn' && key !== 'baseUrl';
              });
              for (let key of filteredKeys) {
                AsyncStorage.getItem(key)
                  .then(keyData => {
                    keyData = JSON.parse(keyData);
                    if (keyData?.userId === userId) {
                      AsyncStorage.removeItem(key)
                        .then(r => {
                          handleRemoveAccount();
                          Snackbar.show({
                            text: 'Account delete successfully',
                            textColor: 'green',
                            backgroundColor: '#ccc',
                          });
                        })
                        .catch(err => {
                          Snackbar.show({
                            text: err?.message,
                            textColor: 'red',
                            backgroundColor: '#ccc',
                          });
                        });
                    }
                  })
                  .catch(err => {
                    Snackbar.show({
                      text: err?.message,
                      textColor: 'green',
                      backgroundColor: '#ccc',
                    });
                  });
              }
            });
          }}
          title="Delete"
        />
      </Menu>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
});
