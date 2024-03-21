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
import Entypo from 'react-native-vector-icons/Entypo';
const screenHeight = Dimensions.get('window').height;

const screenWidth = Dimensions.get('window').width;

const ProblemDesc = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
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
            }>Problem Description</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonTxt}>SEND</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <TextInput
          style={styles.input}
          onChangeText={e => setPassWord(e)}
          value={password}
          placeholder="Describe your Problems"
          keyboardType="default"
          placeholderTextColor={'grey'}
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
    </View>
  );
};

export default ProblemDesc;

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
    marginLeft: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: '#ccc',
    backgroundColor: '#1a1a1a',
    color:"#fff"
  },
});
