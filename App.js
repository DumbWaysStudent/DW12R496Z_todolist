import React, { Component } from 'react';
import { View, Text,StyleSheet,TextInput,Button,Dimensions,Keyboard } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [
        {id: 1, name:'work'},
        {id: 2, name:'swim'},
        {id: 3, name:'study'},
        {id: 4, name:'sleep'},
        {id: 5, name:'run'},
      ],
      toDoValue: ''
    };
  }
  handleAddButton(){
    const input = {id:this.state.datas.length + 1, name:this.state.toDoValue};
    const newArray = this.state.datas.slice(); // Create a copy
    newArray.push(input); // Push the object
    this.setState({ datas: newArray });

    this.state.toDoValue = ''
    Keyboard.dismiss()
    alert('Berhasil!')
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput 
          value={this.state.toDoValue}
          onChangeText={(text) => this.setState({ toDoValue: text })}
          style={{ width:Dimensions.get('window').width,borderWidth: 1  }}
          />
          <Text></Text>
          <Button
            title="Add"
            onPress={() => this.handleAddButton()}
          />
        </View>
      {this.state.datas.map((item, key) => {
        return (
          <Text 
          style={styles.item}
          key={item.id}>{item.name}</Text>
        );
     })}
     </View>
    );
  }
}

const styles = StyleSheet.create({  
      container:{
        flex: 0,
      },
      textList:{
        fontSize: 20,
      },
      item: {
        borderWidth: 0.5,
        padding: 15,
      }

})
