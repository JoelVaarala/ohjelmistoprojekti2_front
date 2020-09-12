import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Slider } from 'react-native-elements'

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function MyFilters() {

  const [value, setValue] = React.useState(1)
  const [minAge, setMinAge] = React.useState('')
  const [maxAge, setMaxAge] = React.useState('')
  const [tag, setTag] = React.useState('')
  const [tagList, setTagList] = React.useState([])


  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text>TÄNNE NAVI</Text>
      </View>

      <View style={{ justifyContent: 'flex-start', flex: 4, alignItems: 'center' }}>
        <Text>Enimmäisetäisyys: {value} kilometriä</Text>
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'flex-start', padding: 20 }}>
          <Slider
            value={value}
            onValueChange={setValue}
            step={1}
            minimumValue={1}
            maximumValue={100}
            style={{ width: 200, height: 10 }}
            trackStyle={{ height: 10, backgroundColor: 'transparent' }}
          />
        </View>
        <Text>Ikäryhmä: {minAge} - vuotiaat</Text>
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'flex-start', padding: 20 }}>
          <Slider
            value={minAge}
            onValueChange={setMinAge}
            step={1}
            minimumValue={18}
            maximumValue={100}
            style={{ width: 200, height: 10 }}
            trackStyle={{ height: 10, backgroundColor: 'transparent' }}
          />

        </View>
        <View style={{flex: 7}}>         
        <Input label='Lisää tägi'value={tag}
        onChangeText={tag => setTag(tag)} onSubmitEditing= {tagList == [...tagList, tag]} />
        <Text>{tagList}</Text>
        </View>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});
