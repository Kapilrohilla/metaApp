import {View, Text, Dimensions, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default function Success({orderState, symbol, price}) {
  // if (typeof orderState === 'object') {
  //   Alert.alert(JSON.stringify(orderState));
  // }
  const navigation = useNavigation();
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: '#0f1821',
        height,
        width,
        display: orderState === null ? 'none' : 'flex',
      }}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <MaterialCommunityIcons name="menu" size={30} color={'#fff'} />
        <Text style={{color: '#fff', fontWeight: '500', fontSize: 18}}>
          New Order
        </Text>
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            backgroundColor:
              orderState === 'failed'
                ? '#df5749' // red
                : orderState?.type === 'sucess'
                ? '#4ca967' // green
                : '#409cff', // blue
            padding: 25,
            borderRadius: 999,
            marginTop: 50,
            marginBottom: 20,
            position: 'relative',
          }}>
          <MaterialCommunityIcons name="note" size={40} color={'#0f1821'} />
        </View>
      </View>
      <View>
        <View style={{gap: 10}}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '600',
            }}>
            Order has been place in queue
          </Text>
          <Text style={{color: '#fff', textAlign: 'center', opacity: 0.3}}>
            {symbol}
          </Text>
        </View>
        {/* <TouchableOpacity
          style={{
            backgroundColor: '#405369',
            position: 'absolute',
            bottom: 0,
            padding: 14,
            width: '100%',
          }}>
          <Text
            style={{
              color: '#fff',
              fontWeight: '700',
              textAlign: 'center',
              fontSize: 16,
            }}>
            HIDE
          </Text>
      </TouchableOpacity> */}
      </View>
    </View>
  );
}
