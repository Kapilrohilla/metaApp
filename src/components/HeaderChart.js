/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function HeaderChart() {
  const [state, setState] = useState([
    'M1',
    'M2',
    'M3',
    'M4',
    'M5',
    'M6',
    'M10',
    'M12',
    'M15',
    'M20',
    'M30',
    'H1',
    'H2',
    'H3',
    'H4',
    'H6',
    'H8',
    'H12',
    'D1',
    'W1',
    'MN',
  ]);

  const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckboxPress = (isChecked, value) => {
    if (isChecked) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.filter(item => item !== value));
    }
  };

  const isCheckboxDisabled = selectedValues.length >= 7;

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
        {state?.map((item, index) => {
          const isChecked = selectedValues.includes(item);
          return (
            <View style={{padding: 10, width: '30%'}} key={index}>
              <BouncyCheckbox
                size={20}
                fillColor="red"
                unfillColor="#FFFFFF"
                text={item}
                iconStyle={{borderColor: 'red'}}
                innerIconStyle={{borderWidth: 2}}
                textStyle={{
                  fontFamily: 'JosefinSans-Regular',
                  textDecorationLine: 'none',
                }}
                onPress={isChecked => handleCheckboxPress(isChecked, item)}
                isChecked={isChecked}
                disableBuiltInState={isCheckboxDisabled && !isChecked}
              />
            </View>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
