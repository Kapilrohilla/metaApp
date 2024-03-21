import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-paper';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
const screenHeight = Dimensions.get('window').height;

const screenWidth = Dimensions.get('window').width;

const IndicatorDetails = ({route}) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(loading, 'loadingSignIn');
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#1a1a1a'} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{margin: 10, alignItems: 'center', flexDirection: 'row'}}>
          <AntDesign name="arrowleft" color="#fff" size={25} />
          <Text
            style={
              styles.buttonTxt
            }>{`Parameter: ${route?.params?.data}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonTxt}>DONE</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{paddingHorizontal:15}}>
        <Text
          style={{
            ...styles.buttonTxt,
            fontSize: 18,
            fontWeight: '800',
            borderBottomWidth: 1,
            paddingVertical: 15,
            borderBottomColor: 'gray',
          }}>
          PARAMETERS
        </Text>
        <TouchableOpacity
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingVertical: 15,
            borderBottomColor: 'gray',
          }}>
          <Text
            style={{
              ...styles.buttonTxt,
              fontSize: 14,
              fontWeight: '400',
            }}>
            Volumes
          </Text>
          <Text
            style={{
              ...styles.buttonTxt,
              fontSize: 14,
              fontWeight: '400',
            }}>
            Tick
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingVertical: 15,
            borderBottomColor: 'gray',
          }}>
          <Text
            style={{
              ...styles.buttonTxt,
              fontSize: 14,
              fontWeight: '400',
            }}>
            Line width
          </Text>
          <Text
            style={{
              ...styles.buttonTxt,
              fontSize: 14,
              fontWeight: '400',
            }}>
            1 Pixel
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            ...styles.buttonTxt,
            fontSize: 18,
            fontWeight: '800',
            borderBottomWidth: 1,
            paddingVertical: 15,
            borderBottomColor: 'gray',
          }}>
          STYLES
        </Text>
        <TouchableOpacity
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingVertical: 15,
            borderBottomColor: 'gray',
          }}>
          <Text
            style={{
              ...styles.buttonTxt,
              fontSize: 14,
              fontWeight: '400',
            }}>
           MFI Up, Volume Up
          </Text>
          <View style={{height:30, width:30, backgroundColor:"green", borderWidth:1, borderColor:"#fff", borderRadius:30}} ></View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingVertical: 15,
            borderBottomColor: 'gray',
          }}>
          <Text
            style={{
              ...styles.buttonTxt,
              fontSize: 14,
              fontWeight: '400',
            }}>
           MFI Down, Volume Down
          </Text>
          <View style={{height:30, width:30, backgroundColor:"red", borderWidth:1, borderColor:"#fff", borderRadius:30}} ></View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingVertical: 15,
            borderBottomColor: 'gray',
          }}>
          <Text
            style={{
              ...styles.buttonTxt,
              fontSize: 14,
              fontWeight: '400',
            }}>
           MFI UP, Volume Down
          </Text>
          <View style={{height:30, width:30, backgroundColor:"blue", borderWidth:1, borderColor:"#fff", borderRadius:30}} ></View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingVertical: 15,
            borderBottomColor: 'gray',
          }}>
          <Text
            style={{
              ...styles.buttonTxt,
              fontSize: 14,
              fontWeight: '400',
            }}>
           MFI Down, Volume Up
          </Text>
          <View style={{height:30, width:30, backgroundColor:"pink", borderWidth:1, borderColor:"#fff", borderRadius:30}} ></View>
        </TouchableOpacity>

        <Text
          style={{
            ...styles.buttonTxt,
            fontSize: 18,
            fontWeight: '800',
            borderBottomWidth: 1,
            paddingVertical: 15,
            borderBottomColor: 'gray',
          }}>
          LEVEL
        </Text>
        <TouchableOpacity
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingVertical: 15,
            borderBottomColor: 'gray',
          }}>
          <Text
            style={{
              ...styles.buttonTxt,
              fontSize: 14,
              fontWeight: '400',
            }}>
           Levels:
          </Text>
          <AntDesign name="edit" color="#0388fc" size={25} />
        </TouchableOpacity>

        <Text
          style={{
            ...styles.buttonTxt,
            fontSize: 18,
            fontWeight: '800',
            borderBottomWidth: 1,
            paddingVertical: 15,
            borderBottomColor: 'gray',
          }}>
          TIME FRAME
        </Text>
        <TouchableOpacity
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingVertical: 15,
            borderBottomColor: 'gray',
          }}>
          <Text
            style={{
              ...styles.buttonTxt,
              fontSize: 14,
              fontWeight: '400',
            }}>
           TIME FRAME: All
          </Text>
          <AntDesign name="edit" color="#0388fc" size={25} />
        </TouchableOpacity>
        
      </ScrollView>
    </View>
  );
};

export default IndicatorDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    height: '100%',
    width: '100%',
  },
  buttonTxt: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Actor-Regular',
  
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: '#ccc',
    backgroundColor: '#1a1a1a',
  },
});
