/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  ScrollView,
  BackHandler,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import React, {useEffect} from 'react';
import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function Profile(props) {
  const {height, width} = Dimensions.get('window');
  const [username, setUsername] = useState("Can't find username");
  const [phoneNumber, setPhoneNumber] = useState("Can't find phone number");
  const [description, setDescription] = useState('Unavailable');

  useEffect(() => {
    const userId = auth().currentUser.uid;

    database()
      .ref(`/User_Profile/${userId}`)
      .on('value', snapshot => {
        const data = snapshot.val();
        console.log('User data: ', data);

        setUsername(data.username);
        setPhoneNumber(`+${data.phone_number}`);
        setDescription(data.status);
      });
  }, []);

  useEffect(() => {
    const backAction = () => {
      props.remove();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [props]);

  const Styles = StyleSheet.create({
    container: {
      position: 'absolute',
      width: width,
      height: height,
      paddingHorizontal: 20,
      paddingVertical: 20,
      backgroundColor: 'lightblue',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      zIndex: 1,
    },
    info: {
      marginVertical: 20,
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '70%',
      alignSelf: 'center',
      alignItems: 'center',
    },
    userInfo: {
      marginLeft: 30,
    },
    button: {
      marginVertical: 10,
    },
  });

  return (
    <View style={Styles.container}>
      <Text>Profile Settings</Text>
      <View style={Styles.info}>
        <Avatar
          rounded
          source={{
            uri: 'https://www.lciacademy.com/wp-content/uploads/2017/09/default-avatar.png',
          }}
          size={100}
        />
        <View style={Styles.userInfo}>
          <Text>{username}</Text>
          <Text>{description}</Text>
          <Text>{phoneNumber}</Text>
        </View>
      </View>
      <ScrollView>
        <View style={Styles.button}>
          <Button title="Change Profile Pic" color="green" />
        </View>
        <View style={Styles.button}>
          <Button title="Change Username" color="green" />
        </View>
        <View style={Styles.button}>
          <Button title="Change Description" color="green" />
        </View>
      </ScrollView>
      <View style={{marginBottom: 20}}>
        <Button title="close" onPress={props.remove} />
      </View>
    </View>
  );
}
