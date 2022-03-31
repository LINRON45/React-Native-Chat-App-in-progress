/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import {Avatar} from 'react-native-elements';
import React from 'react';

import {useState} from 'react';

export default function ChatBox(props) {
  const handleAction = () => {
    window.contactName = props.name;
    window.conactId = props.id;
    props.show();
  };

  return (
    <TouchableNativeFeedback
      onPressOut={handleAction}
      background={TouchableNativeFeedback.Ripple('white', false)}>
      <View style={Styles.container}>
        <Avatar
          rounded
          source={{
            uri: 'https://i.pinimg.com/originals/b4/7f/5f/b47f5fcc66c19cd83121ad4c7ae76b4f.jpg',
          }}
          size={60}
        />

        <Text numberOfLines={1} style={Styles.contact}>
          {props.name}
        </Text>
        <Text numberOfLines={1} style={Styles.message}>
          message
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'orange',
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
  },
  contact: {
    position: 'absolute',
    top: 10,
    left: '25%',
    width: '74%',
  },

  message: {
    position: 'absolute',
    top: 40,
    left: '25%',
    width: '74%',
  },

  badge_cont: {
    position: 'absolute',
    top: 10,
    left: 57,
  },

  badge: {
    width: 13,
    height: 13,
    borderRadius: 100,
  },
});
