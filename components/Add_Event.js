import React, {useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList,  Platform } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import Stepper from "react-native-stepper-ui";
import DateTimePicker from '@react-native-community/datetimepicker';
import Redux from 'redux';
import { connect } from 'react-redux';
import { addName, addBio, addTime, addTags, store, } from '../redux/index';


function Add_Eventti(props) {
  
  // -------------------------------------------------------------------------------------------
  const BasicInfo = (props) => {

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

    var e_nimi = store.getState().reducer[0].n
    var e_kuvaus = store.getState().reducer[1].k
    return(
      <View>
        <Text>Täällä voisi näyttää tiedot 
          ja 'confirm' event</Text>
          
          <Text style={{marginTop: 30}}>Eventin nimi on : {e_nimi}</Text>
          <Text>Eventin kuvaus : {e_kuvaus}</Text>
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
let enim = "test_nimi"
let ekuv = "test_kuvaus tapahtumasta"
let aika = "30-10-2020"
let tt = ["pelit", "kalastus"]
const addi = () => {
  //store.dispatch(addItem({nimi: enim}))
  store.dispatch(addName(enim))
  store.dispatch(addBio(ekuv))
  store.dispatch(addTime(aika))
  store.dispatch(addTags({tt}))
  //store.dispatch(addItem({tag: tt}))
}

const log = () => {
  console.log(store.getState());
  console.log(store.getState().EventReducer[3].tt);
  
}

  return (
    
    <View style={styles.container}>
     
    <View style={styles.container, {paddingTop: 0, paddingBottom: 300}}>
    <Button onPress={addi} title="add item"/>
      <Button onPress={log} title="logita store state"/>
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


const mapStateToProps = (state) => ({
  EventReducer: state.EventReducer,
})

const Add_Event = connect(mapStateToProps, {addName, addBio, addTime, addTags})(Add_Eventti);

export default Add_Event;


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
  