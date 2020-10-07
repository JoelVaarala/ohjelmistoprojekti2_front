import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Platform } from 'react-native';
import { connect } from 'react-redux';


class BasicInfo extends Componet {

    //const [eventName, setEventName] = useState('');
    //const [description, setDescription] = useState('');
    
   
    render(){
    return (
      <View>
        
        <Text style={styles.headers}>Anna tapahtumalle nimi : </Text>
        <TextInput style={styles.textbox} onChangeText={text => setEventName(text)} 
                        value={eventName} />
  
        <Text style={styles.headers}>Anna tapahtuman kuvaus</Text>
        <TextInput style={styles.textbox} onChangeText={text => setDescription(text)} 
                        value={description} />
      </View>
    )
    }
  }

  const mapStateToProps = (state) => ({
    count: state
})
  export default connect(mapStateToProps)(BasicInfo);