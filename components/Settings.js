import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, FlatList, StatusBar } from 'react-native';
import { Input, Slider } from 'react-native-elements'

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function Settings() {

  const [value, setValue] = React.useState(1)
  const [minAge, setMinAge] = React.useState('')
  const [maxAge, setMaxAge] = React.useState('')
  const [tag, setTag] = React.useState('')
  const [tagList, setTagList] = React.useState([])

  const addButtonPressed = () => {
    setTagList([...tagList, { key: tag }])
  }

  return (
    <View style={styles.container}>
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
      <View>
        <View style={{ flex: 2, paddingBottom: 20, alignItems: 'center' }}>
          <Text>Lisää tägi</Text>
          <TextInput onChangeText={tag => setTag(tag)} value={tag} style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}></TextInput>
          <Button style={styles.button} onPress={addButtonPressed} title="ADD"></Button>
        </View>
        <View style={{ paddingTop: 10, flex: 8, alignItems: 'center' }}>
          <Text>Olet valinnut seuraavat tagit:</Text>
          <SafeAreaView style={styles.safearea}>
          <FlatList contentContainerStyle ={styles.content} 
          horizontal={false} 
          numColumns={3} 
          data={tagList}
          renderItem={({ item }) =>
              <Text style={styles.tag}>{item.key}</Text>}
          />
          </SafeAreaView>
        </View>
      </View>

    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 200,
    justifyContent: 'flex-start',
  },
  safearea: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  tag: {
    padding: 6,
    fontSize: 20,
    color: 'white',
    marginVertical: 7,
    marginHorizontal: 10,
    backgroundColor: 'green',
    borderRadius: 6,
  },
  content: {
    paddingTop: 10,
  }
});
