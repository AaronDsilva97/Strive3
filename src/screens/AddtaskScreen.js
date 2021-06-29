import * as React from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import RNCalendarEvents from 'react-native-calendar-events';

const db = firestore();

const {width, height} = Dimensions.get('window');

export default function AddTask({navigation}) {
  const [text, onChangeText] = React.useState(null);
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);
  const [activity, setActivity] = React.useState(false);

  const requestPermission = async () => {
    const permission = await RNCalendarEvents.requestPermissions();
    console.log(permission);
  };

  React.useEffect(() => {
    requestPermission();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const submitTask = async () => {
    console.log('Submit Task');
    setActivity(true);

    db.collection('Task')
      .add({
        text: text,
        date: moment(date).format(),
      })
      .then(val => {
        setActivity(false);
        navigation.navigate('Home');
      })
      .catch(error => {
        setActivity(false);
        ToastAndroid.show(error, ToastAndroid.LONG);
      });
  };
  if (activity) {
    return <ActivityIndicator size={64} color="blue" />;
  }

  return (
    <SafeAreaView style={styles.mainView}>
      <View>
        <Card containerStyle={{borderRadius: width * 0.05, width: width * 0.6}}>
          <Card.Title>Add Calender Event</Card.Title>
          <Card.Divider />

          <TextInput
            autoFocus
            onChangeText={onChangeText}
            value={text}
            placeholder="Add Title"
          />
          <Card.Divider />
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={showDatepicker}>
              <Text style={{marginRight: 90}}>
                {moment(date).format('MMMM Do YYYY')}
              </Text>
              <AntDesign name="calendar" size={24} color="black" />
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <Card.Divider />
          </View>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => submitTask()}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </SafeAreaView>
  );
}

// styles------
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});
