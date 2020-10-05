import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, EventSubscriptionVendor, Platform } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import Stepper from "react-native-stepper-ui";
import DateTimePicker from '@react-native-community/datetimepicker';
import Redux from 'redux';


export default function Add_Event() {

  // -------------------------------------------------------------------------------------------
  const BasicInfo = () => {

    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
   

    return (
      <View>
        
        <Text style={styles.headers}>Anna tapahtumalle nimi : </Text>
        <TextInput style={styles.textbox} onChangeText={text => setEventName(text)} 
                        value={eventName} />
  
        <Text style={styles.headers}>Anna tapahtuman kuvaus</Text>
        <TextInput style={styles.textbox} onChangeText={text => setDescription(text)} 
                        value={description} />
      </View>
    );
    
  };

  //---------------------------------------------------------------------------------------------
  const Date_Time = () => {
    var d = new Date()
    const [date, setDate] = useState(d);
    const [time, setTime] = useState(d);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

  
     const onChange = (event, selectedValue) => {
      setShow(Platform.OS === 'ios');
      if(mode == 'date'){
        const currentDate = selectedValue || date;
        setDate(currentDate);
        setMode('time');
        setShow(Platform.OS !== 'ios');
      }else{
        const selectedTime = selectedValue || time;
        setTime(selectedTime);
        setShow(Platform.OS === 'ios');
        setMode('date');
        //console.log('time is = ', time)
      }
      console.log('func call = ',formatDate(date, time));
     };  

    const formatDate = (date, time) => {
      let min = time.getMinutes();
      if(Number(min) < 10)
      min = '0'+min;
      //console.log(min)
      return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}T${time.getHours()}:${min}:00.000Z`
    }
  
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode); 
      };
  
    const showDatepicker = () => {
        showMode('date');
      };

    const naytapvm = () => {
      console.log(formatDate(date, time))
    }
  
    return (
      
      <View style={{ flexDirection: "row",  alignItems: 'flex-start', justifyContent: 'center', marginBottom: 30, marginTop: 20 }}>
        <View style={{marginRight: 20}}>
          <Button onPress={showDatepicker} title="Valitse ajankohta" />
        </View>
        <View>
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
        </View>
        <Button onPress={naytapvm} title="näytä pvm"/>
      </View>
      
    );
  };
  
  // ------------------------------------------------------------------------------------------------
  const Add_Tags = () => {
  
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState();
  
    const addTag = () => {
      setTags([{key: tag}, ...tags])
      setTag('')
      console.log(Date_Time.date)
    };

    
  
    return (
      <View>
        <Text style={styles.headers}>Anna tapahtumalle tägejä : </Text>
  
        <TextInput 
          style={styles.textbox} 
          onChangeText={text => setTag(text)}
          value={tag}
          onEndEditing={addTag}
        />
  
        <View style={styles.container}>
            <Text style={styles.header}>Tag List</Text>

            <FlatList
            keyExtractor={(item, key) => key.toString()+'aaa'}
            data={tags}
            renderItem={({item}) => (
              <Text>{item.key}</Text>)}
            />

        </View>
      </View>
    );
  };

  // -----------------------------------------------------------------------------------------------------
  const ShowAll = (props) => {
    return(
      <View>
        <Text>Täällä voisi näyttää tiedot 
          ja 'confirm' event</Text>
      </View>
    );
  }
  // -----------------------------------------------------------------------------------------------------
  const content = [
    <BasicInfo />,
    <Date_Time/>,
    <Add_Tags />,
    <ShowAll />,
  ];

const [active, setActive] = useState(0);


  return (
    
    <View style={styles.container}>

    <View style={styles.container, {paddingTop: 30, paddingBottom: 20}}>
        <Stepper
          active={active}
          content={content}
          onNext={() => setActive((p) => p + 1)}
          onBack={() => setActive((p) => p - 1)}
          onFinish={() => Alert.alert("Finish")}
        />
    </View>
    
    </View>
    
  );

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: '#eaeaea',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginLeft: 20
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    },
    headers: {
      fontWeight: 'bold'
    },
    textbox: {
      height: 40, 
      width: 200,
      borderBottomColor: 'gray', 
      borderBottomWidth: 1,  
    },
  });
  