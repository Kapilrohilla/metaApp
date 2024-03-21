import React, {useContext, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  PixelRatio,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const height = Dimensions.get('window').height;
const fontFamily = 'Inter-Regular';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../Navigation/AuthProvider';
import store from '../../ReduxToolkit/store';
import Octoicons from 'react-native-vector-icons/Octicons';

const DrawerContent = () => {
  const navigation = useNavigation();
  const {logout} = useContext(AuthContext);
  const {name, email} = store.getState()?.user;
  return (
    <>
      <View style={styles.Container}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderBottomColor: '#6d6d6e',
            borderBottomWidth: 1,
            padding: 20,
          }}
          onPress={() => navigation.navigate('accountSetupStack')}>
          <View
            style={{flexDirection: 'column', alignItems: 'baseline', gap: 5}}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Ionicons name="person-circle-outline" size={35} color="white" />
              <View style={{gap: -4}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '900',
                    fontFamily: 'Inter-Regular',
                    color: '#fff',
                    // textAlign: '',
                    marginBottom: 5,
                  }}>
                  {email}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    fontFamily: 'Inter-Regular',
                    color: 'lightblue',
                    // textAlign: 'center',
                  }}>
                  {/* Meta Trader */}
                  {'Manage accounts'}
                  {/* {email} */}
                </Text>
              </View>
            </View>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('accountSetupStack')}> */}
            {/* <Text style={{color: 'lightblue', fontSize: 12}}>
              Manage accounts
            </Text> */}
            {/* </TouchableOpacity> */}
          </View>
          {/* <AntDesign name="copyright" color="#ccc" size={30} /> */}
        </TouchableOpacity>
        <Pressable
          onPress={() => navigation.navigate('MainQuots')}
          style={[styles.Itemwrapper, {marginTop: 30}]}>
          <Octoicons
            name="arrow-switch"
            size={25}
            color={'#fff'}
            style={{transform: [{rotate: '90deg'}]}}
          />
          <Text style={styles.title}>Quotes</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Chart')}
          style={styles.Itemwrapper}>
          <FontAwesome name="line-chart" style={{color: '#fff'}} size={20} />

          <Text style={styles.title}>Chart</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('MealType', {screen: 'Trades'})}
          style={[styles.Itemwrapper]}>
          <MaterialCommunityIcons
            name="chart-timeline-variant"
            color="#fff"
            size={20}
          />

          <View>
            <Text style={styles.title}>Trade</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Notification')}
          style={styles.Itemwrapper}>
          <Entypo name="back-in-time" style={{color: '#fff'}} size={20} />
          <Text style={styles.title}>History</Text>
        </Pressable>
        {/* <Pressable
          onPress={() => navigation.navigate('Message')}
          style={styles.Itemwrapper}>
          <MaterialCommunityIcons
            name="cellphone-message"
            style={{color: '#fff'}}
            size={20}
          />

          <Text style={styles.title}>Message</Text>
        </Pressable> */}
        {/* <Pressable
          onPress={() => navigation.navigate('Order', {screen: 'News'})}
          style={styles.Itemwrapper}>
          <FontAwesome6 name="newspaper" color="#fff" size={25} />

          <Text style={styles.title}>News</Text>
        </Pressable> */}
        {/* <Pressable
          onPress={() => navigation.navigate('Order', {screen: 'MailBox'})}
          style={styles.Itemwrapper}>
          <Entypo name="mail" color="#fff" size={25} />

          <Text style={styles.title}>Mailbox</Text>
        </Pressable> */}
        <Pressable
          onPress={() => navigation.navigate('Journal')}
          style={styles.Itemwrapper}>
          <Ionicons name="infinite-sharp" color="#fff" size={25} />
          <Text style={styles.title}>Journal</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Settings');
          }}
          style={styles.Itemwrapper}>
          <Ionicons name="settings-sharp" color="#fff" size={25} />
          <Text style={styles.title}>Settings</Text>
        </Pressable>
        {/* <Pressable
          //   onPress={() => navigation.navigate('DrawerCoupon')}
          style={styles.Itemwrapper}>
          <Entypo name="calendar" color="#fff" size={25} />
          <Text style={styles.title}>Economic Calendar</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#0388fc',
              padding: 7,
              borderRadius: 15,
            }}>
            <Text style={{color: '#0388fc', fontSize: 10, fontWeight: '400'}}>
              Ads
            </Text>
          </View>
        </Pressable> */}
        {/* <Pressable
          //   onPress={() => navigation.navigate('AddressList')}
          style={styles.Itemwrapper}>
          <FontAwesome5 name="users" color="#fff" size={25} />
          <Text style={styles.title}>Traders Community</Text>
        </Pressable> */}
        <Pressable
          //   onPress={() => navigation.navigate('HelpCenter')}
          style={styles.Itemwrapper}>
          <FontAwesome name="question-circle-o" color="#fff" size={25} />
          <Text style={styles.title}>User guide</Text>
        </Pressable>
        <Pressable style={styles.Itemwrapper}>
          <Entypo name="info-with-circle" color="#fff" size={25} />
          <Text style={styles.title}>About</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            logout();
            navigation.reset({
              index: 0,
              routes: [{name: 'Secondlogin'}],
            });
          }}
          style={[
            styles.Itemwrapper,
            {position: 'absolute', bottom: 10, left: 20},
          ]}>
          <MaterialCommunityIcons
            name="location-exit"
            size={25}
            color="#fff"
            style={{transform: [{rotate: '-180deg'}]}}
          />
          <Text style={styles.title}>Logout</Text>
        </Pressable>
      </View>
    </>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    // padding: 20,
    height: height,
  },
  Itemwrapper: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  title: {
    marginHorizontal: 15,
    fontFamily: fontFamily,
    fontWeight: '900',
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
  icon: {
    width: 20,
    height: 20,
  },
  username: {
    marginHorizontal: 15,
    fontFamily: fontFamily,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 1,
    textAlign: 'left',
    color: '#fff',
    fontSize: PixelRatio.getPixelSizeForLayoutSize(5.8),
  },
  subtext: {
    marginHorizontal: 15,
    fontFamily: fontFamily,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 1,
    textAlign: 'left',
    color: '#fff',
    fontSize: PixelRatio.getPixelSizeForLayoutSize(4.5),
  },
});
