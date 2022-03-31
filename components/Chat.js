/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import MessageBox from './Message-box';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default function Chat(props) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState(null);

  const userId = auth().currentUser.uid;
  const contactUid = window.conactId;

  useEffect(() => {
    database()
      .ref(`/User_Chat/${userId}/${contactUid}`)
      .on('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          setChat(Object.values(data));
          return;
        }
      });
  }, [contactUid, userId]);

  const submit = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toTimeString();
    const timeId = Date.now();

    if (message) {
      const messageObj = {
        timeId: timeId,
        date: currentDate,
        time: currentTime,
        message: message,
        sendId: userId,
      };

      database().ref(`/User_Chat/${userId}/${contactUid}/`).push(messageObj);

      database().ref(`/User_Chat/${contactUid}/${userId}/`).push(messageObj);
      setMessage('');
    }
    return;
  };

  const sortTime = (a, b) => {
    return a.timeId - b.timeId;
  };

  return (
    <Modal
      style={styles.container}
      animationType="slide"
      onRequestClose={props.show}>
      <View style={styles.header}>
        <Icon onPress={props.show} name="arrow-back-sharp" size={30} />
        <Avatar
          avatarStyle={styles.pic}
          rounded
          source={{
            uri: 'https://i.pinimg.com/originals/b4/7f/5f/b47f5fcc66c19cd83121ad4c7ae76b4f.jpg',
          }}
          size={55}
        />
        <View style={styles.headerInfo}>
          <Text>{window.contactName}</Text>
          <Text>Status</Text>
        </View>
        <View style={styles.buttons}>
          <Icon size={30} name="videocam" />
          <Icon style={{marginLeft: 15}} size={30} name="call" />
          <Icon2 style={{marginLeft: 10}} size={27} name="options-vertical" />
        </View>
      </View>

      <View style={styles.chatArea}>
        <ScrollView>
          {chat &&
            chat.sort(sortTime).map(item => {
              return (
                <MessageBox
                  key={item.timeId}
                  message={item.message}
                  time={item.time}
                  id={item.sendId}
                />
              );
            })}
        </ScrollView>
        <View style={styles.input}>
          <TextInput
            autoCorrect
            multiline
            placeholder="Message"
            scrollEnabled
            onChangeText={text => setMessage(text)}
            value={message}
          />
          <Text style={styles.submit} onPress={submit}>
            send
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
    zIndex: 1,
    bottom: 100,
  },
  header: {
    backgroundColor: 'green',
    padding: 5,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: 'darkgreen',
    alignItems: 'center',
  },
  headerInfo: {
    marginLeft: 30,
  },
  chatArea: {
    backgroundColor: 'whitesmoke',
    position: 'relative',
    borderColor: 'grey',
    alignSelf: 'stretch',
    height: '100%',
    right: 0,
    left: 0,
  },

  input: {
    position: 'relative',
    marginBottom: 80,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 10,
    width: '80%',
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: 15,
    paddingRight: 55,
    flexDirection: 'row',
  },

  buttons: {
    postion: 'relative',
    flexDirection: 'row',
    width: '59%',
    justifyContent: 'flex-end',
  },

  submit: {
    position: 'absolute',
    right: '5%',
    alignSelf: 'center',
    backgroundColor: 'lightblue',
    padding: 7,
    borderRadius: 100,
  },
});
