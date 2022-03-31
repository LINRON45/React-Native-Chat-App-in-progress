/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import {Avatar} from 'react-native-elements';
import React from 'react';

export default function ContactBox(props) {
  const handleAction = () => {
    window.contactName = props.contact;
    window.contactNumber = props.number;
    window.conactId = props.id;
    props.show();
  };

  return (
    <TouchableNativeFeedback
      onPressOut={handleAction}
      background={TouchableNativeFeedback.Ripple('grey', false)}>
      <View style={Styles.container}>
        <Avatar
          rounded
          source={{
            uri:
              props.pic ||
              'https://i.pinimg.com/originals/b4/7f/5f/b47f5fcc66c19cd83121ad4c7ae76b4f.jpg',
          }}
          size={60}
        />
        <Text numberOfLines={1} style={Styles.contact}>
          {props.contact}
        </Text>
        <Text numberOfLines={1} style={Styles.description}>
          Description
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 10,
  },
  contact: {
    position: 'absolute',
    top: 10,
    left: '25%',
    width: '74%',
  },

  description: {
    position: 'absolute',
    top: 40,
    left: '25%',
    width: '74%',
  },
});
