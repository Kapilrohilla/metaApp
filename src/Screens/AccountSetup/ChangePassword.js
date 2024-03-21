import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import store from '../../../ReduxToolkit/store';
// import {BASEURL} from '@env';
import {AuthContext} from '../../Navigation/AuthProvider';
import {useSelector} from 'react-redux';
// import DropDownPicker from 'react-native-dropdown-picker';

// const dropDownOptions = [
//   {label: 'Change Master Password', value: '1'},
//   {label: 'Change Investor Password', value: '1'},
// ];

export default function ChangePassword() {
  const navigation = useNavigation();
  const BASEURL = useSelector(state => state.baseUrl);
  // const [openDropDown, setOpenDropDown] = useState(false);
  const {Token} = useContext(AuthContext);
  const {_id, name} = store.getState().user;
  // const [dropDownValue, setOpenDropDownValue] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [newPassword, setNewPasssword] = useState('');
  const [cnfrmPassword, setCnfrmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    const apiUrl = `${BASEURL}/update-user`;
    const requestBody = {
      userId: _id,
      password: newPassword,
    };
    console.log(requestBody);
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: Token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    };

    fetch(apiUrl, requestOptions)
      .then(r => r.json())
      .then(r => {
        setLoading(false);
        ToastAndroid.show(r.message, 1000);
        console.log(r);
        if (r?.status) {
          navigation.goBack();
        }
        console.log(r);
      })
      .catch(err => {
        setLoading(false);
        ToastAndroid.show(err.message, 1000);
        console.log(err);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#0f1821'}}>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" color={'#ffffff'} size={scale(25)} />
        </TouchableOpacity>
        <View>
          <Text style={{fontSize: 15, color: '#fff', fontWeight: '700'}}>
            Change password
          </Text>
          <Text style={{fontSize: 12, opacity: 0.4, fontWeight: '600'}}>
            {_id} {name}
          </Text>
        </View>
      </View>
      {/* <DropDownPicker
        items={dropDownOptions}
        open={openDropDown}
        value={dropDownValue}
        onSelectItem={item => setOpenDropDownValue(item)}
        dropDownContainerStyle={{
          backgroundColor: '#3B3B3BF6',
          color: '#ffffff',
        }}
        placeholder="Change master password"
        textStyle={{color: '#9aa6b8'}}
        arrowColor="#ffffff"
        style={{
          backgroundColor: '#0f1821',
          marginTop: 40,
          marginHorizontal: 20,
          width: Dimensions.get('screen').width - 40,
          borderTopWidth: 0,
          borderWidth: 0,
          borderBottomWidth: 1,
          borderColor: '#808080',
        }}
        setOpen={() => setOpenDropDown(true)}
        onClose={() => setOpenDropDown(false)}
      /> */}
      {/* <View
        style={{
          width: Dimensions.get('screen').width - 40,
          marginHorizontal: 20,
        }}> */}
      {/* <TextInput
          placeholder="Current password"
          placeholderTextColor={'#9aa6b8'}
          value={cpassword}
          onChangeText={newText => {
            setCPassword(newText);
          }}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#808080',
          }}
        />
        {!cpassword && (
          <Text style={{color: '#ff6e60', fontSize: 12}}>
            Password is not specified
          </Text>
        )}
      </View> */}
      <View
        style={{
          width: Dimensions.get('screen').width - 40,
          marginHorizontal: 20,
        }}>
        <TextInput
          placeholder="New password"
          value={newPassword}
          onChangeText={newText => setNewPasssword(newText)}
          style={{borderBottomColor: '#808080', borderBottomWidth: 1}}
        />
        {/* <View style={{flexDirection: 'row', gap: 5}}>
          <View style={{flex: 1, backgroundColor: '#ff6e60', height: 2}}></View>
          <View style={{flex: 1, backgroundColor: '#ff6e60', height: 2}}></View>
          <View style={{flex: 1, backgroundColor: '#ff6e60', height: 2}}></View>
          <View style={{flex: 1, backgroundColor: '#ff6e60', height: 2}}></View>
        </View> */}
        <TextInput
          style={{borderBottomColor: '#808080', borderBottomWidth: 2}}
          placeholder="Password confirmation"
          value={cnfrmPassword}
          onChangeText={newText => setCnfrmPassword(newText)}
          placeholderTextColor={'#9aa6b8'}
        />
        {newPassword !== cnfrmPassword && (
          <Text style={{color: '#ff6e60', fontSize: 12}}>
            New password and confirm new password doesn't match.
          </Text>
        )}
      </View>
      <Text
        style={{
          width: Dimensions.get('screen').width - 40,
          marginHorizontal: 20,
          fontSize: 12,
          marginTop: 40,
        }}>
        Password must be strong and contain at least 8 character, including
        lower and uppercase letters, numbers and special symbol
      </Text>
      <Pressable
        onPress={handleSubmit}
        style={{
          backgroundColor: '#405369',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          width: Dimensions.get('screen').width,
        }}
        disabled={newPassword !== cnfrmPassword}>
        {loading ? (
          <ActivityIndicator size={20} color="#fff" />
        ) : (
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: cnfrmPassword !== newPassword ? '#808080' : '#fff',
            }}>
            DONE
          </Text>
        )}
      </Pressable>
    </View>
  );
}
