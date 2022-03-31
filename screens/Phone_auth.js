/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import React from 'react';
import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import database from '@react-native-firebase/database';

export default function Phone_auth() {
  const [number, setNumber] = useState(null);
  const [next, setNext] = useState(0);
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [check, setCheck] = useState(null);
  const [username, setUsername] = useState(null);

  const getValue = async () => {
    const value = await AsyncStorage.getItem('@loggedIn');
    setCheck(value);
  };

  useEffect(() => {
    getValue();
  }, []);

  //Turn these into a class in another file and call

  /*
  $ User Data set $

  keys      Value

  @loggedIn   true
  @user_number    user phone number
  @userID         firebase UID for user
  */

  const loginState = async () => {
    await AsyncStorage.setItem('@loggedIn', 'true');
  };

  const setUserNumber = async () => {
    await AsyncStorage.setItem('@user_number', `+${number}`);
  };

  const setDescription = async () => {
    await AsyncStorage.setItem('@user_descritpion', 'Available');
  };
  const submitData = async () => {
    const userId = auth().currentUser.uid;
    console.log(userId);

    await AsyncStorage.setItem('@userID', `${userId}`);

    //set storage in database for user data
    database()
      .ref(`/User_Profile/${userId}/`)
      .set({
        username: `${username}`,
        pfp: 'not set',
        status: 'Available',
        phone_number: `${number}`,
      });

    //set a database node called Users which holds number and UID
    database().ref(`/Users/${number}/`).set(userId);

    loginState();
    setDescription();
    setCheck('true');
  };

  ///Confirm Login
  async function confirmCode() {
    try {
      const confirmation = await confirm.confirm(code);
      console.log(confirmation);
      setUserNumber();
      setNext(next + 1);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  const goBack = () => {
    setNext(next - 1);
  };

  ///Request Authentication Code
  const Request = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber('+' + number);
      setConfirm(confirmation);
      console.log(confirmation);
      setNext(next + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const hide = {display: 'none'};
  return (
    <View style={check !== 'true' ? styles.container : hide}>
      <View style={next !== 0 && hide}>
        <Text style={styles.text}>Phone Number Authentication</Text>
        <TextInput
          keyboardType="phone-pad"
          onChangeText={text => setNumber(text)}
          placeholder="Enter your number..."
          value={number}
        />
        <Button title="Request OTP" onPress={Request} />
      </View>

      <View style={next !== 1 && hide}>
        <Text style={styles.text}>OTP</Text>
        <TextInput
          keyboardType="number-pad"
          onChangeText={text => setCode(text)}
          placeholder="Enter the OTP..."
          value={code}
        />
        <Button title="Confirm" onPress={confirmCode} />
      </View>
      <View style={next !== 2 && hide}>
        <Text style={styles.text}>Set Username</Text>
        <TextInput
        keyboardType="default"
          onChangeText={text => setUsername(text)}
          placeholder="Enter your username..."
          value={username}
          maxLength={20}
        />
        <Button title="finish" onPress={submitData} />
      </View>
      <View style={styles.back}>
        {next > 0 ? (
          <Button title="back" onPress={goBack} />
        ) : (
          <Button title="back" disabled />
        )}
      </View>
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
    backgroundColor: 'white',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkgreen',
  },

  back: {
    marginTop: 20,
  },
});
