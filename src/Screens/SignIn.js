import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Switch,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
const screenHeight = Dimensions.get('window').height;

const screenWidth = Dimensions.get('window').width;

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(loading, 'loadingSignIn');
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#3c6b91'} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{margin: 10, alignItems: 'center', flexDirection: 'row'}}>
        <AntDesign name="arrowleft" color="#fff" size={25} />
        <Text style={styles.buttonTxt}>Authorize</Text>
      </TouchableOpacity>
      {/* <ScrollView></ScrollView> */}
      <SignupModal />
    </View>
  );
};

const SignupModal = ({visible, hideDialog}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">This is simple dialog</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3c6b91',
    height: '100%',
    width: '100%',
  },
  buttonTxt: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '400',
    fontFamily: 'Actor-Regular',
    marginLeft: 10,
  },
});
