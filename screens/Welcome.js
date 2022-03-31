/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useState} from 'react';

export default function Welcome() {
  const [show, setShow] = useState(true);

  setTimeout(setShow, 5000);

  const hide = {display: 'none'};
  return (
    <View style={show ? styles.container : hide}>
      <Text style={styles.text}>ChatApp</Text>
      <Text>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'green',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
});
