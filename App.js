import React, { Component } from 'react';
import {Keyboard, CheckBox} from 'react-native'
import { Container,Content, Header, Left, Body, Right, Title, Text, ListItem, List,Input,Item,Button,View } from 'native-base';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [
        {id: 1, name:'work',isChecked: false},
        {id: 2, name:'swim',isChecked: false},
        {id: 3, name:'study',isChecked: false},
        {id: 4, name:'sleep',isChecked: false},
        {id: 5, name:'run',isChecked: false},
      ],
      toDoValue: '',
      checked: true
      
    };
  }
  handleAddButton(){
    if(this.state.toDoValue != ''){
      const input = {
        id:this.state.datas.length + 1, 
        name:this.state.toDoValue,
        isChecked:false
      };
      const newArray = this.state.datas.slice(); // Create a copy
      newArray.push(input); // Push the object
      this.setState({ datas: newArray });

      this.state.toDoValue = ''
      Keyboard.dismiss()
      alert('Berhasil!')
    }else{
      alert('todo tidak boleh kosong!')
    }

  }

  handleDelete(xId){
    for (let i = 0; i < this.state.datas.length; i++) {
      if (this.state.datas[i].id == (xId)) {
        this.setState((state) => {
          const list = state.datas.splice(i, 1)
          return list
        })
      }
    }
  }
  handleUbah(xId){
    this.setState({ toDoValue: this.state.datas[xId].name })

  }
  changeCheckBox(xId){
    let check
    this.setState((state)=>{
      if(state.datas[xId].isChecked != true){
        check = state.datas[xId].isChecked = true
      }else{
        check = state.datas[xId].isChecked = false
      } 
      return check
    })
  }
  
  render() {
    return (
      <Container>
        <Header style={{marginBottom: 10,}}>
          <Body>
            <Title>Header</Title>
          </Body>
        </Header>

        <Content>
          <Item rounded style={{marginBottom: 10,}}>
            <Input 
            value={this.state.toDoValue}
            onChangeText={(text) => this.setState({ toDoValue: text })}
            placeholder='Type Here...'/>
          </Item>          
          <Button onPress={()=> this.handleAddButton()} style={{marginBottom: 10,}}>
            <Text>Submit</Text>
          </Button>
          <List>
          {this.state.datas.map((item, key) => {
            return (
              <ListItem>
                <Left>
<View style={{ flexDirection: 'column'}}>
  <View style={{ flexDirection: 'row' }}>
    <CheckBox
      value={item.isChecked}
      onValueChange={() => this.changeCheckBox(item.id-1)}
    />
    <Text
    key={item.id}>
    {item.name}
    </Text>
  </View>
</View>
                </Left>
                <Right>
                  <Text onPress={() => this.handleUbah(item.id-1)}>[ubah]</Text>
                </Right>
                <Right>
                  <Text onPress={() => this.handleDelete(item.id)}>[hapus]</Text>
                </Right>
              </ListItem>
            );
          })}       
          </List>  
        </Content>   
      </Container>
    );
  }
}

