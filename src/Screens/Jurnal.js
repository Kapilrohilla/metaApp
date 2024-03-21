import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from '../Navigation/AuthProvider';
import {useSelector} from 'react-redux';
// import {BASEURL} from '@env';

const Jurnal = () => {
  const navigation = useNavigation();
  const BASEURL = useSelector(state => state.baseUrl);
  //const [select, setSelect] = useState(1);
  const [journalData, setJournalData] = useState([]);
  const {Token} = useContext(AuthContext);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const apiUrl = `${BASEURL}/journal`;
    fetch(apiUrl, {
      signal,
      method: 'GET',
      headers: {
        Authorization: Token,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(r => r.json())
      .then(data => {
        setJournalData(data?.message);
      })
      .catch(err => {
        console.log(err.message);
      });
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1a1a1a" />
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
              Journal
            </Text>
            {/* <Text
              style={{
                fontSize: 14,
                color: '#fff',
                fontFamily: 'Inter-SemiBold',
                fontWeight: '600',
                marginLeft: 10,
              }}>
              Today
            </Text> */}
          </View>
        </TouchableOpacity>
        {/* <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <MaterialIcons
            name="outgoing-mail"
            color="#fff"
            size={35}
            onPress={() => navigation.navigate('ProblemDesc')}
          />
          <AntDesign
            name="calendar"
            color={'#fff'}
            size={30}
            style={{marginLeft: 15}}
          />
          <Ionicons
            name="reload-outline"
            color={'#fff'}
            size={30}
            style={{marginLeft: 15}}
          />
        </View> */}
      </View>
      <FlatList
        data={journalData}
        renderItem={({item}) => {
          return (
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'white', fontSize: 12}}>
                {item?.server} {item?.text}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
  },
});

export default Jurnal;
