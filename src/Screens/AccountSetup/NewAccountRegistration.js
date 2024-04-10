import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dialog, Portal, Switch} from 'react-native-paper';
import {CommonActions, useNavigation} from '@react-navigation/native';
// import {BASEURL} from '@env';
import {AuthContext} from '../../Navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {updateBaseUrl} from '../../../ReduxToolkit/slices/baseUrl';
export default function NewAccountRegistration({route}) {
  let BASEURL = useSelector(state => state.baseUrl);
  const [accepted, setIsAccepted] = useState(false);
  BASEURL = route?.params?.ip;
  const navigation = useNavigation();
  const [selectedLeverage, setSelectedLeverage] = useState(null);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [selectedGroup, setSeletedGroup] = useState(null);
  const {setToken} = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  useEffect(() => {
    const apiUrl = `${BASEURL}/get-category-groups`;
    fetch(apiUrl)
      .then(r => r.json())
      .then(data => {
        const group = data?.message?.find(group => {
          return group?.Name === 'DemoGroup';
        });
        const groupInsideDemoGroup = group?.nestedSymbols?.map(group => {
          return {id: group?._id, name: group?.Name};
        });

        setGroups(groupInsideDemoGroup);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  let isEverythingOk = false;
  if (name && email && mobile && accepted) {
    isEverythingOk = true;
  }
  const dispatch = useDispatch();
  const handleRegister = () => {
    const requestPayload = JSON.stringify({
      name,
      userEmail: email,
      mobile,
      group: selectedGroup?.id,
      balance: selectedDeposit,
      leverage: selectedLeverage?.split(':')[1],
    });
    AsyncStorage.getAllKeys()
      .then(r => {
        let biggestUserKey = r
          .filter(key => {
            return key !== 'userToken' && key !== 'loggedIn' && key !== 'baseUrl';
          })
          .map(k => {
            return Number(k.replaceAll('user', ''));
          })
          .sort((a, b) => b - a)[0];
        if (Number.isNaN(biggestUserKey)) {
          biggestUserKey = 0;
        }
        const newUserKey = `user${biggestUserKey + 1}`;
        const apiUrl = `${BASEURL}/signup`;
        fetch(apiUrl, {
          method: 'POST',
          body: requestPayload,
        })
          .then(r => r.json())
          .then(r => {
            dispatch(updateBaseUrl(BASEURL));
            AsyncStorage.setItem('baseUrl', BASEURL);
            setToken(r?.token);
            AsyncStorage.setItem(
              newUserKey,
              JSON.stringify({
                userId: r?.user?.userId,
                password: r?.user?.password,
              }),
            )
              .then(r => {})
              .catch(er => console.error(er?.message));
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'NewAccountStart',
                    params: {
                      afterLogin: r?.user,
                      name: name,
                      email,
                      mobile,
                      balance: selectedDeposit,
                      server: route?.params?.title,
                    },
                  },
                ],
              }),
            );
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err.message);
      });
    return;
  };

  return (
    <View style={{backgroundColor: '#000', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomColor: '#E9E9E977',
          borderBottomWidth: 1.5,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={30} color="#3378C2" style={{paddingHorizontal: 10, paddingVertical: 10}} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: '#fff',
          }}>
          {/* {'SkyCap Market Ltd.'} */}
          {route?.params?.title}
        </Text>
        <View></View>
      </View>
      <ScrollView>
        <View style={[styles.bb, {paddingHorizontal: 15}]}>
          <Text
            style={{
              textTransform: 'uppercase',
              paddingTop: 30,
              paddingBottom: 10,
              alignSelf: 'baseline',
              color: '#fff',
            }}>
            Personal Information
          </Text>
        </View>
        <View style={[styles.between, styles.bb, {marginHorizontal: 15, paddingVertical: 10}]}>
          <Text style={{fontSize: 17, fontWeight: '700', color: '#fff'}}>Name</Text>
          <TextInput
            style={{
              fontSize: 17,
              color: '#3378C2',
              width: '60%',
              paddingVertical: 0,
              marginVertical: 0,
            }}
            textAlign="right"
            value={name}
            onChangeText={newText => setName(newText)}
          />
        </View>
        <View style={[styles.between, styles.bb, {marginHorizontal: 15, paddingVertical: 10}]}>
          <Text style={{fontSize: 17, fontWeight: '600', color: '#fff'}}>Mobile</Text>
          <TextInput
            style={{
              fontSize: 17,
              color: '#3378C2',
              width: '60%',
              paddingVertical: 0,
              marginVertical: 0,
            }}
            keyboardType="number-pad"
            textAlign="right"
            value={mobile}
            onChangeText={newText => setMobile(newText)}
          />
        </View>
        <View style={[styles.between, styles.bb, {paddingHorizontal: 15, paddingVertical: 10}]}>
          <Text style={{fontSize: 17, fontWeight: '600', color: '#fff'}}>Email</Text>

          <TextInput
            style={{
              fontSize: 17,
              color: '#3378C2',
              width: '60%',
              marginVertical: 0,
              paddingVertical: 0,
            }}
            value={email}
            onChangeText={newText => setEmail(newText)}
            textAlign="right"
          />
        </View>
        <View style={[styles.bb, {paddingHorizontal: 15}]}>
          <Text
            style={{
              textTransform: 'uppercase',
              paddingTop: 20,
              paddingBottom: 10,
              alignSelf: 'baseline',
              color: '#fff',
            }}>
            Account Information
          </Text>
        </View>
        {/* <View
          style={[
            styles.between,
            styles.bb,
            {marginHorizontal: 15, paddingVertical: 10},
          ]}>
          <Text style={{fontSize: 17, fontWeight: '600'}}>Use hedge</Text>
          <Switch
            value={isHedge}
            onValueChange={() => {
              setIsHedge(!isHedge);
            }}
            thumbColor={'#fff'}
            trackColor={'#00ff00'}
          />
        </View> */}
        {/* <View
          style={[
            styles.between,
            styles.bb,
            {marginHorizontal: 15, paddingVertical: 10},
          ]}>
          <Text style={{fontSize: 17, fontWeight: '600'}}>Server</Text>
          <Text style={{fontSize: 17}}>Skylark - Demo</Text>
        </View> */}
        <View style={[styles.between, styles.bb, {marginHorizontal: 15, paddingVertical: 10}]}>
          <Text style={{fontSize: 17, fontWeight: '600', color: '#fff'}}>Account Type</Text>

          <TouchableOpacity
            onPress={() => setSeletedGroup('selecting')}
            style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Text style={{fontSize: 17, color: '#fff'}}>
              {selectedGroup?.name ? selectedGroup.name : 'Choose accountType'}
            </Text>
            <AntDesign name="right" color={'#fff'} size={15} />
          </TouchableOpacity>
        </View>
        <View style={[styles.between, styles.bb, {marginHorizontal: 15, paddingVertical: 10}]}>
          <Text style={{fontSize: 17, fontWeight: '600', color: '#fff'}}>Leverage</Text>

          <TouchableOpacity
            onPress={() => setSelectedLeverage('selecting')}
            style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Text style={{fontSize: 17, color: '#fff'}}>{selectedLeverage ? selectedLeverage : 'Choose Leverage'}</Text>
            <AntDesign name="right" color={'#fff'} size={15} />
          </TouchableOpacity>
        </View>
        <View style={[styles.between, styles.bb, {paddingHorizontal: 15, paddingVertical: 10}]}>
          <Text style={{fontSize: 17, fontWeight: '600', color: '#fff'}}>Deposit</Text>
          <TouchableOpacity
            style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}
            onPress={() => setSelectedDeposit('selecting')}>
            <Text style={{fontSize: 17, color: '#fff'}}>
              {selectedDeposit ? `${selectedDeposit} USD` : 'Choose Deposit'}
            </Text>
            <AntDesign name="right" color={'#fff'} size={15} />
          </TouchableOpacity>
        </View>
        {/*<View style={[styles.bb, {paddingVertical: 20}]}></View>*/}
        <View style={[styles.between, styles.bb, {paddingHorizontal: 20, paddingVertical: 10}]}>
          <Text style={{fontSize: 17, fontWeight: '600', color: '#fff'}}>Accept</Text>
          <Switch
            value={accepted}
            onValueChange={() => {
              setIsAccepted(!accepted);
            }}
            thumbColor={'#fff'}
            trackColor={'#00ff00'}
          />
        </View>
        <View style={{paddingHorizontal: 20, paddingTop: 10, paddingBottom: 100}}>
          <Text style={{color: '#fff'}}>
            By enabling "accept you agree with the terms and conditions for opening, an account and the data protection
            policy.
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        disabled={!isEverythingOk}
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#333',
          width: '100%',
          padding: 15,
        }}
        onPress={() => {
          handleRegister();
          // navigation.navigate('NewAccountStart');
        }}>
        <Text
          style={{
            color: '#fff',
            textTransform: 'uppercase',
            textAlign: 'center',
            fontWeight: '700',
          }}>
          Register
        </Text>
      </TouchableOpacity>
      <LeverageModal selectedLeverage={selectedLeverage} setSel={setSelectedLeverage} />
      <DepositModal selectedDeposit={selectedDeposit} setSel={setSelectedDeposit} />
      <AccountType selectedGroup={selectedGroup} setSel={setSeletedGroup} groupss={groups} />
    </View>
  );
}

