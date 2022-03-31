/* eslint-disable prettier/prettier */
import {View, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

export default function Multi_Button(props) {
  const multi_func = () => {
    if (props.index === 0) {
      props.show();
    }
  };
  return (
    <View style={styles.button}>
      {props.index !== 2 ? (
        <Icon color="black" onPress={multi_func} size={30} name={props.icon} />
      ) : (
        <Icon2
          color="black"
          onPress={multi_func}
          size={30}
          style={{transform: [{scaleX: -1}]}}
          name={props.icon}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: '3%',
    right: '7%',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'lightgreen',
    transform: [{scaleX: -1}],
  },
});
