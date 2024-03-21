import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

export default function Certificate({navigation}) {
  const nav = useNavigation();
  const handleGoBack = () => {
    nav.goBack();
  };
  return (
    <View style={{flex: 1, backgroundColor: '#0f1821'}}>
      <View style={styles.topBar}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <MaterialIcons
            name="arrow-back"
            size={25}
            color="#fff"
            onPress={handleGoBack}
          />
          <Text style={{fontWeight: '600', fontSize: 18}}>Certificate</Text>
        </View>
        <Entypo name="plus" size={25} color="#fff" />
      </View>
      <Text style={{color: '#fff', textAlign: 'center', marginTop: 10}}>
        No installed certificate
      </Text>
    </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
});