const DepositModal = ({selectedDeposit, setSel}) => {
  const leverages = ['1000', '2000', '3000', '5000', '10000', '50000', '100000', '500000'];
  return (
    <Portal>
      <Dialog
        visible={selectedDeposit === 'selecting'}
        onDismiss={() => {
          setSel(null);
        }}>
        <Dialog.Title style={{marginBottom: 20, fontSize: 20}}>Choose Deposit</Dialog.Title>
        <Dialog.Content style={{gap: 10}}>
          {leverages?.map((leverage, i) => {
            return (
              <TouchableOpacity
                style={[styles.bb]}
                key={leverage}
                onPress={() => {
                  setSel(leverage);
                }}>
                <Text style={{paddingBottom: 5, paddingTop: 10}}>{leverage}</Text>
              </TouchableOpacity>
            );
          })}
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};
const AccountType = ({selectedGroup, setSel, groupss}) => {
  return (
    <Portal>
      <Dialog
        visible={selectedGroup === 'selecting'}
        onDismiss={() => {
          setSel(null);
        }}>
        <Dialog.Title style={{marginBottom: 20, fontSize: 20}}>Choose Account Type</Dialog.Title>
        <Dialog.Content style={{gap: 10}}>
          {groupss?.map((group, i) => {
            return (
              <TouchableOpacity
                style={[styles.bb]}
                key={group.id}
                onPress={() => {
                  setSel(group);
                }}>
                <Text style={{paddingBottom: 5, paddingTop: 10}}>{group.name}</Text>
              </TouchableOpacity>
            );
          })}
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};
const LeverageModal = ({selectedLeverage, setSel}) => {
  const leverages = [
    '1:100',
    '1:200',
    '1:300',
    '1:400',
    '1:500',
    '1:1000',
    '1:1500',
    '1:2000',
    '1:2500',
    '1:3000',
    '1:5000',
  ];
  return (
    <Portal>
      <Dialog
        visible={selectedLeverage === 'selecting'}
        onDismiss={() => {
          setSel(null);
        }}>
        <Dialog.Title style={{marginBottom: 20, fontSize: 20}}>Choose Leverage</Dialog.Title>
        <Dialog.Content style={{gap: 10}}>
          {leverages.map((leverage, i) => {
            return (
              <TouchableOpacity
                style={[styles.bb]}
                key={leverage}
                onPress={() => {
                  setSel(leverage);
                }}>
                <Text style={{paddingBottom: 5, paddingTop: 10}}>{leverage}</Text>
              </TouchableOpacity>
            );
          })}
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  bb: {
    borderBottomColor: '#ffffff33',
    borderBottomWidth: 1.5,
  },
  between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
