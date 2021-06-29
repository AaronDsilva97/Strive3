import React, {useState, useEffect} from 'react';
import {Modal, StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
const {width, height} = Dimensions.get('window');

//  Funtion Start From Here--------------------------

export default function HomeScreen({navigation}) {
  const [data, setData] = useState(null);
  useEffect(() => {
    firestore()
      .collection('Task')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        const dataArr = [];
        querySnapshot.forEach(documentSnapshot => {
          const {date, text} = documentSnapshot.data();
          dataArr.push({date, text});
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
        });
        
        setData(dataArr);
      });
    // Stop listening for updates when no longer required
  }, []);


  console.log("My data",data);
  return (
    <View style={styles.mainView}>
      <Card containerStyle={{borderRadius: width * 0.05}}>
        <Card.Title>Past Events</Card.Title>

        <Card.Divider />

        {/* <TextInput></TextInput> */}
      </Card>
      <Card containerStyle={{borderRadius: width * 0.05}}>
        <Card.Title>Today's Events</Card.Title>

        <Card.Divider />

        {/* <TextInput></TextInput> */}
      </Card>
      <Card containerStyle={{borderRadius: width * 0.05}}>
        <Card.Title>Future Events</Card.Title>
        <Card.Divider />

        {/* <TextInput></TextInput> */}
      </Card>

      {/* Button */}

      <View style={styles.button}>
        <TouchableOpacity
          style={styles.buttonView}
          onPress={() => navigation.navigate('Task Add')}>
          <AntDesign name="pluscircleo" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    position: 'absolute',
    alignSelf: 'center',
    top: '10%',
  },
  mainModalView: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '5%',
  },
  modalView: {
    width: width,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconStyle: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageView: {
    width: 250,
    height: 250,
    position: 'absolute',
    alignSelf: 'center',
    marginTop: height * 0.25,
    borderRadius: 125,
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: height * 0.65,
  },
  buttonView: {
    borderRadius: 30,
    padding: 20,
    elevation: 2,
    flexDirection: 'row',
    backgroundColor: 'green',
  },
  avatarView: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: height * 0.309,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
