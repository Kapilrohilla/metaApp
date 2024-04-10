import {View, Text, StyleSheet, Dimensions, ToastAndroid} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';

export default function NewAccountStart({navigate, route}) {
  const navigation = useNavigation();
  const userDetails = route?.params;
  return (
    <View style={{backgroundColor: '#000', flex: 1}}>
      <View>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            textAlign: 'center',
            paddingVertical: 8,
            fontWeight: '600',
            borderBottomColor: '#E9E9E977',
            borderBottomWidth: 1.5,
          }}>
          Registration
        </Text>
        <View style={[styles.between, {marginHorizontal: 15, paddingVertical: 10}]}>
          <Text style={{fontSize: 17, color: '#fff'}}>Name</Text>
          <Text style={{fontSize: 17, color: '#fff'}}>{userDetails.name}</Text>
        </View>
        <View style={[styles.between, {marginHorizontal: 15, paddingVertical: 10}]}>
          <Text style={{fontSize: 17, color: '#fff'}}>Email</Text>
          <Text style={{fontSize: 17, color: '#fff'}}>{userDetails?.email}</Text>
        </View>
        {/* <View
          style={[styles.between, {marginHorizontal: 15, paddingVertical: 10}]}>
          <Text style={{fontSize: 17}}>Password</Text>
          <Text style={{fontSize: 17}}>kapilrohilla</Text>
        </View> */}
        <View style={[styles.between, {marginHorizontal: 15, paddingVertical: 10}]}>
          <Text style={{fontSize: 17, color: '#fff'}}>Server</Text>
          <Text style={{fontSize: 17, color: '#fff'}}>{route?.params?.server}</Text>
        </View>
        <View style={[styles.between, {marginHorizontal: 15, paddingVertical: 10}]}>
          <Text style={{fontSize: 17, color: '#fff'}}>Account Type</Text>
          <Text style={{fontSize: 17, color: '#fff'}}>{userDetails?.afterLogin?.group?.Name}</Text>
        </View>
        <View style={[styles.between, {marginHorizontal: 15, paddingVertical: 10}]}>
          <Text style={{fontSize: 17, color: '#fff'}}>Deposit</Text>
          <Text style={{fontSize: 17, color: '#fff'}}>{userDetails?.balance} USD</Text>
        </View>
        <Text
          style={{
            // color: '#3378C2',
            color: 'green',
            paddingVertical: 10,
            marginHorizontal: 15,
            textAlign: 'center',
            borderBottomColor: '#E9E9E977',
            borderBottomWidth: 1.5,
            fontSize: 18,
          }}>
          New account has been opeend successfully{' '}
        </Text>
      </View>
      <View style={[styles.between, {marginHorizontal: 15, paddingVertical: 10}]}>
        <Text style={{fontSize: 17, color: '#fff'}}>Login</Text>
        <Text style={{fontSize: 17, color: '#fff'}}>{userDetails?.afterLogin?.userId}</Text>
      </View>
      <View style={[styles.between, {marginHorizontal: 15, paddingVertical: 10}]}>
        <Text style={{fontSize: 17, color: '#fff'}}>Password</Text>
        <Text style={{fontSize: 17, color: '#fff'}}>{userDetails?.afterLogin?.password}</Text>
      </View>
      <View style={[styles.between, {marginHorizontal: 15, paddingVertical: 10}]}>
        <Text style={{fontSize: 17, color: '#fff'}}>Investor</Text>
        <Text style={{fontSize: 17, color: '#fff'}}>{userDetails?.afterLogin?.investorPassword}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          const copyString = `userId: ${userDetails?.afterLogin?.userId}, password: ${userDetails?.afterLogin?.password}, investorPassword: ${userDetails?.afterLogin?.investorPassword},`;
          Clipboard.setString(copyString);

          Snackbar.show({
            text: 'Credentials copied',
            backgroundColor: '#ccc',
            textColor: '#008800',
            duration: 500,
          });
        }}
        style={{
          paddingVertical: 10,
          borderBottomColor: '#E9E9E977',
          borderBottomWidth: 1.5,
        }}>
        <Text style={{textAlign: 'center', fontSize: 18, color: '#3378c2'}}>Copy to clipboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Drawer'}],
            }),
          );
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          paddingVertical: 20,
        }}>
        <Text
          style={{
            color: '#3378c2',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: '600',
          }}>
          Start
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#E9E9E977',
    borderBottomWidth: 1.5,
  },
});
