import {View, Text, TouchableOpacity} from 'react-native';
import React, {useMemo, useState} from 'react';
import {Divider, Menu} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale} from '../../utils/overAllNormalization';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {changeType} from '../../../ReduxToolkit/slices/HistoryTypeSlice';

export default function Time_Menu() {
  const [isTimeFilterVisible, setIsTimeFilterVisible] = useState(false);
  const today = useMemo(() => moment().format('l'), []);
  const lastweek = useMemo(() => moment().subtract(7, 'days').format('l'), []);
  const lastMonth = useMemo(() => moment().subtract(1, 'month').calendar(), []);
  const last3Month = useMemo(() => moment().subtract(3, 'month').calendar(), []);
  const historyType = useSelector(state => state.historyType);
  const dispatch = useDispatch();

  return (
    <Menu
      anchorPosition={{top: 50, left: 0}}
      visible={isTimeFilterVisible}
      onDismiss={() => {
        setIsTimeFilterVisible(false);
      }}
      anchor={
        <TouchableOpacity
          onPress={() => {
            setIsTimeFilterVisible(true);
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AntDesign name="calendar" color={'#fff'} size={30} style={{marginLeft: 20}} />
        </TouchableOpacity>
      }>
      <Menu.Item
        onPress={() => {
          // dispatch(changeType());
        }}
        title={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="calendar" color={'#000'} size={scale(20)} />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: scale(13), color: '#000'}}>Today</Text>
              <Text
                style={{
                  fontSize: scale(10),
                  color: '#00000094',
                  fontWeight: '500',
                }}>
                {today}
              </Text>
            </View>
          </View>
        }
      />
      <Divider />
      <Menu.Item
        onPress={() => {}}
        title={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="calendar" color={'#000'} size={scale(20)} />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: scale(13), color: '#000000'}}>Last Week</Text>
              <Text
                style={{
                  fontSize: scale(10),
                  color: '#00000094',
                  fontWeight: '500',
                }}>
                {lastweek} - {today}
              </Text>
            </View>
          </View>
        }
      />
      <Divider />
      <Menu.Item
        onPress={() => {}}
        title={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="calendar" color={'#000'} size={scale(20)} />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: scale(13), color: '#000000'}}>Last Month</Text>
              <Text
                style={{
                  fontSize: scale(10),
                  color: '#00000094',
                  fontWeight: '500',
                }}>
                {lastMonth} - {today}
              </Text>
            </View>
          </View>
        }
      />
      <Divider />
      <Menu.Item
        onPress={() => {}}
        title={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="calendar" color={'#000'} size={scale(20)} />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: scale(13), color: '#000'}}>Last 3 Month</Text>
              <Text
                style={{
                  fontSize: scale(10),
                  color: '#00000094',
                  fontWeight: '500',
                }}>
                {last3Month} - {today}
              </Text>
            </View>
          </View>
        }
      />
      <Divider />
      <Menu.Item
        onPress={() => {}}
        title={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons name="calendar-account-outline" color={'#000'} size={scale(20)} />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: scale(13), color: '#000'}}>Custom Period</Text>
              <Text
                style={{
                  fontSize: scale(10),
                  color: '#00000094',
                  fontWeight: '500',
                }}>
                upto today
                {/* Upto - {today} */}
              </Text>
            </View>
          </View>
        }
      />
    </Menu>
  );
}
