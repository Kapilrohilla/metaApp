import React, {useContext} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../Navigation/AuthProvider';

const AppLoading = () => {
  const nav = useNavigation();
  const {Token} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#1A1A1A'} />
      <Animatable.View
        animation="bounceInDown"
        iterationCount={1}
        duration={1500}
        delay={200}
        onAnimationEnd={() => {
          if (Token === null) {
            nav.reset({
              index: 0,
              routes: [{name: 'Secondlogin'}],
            });
            // nav.navigate('/');
          } else {
            nav.reset({
              index: 0,
              routes: [{name: 'Drawer'}],
            });
            // nav.navigate('/login');
          }
        }}
        style={{
          color: '#fff',
          fontWeight: '900',
          fontFamily: 'Actor-Regular',
          textAlign: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/icon.png')}
          style={{width: 80}}
          resizeMethod="resize"
        />
        <Text
          style={{
            fontSize: 35,
            fontWeight: '900',
            color: '#fff',
            marginTop: 10,
            fontFamily: 'Actor-Regular',
          }}>
          SkyLark Trade
        </Text>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default AppLoading;
