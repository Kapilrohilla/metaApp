import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {scale} from '../../utils/overAllNormalization';
import Entypo from 'react-native-vector-icons/Entypo';
import {Menu} from 'react-native-paper';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Time_Menu from './Time_Menu';
import Filter_Menu from './Filter_Menu';

export default function Header() {
  const [isDollorMenuVisible, setIsDollarMenuVisible] = useState(false);

  const navigation = useNavigation();

  return (
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
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              marginLeft: 10,
            }}>
            History
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              marginLeft: 10,
            }}>
            All symobls
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        {/* <Menu
          visible={isDollorMenuVisible}
          onDismiss={() => setIsDollarMenuVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => setIsDollarMenuVisible(true)}
              style={{
                width: scale(25),
                height: scale(25),
                marginRight: scale(20),
              }}>
              <Image
                source={require('../../images/dollar.png')}
                resizeMode="contain"
                style={{width: 25, height: 25, tintColor: '#ffffff'}}
              />
            </TouchableOpacity>
          }>
          <Menu.Item onPress={() => {}} title="All Symbols" />
        </Menu> */}
        <Filter_Menu />
        <Time_Menu
        // today={today}
        // lastWeek={lastWeek}
        // lastMonth={lastMonth}
        // last3Month={last3Month}
        />
      </View>
    </View>
  );
}
