import {View, Text, TouchableOpacity} from 'react-native';
import React, {useContext, useMemo, useState} from 'react';
import {Divider, Menu} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale} from '../../utils/overAllNormalization';
import moment from 'moment';
import {useSelector} from 'react-redux';
// import {changeType} from '../../../ReduxToolkit/slices/HistoryTypeSlice';
import {HistoryContext} from '../../Navigation/HistoryProvider';

export default function Time_Menu() {
  const [isTimeFilterVisible, setIsTimeFilterVisible] = useState(false);
  const today = useMemo(() => moment().format('l'), []);
  const lastweek = useMemo(() => moment().subtract(7, 'days').format('l'), []);
  const lastMonth = useMemo(() => moment().subtract(1, 'month').calendar(), []);
  const last3Month = useMemo(() => moment().subtract(3, 'month').calendar(), []);
  const historyType = useSelector(state => state.historyType);
  const {timeBasedSort4Position, timeBasedSort4Order, timeBasedSort4Deal} = useContext(HistoryContext);
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
          if (historyType === 1) {
            timeBasedSort4Position({type: 'today'});
          } else if (historyType === 2) {
            timeBasedSort4Order({type: 'today'});
          } else if (historyType === 3) {
            timeBasedSort4Deal({type: 'today'});
          }
          setIsTimeFilterVisible(false);
        }}
        title={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="calendar" color={'#ccc'} size={scale(20)} />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: scale(13), color: '#ccc'}}>Today</Text>
              <Text
                style={{
                  fontSize: scale(10),
                  color: '#ccc',
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
        onPress={() => {
          if (historyType === 1) {
            timeBasedSort4Position({type: 'lastweek'});
          } else if (historyType === 2) {
            timeBasedSort4Order({type: 'lastweek'});
          } else if (historyType === 3) {
            timeBasedSort4Deal({type: 'lastweek'});
          }
          setIsTimeFilterVisible(false);
        }}
        title={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="calendar" color={'#ccc'} size={scale(20)} />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: scale(13), color: '#ccc'}}>Last Week</Text>
              <Text
                style={{
                  fontSize: scale(10),
                  color: '#ccc',
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
        onPress={() => {
          if (historyType === 1) {
            timeBasedSort4Position({type: 'lastMonth'});
          } else if (historyType === 2) {
            timeBasedSort4Order({type: 'lastMonth'});
          } else if (historyType === 3) {
            timeBasedSort4Deal({type: 'lastMonth'});
          }
          setIsTimeFilterVisible(false);
        }}
        title={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="calendar" color={'#ccc'} size={scale(20)} />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: scale(13), color: '#ccc'}}>Last Month</Text>
              <Text
                style={{
                  fontSize: scale(10),
                  color: '#ccc',
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
        onPress={() => {
          if (historyType === 1) {
            timeBasedSort4Position({type: 'last3Month'});
          } else if (historyType === 2) {
            timeBasedSort4Order({type: 'last3Month'});
          } else if (historyType === 3) {
            timeBasedSort4Deal({type: 'last3Month'});
          }
          setIsTimeFilterVisible(false);
        }}
        title={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="calendar" color={'#ccc'} size={scale(20)} />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: scale(13), color: '#ccc'}}>Last 3 Month</Text>
              <Text
                style={{
                  fontSize: scale(10),
                  color: '#ccc',
                  fontWeight: '500',
                }}>
                {last3Month} - {today}
              </Text>
            </View>
          </View>
        }
      />
      {/* <Divider />
      <Menu.Item
        onPress={() => {}}
        title={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons name="calendar-account-outline" color={'#ccc'} size={scale(20)} />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: scale(13), color: '#ccc'}}>Custom Period</Text>
              <Text
                style={{
                  fontSize: scale(10),
                  color: '#ccc',
                  fontWeight: '500',
                }}>
                Upto - {today}
              </Text>
            </View>
          </View>
        }
      /> */}
    </Menu>
  );
}
