import {
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  View,
  TouchableNativeFeedback,
} from 'react-native';
import {Avatar, Badge, withBadge} from 'react-native-elements';
import StatusBox from './Status-box';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

export default function StatusPage() {
  return (
    <ScrollView style={Styles.container}>
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
          <Icon
            color="darkgreen"
            size={25}
            style={Styles.addIcons}
            name="add-circle"
          />

          <Text style={Styles.heading}>My Status</Text>
          <Text style={Styles.msg}>Tap to add status update</Text>
        </View>
      </TouchableNativeFeedback>

      <StatusBox />
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
  },

  status: {
    backgroundColor: 'lightblue',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    elevation: 5,
  },

  heading: {
    position: 'absolute',
    left: '30%',
    top: 18,
  },

  msg: {
    position: 'absolute',
    top: 50,
    left: '30%',
  },

  addIcons: {
    position: 'absolute',
    bottom: '20%',
    left: 55,
    backgroundColor: 'white',
    borderRadius: 100,
  },
});
