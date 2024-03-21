import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function OrderSuccess() {
  const currency = 'USDCNH';
  const price = 1.345432;
  const status = 'working';
  return (
    <View style={{flex: 1}}>
      <View
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
      </View>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            backgroundColor:
              status === 'working'
                ? '#409cff'
                : status === 'failed'
                ? '#df5749'
                : '',
            padding: 25,
            borderRadius: 999,
            marginTop: 50,
            marginBottom: 20,
            position: 'relative',
          }}>
          <MaterialCommunityIcons name="note" size={40} color={'#0f1821'} />
        </View>
      </View>
      {status === 'working' ? (
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
            instant BUY {currency} at {price}
          </Text>
        </View>
      ) : (
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '600',
          }}>
          Market closed
        </Text>
      )}
      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  );
}
