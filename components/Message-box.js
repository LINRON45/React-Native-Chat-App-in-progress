/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';

export default function MessageBox(props) {
  const [user, setUser] = useState(false);

  const userId = auth().currentUser.uid;

  useEffect(() => {
    if (props.id === userId) {
      setUser(true);
      return;
    }
  }, [props.id, userId]);

  return (
    <View style={user ? styles.container : styles.recContainer}>
      <Text style={user ? styles.message : styles.recMessage}>
        {props.message}
      </Text>
      <Text style={user ? styles.time : styles.recTime}>{props.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderBottomEndRadius: 30,
    marginVertical: 10,
    marginRight: 20,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    alignSelf: 'flex-end',
  },

  recContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    borderBottomEndRadius: 30,
    marginVertical: 10,
    marginLeft: 20,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    transform: [{scaleX: -1}],
    alignItems: 'flex-end',
    alignSelf: 'flex-start',
  },

  message: {
    flexWrap: 'wrap',
  },

  recMessage: {
    flexWrap: 'wrap',
    transform: [{scaleX: -1}],
  },

  time: {
    marginTop: 5,
    marginRight: 15,
    alignSelf: 'flex-end',
  },

  recTime: {
    marginTop: 5,
    marginRight: 15,
    alignSelf: 'flex-end',
    transform: [{scaleX: -1}],
  },
});
