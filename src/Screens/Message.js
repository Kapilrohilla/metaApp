import React, {useRef, useState, useEffect, useMemo, useCallback} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import {useIsFocused} from '@react-navigation/native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';

const Message = () => {
  const navigation = useNavigation();
  const [select, setSelect] = useState(1);
  const [password, setPassWord] = useState('');
  const [searchView, setSearchView] = useState(false);

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

          <Text
            style={{
              fontSize: 18,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              marginLeft: 10,
            }}>
            Message
          </Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <Text
              style={{
                fontSize: 12,
                color: '#000',
                fontFamily: 'Inter-SemiBold',
                fontWeight: '600',
              }}>
              MQID
            </Text>
          </View>
          <TouchableOpacity onPress={() => setSearchView(!searchView)}>
            <AntDesign
              name="search1"
              color={'#fff'}
              size={30}
              style={{marginLeft: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>
      {searchView === false ? (
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign name="message1" color={'#fff'} size={100} />
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
              marginTop: 20,
            }}>
            No message
          </Text>
        </ScrollView>
      ) : (
        <ScrollView>
          <TextInput
            style={styles.input}
            onChangeText={e => setPassWord(e)}
            value={password}
            placeholder="Search"
            keyboardType="default"
            placeholderTextColor={'#fff'}
            right={
              password?.length !== 0 ? (
                <TextInput.Icon
                  icon={({size, color}) => (
                    <AntDesign name="search1" color="#fff" size={25} />
                  )}
                />
              ) : null
            }
          />
        </ScrollView>
      )}
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
  input: {
    height: 40,
    // margin: 12,
    // borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: '#ccc',
    backgroundColor: '#1a1a1a',
  },
});

export default Message;
