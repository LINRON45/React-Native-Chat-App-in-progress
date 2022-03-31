/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import {Avatar} from 'react-native-elements';
import React from 'react';

export default function StatusBox() {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('white', false)}>
      <View style={Styles.status}>
        <Avatar
          rounded
          source={{
            uri: 'https://i.pinimg.com/originals/b4/7f/5f/b47f5fcc66c19cd83121ad4c7ae76b4f.jpg',
          }}
          size={60}
        />
        <Text style={Styles.heading}>Contact Name</Text>
        <Text style={Styles.msg}>Time</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const Styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
  },

  status: {
    backgroundColor: 'teal',
    padding: 15,
    borderRadius: 10,
  },

  heading: {
    position: 'absolute',
    top: '25%',
    left: 95,
  },

  msg: {
    position: 'absolute',
    left: 95,
    bottom: '45%',
  },
});
