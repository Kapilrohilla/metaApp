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

const News = () => {
  const navigation = useNavigation();
  const [select, setSelect] = useState(1);

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
            News
          </Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
         
         
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FontAwesome6 name="newspaper" color={'#fff'} size={100} />
        <Text
          style={{
            fontSize: 16,
            color: '#fff',
            fontFamily: 'Inter-SemiBold',
            fontWeight: '600',
            marginTop: 20,
          }}>
          No news
        </Text>
      </ScrollView>
      {/* <View
        style={{
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: 20,
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}
          style={{
            height: 50,
            width: '60%',
            backgroundColor: '#0388fc',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
            }}>
            REGISTER
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={{
            height: 50,
            width: '37%',
            backgroundColor: '#394554',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#0388fc',
              fontFamily: 'Inter-SemiBold',
              fontWeight: '600',
            }}>
            SIGN IN
          </Text>
        </TouchableOpacity>
      </View> */}
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

export default News;
