import React, {useRef, useState, useEffect, useMemo, useCallback} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useIsFocused} from '@react-navigation/native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';

const MailBox = () => {
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
            Mailbox
          </Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent:"center",
            alignItems: 'center',
            flexDirection: 'row',
          }}>
         <MaterialIcons name="outgoing-mail" color="#fff" size={35} onPress={() => Linking.openURL('mailto:mailto:vinay@techninza.in') } />
         <MaterialIcons name="refresh" color="#fff" size={35} style={{marginLeft:10}}/>
         
        </View>
      </View>
      <ScrollView>
        <TouchableOpacity style={{ marginTop: 15, borderBottomWidth:1, borderBottomColor:"#ccc"}}>
      <View
          style={{
            flexDirection: "row",
           
            // marginHorizontal: 15,
            // opacity: 0.6,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection:"column"}}>
            <Text style={styles.buttonTxt}>XAUUSD</Text>
            <Text style={{...styles.buttonTxt, fontSize: 10,color:"gray"}}>
              GOLD VS US DOLLER
            </Text>
          </View>
          <AntDesign name="delete" color="#fff" size={25} />
        </View>
        <Text style={{...styles.buttonTxt, fontSize: 10, textAlign:"right", marginBottom:5,color:"gray"}}>
              26 Nov
            </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 15, borderBottomWidth:1, borderBottomColor:"#ccc"}}>
      <View
          style={{
            flexDirection: "row",
           
            // marginHorizontal: 15,
            // opacity: 0.6,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection:"column"}}>
            <Text style={styles.buttonTxt}>EURAUD</Text>
            <Text style={{...styles.buttonTxt, fontSize: 10,color:"gray"}}>
              GOLD VS US DOLLER
            </Text>
          </View>
          <AntDesign name="delete" color="#fff" size={25} />
        </View>
        <Text style={{...styles.buttonTxt, fontSize: 10, textAlign:"right", marginBottom:5,color:"gray"}}>
              26 Nov
            </Text>
            </TouchableOpacity>


            <TouchableOpacity style={{ marginTop: 15, borderBottomWidth:1, borderBottomColor:"#ccc"}}>
      <View
          style={{
            flexDirection: "row",
           
            // marginHorizontal: 15,
            // opacity: 0.6,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection:"column"}}>
            <Text style={styles.buttonTxt}>AUDCHF</Text>
            <Text style={{...styles.buttonTxt, fontSize: 10,color:"gray"}}>
              GOLD VS US DOLLER
            </Text>
          </View>
          <AntDesign name="delete" color="#fff" size={25} />
        </View>
        <Text style={{...styles.buttonTxt, fontSize: 10, textAlign:"right", marginBottom:5,color:"gray"}}>
              26 Nov
            </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 15, borderBottomWidth:1, borderBottomColor:"#ccc"}}>
      <View
          style={{
            flexDirection: "row",
           
            // marginHorizontal: 15,
            // opacity: 0.6,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection:"column"}}>
            <Text style={styles.buttonTxt}>USDZAR</Text>
            <Text style={{...styles.buttonTxt, fontSize: 10,color:"gray"}}>
              GOLD VS US DOLLER
            </Text>
          </View>
          <AntDesign name="delete" color="#fff" size={25} />
        </View>
        <Text style={{...styles.buttonTxt, fontSize: 10, textAlign:"right", marginBottom:5,color:"gray"}}>
              26 Nov
            </Text>
            </TouchableOpacity>
        
      </ScrollView>
      
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
  buttonTxt: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Actor-Regular',
    
  },
});

export default MailBox;

