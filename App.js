import React, { Component } from 'react';
import {Keyboard, CheckBox,StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements'
import { Container,Content, Header, Left, Body, Right, Title, Text, ListItem, List,Input,Item,Button,View } from 'native-base';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [
        {id: 1, name:'work',isChecked: false},
        {id: 2, name:'swim',isChecked: false},
        {id: 3, name:'study',isChecked: true},
        {id: 4, name:'sleep',isChecked: false},
        {id: 5, name:'run',isChecked: false},
        {id: 6, name:'eat',isChecked: false},
      ],
      toDoValue: '',
      checked: true,
      btnTitle: 'Add',
      xId: '',
      
    };
  }
  awal(){
    this.setState({ toDoValue: '', btnTitle: 'Add',xId:''})
  }
  handleAddButton(){
    if(this.state.btnTitle == 'Add'){
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
    }else if(this.state.btnTitle == 'Edit'){

      for (let i = 0; i < this.state.datas.length; i++) {
        if (this.state.datas[i].id == (this.state.xId)) {
          const input = {
            id:this.state.xId, 
            name:this.state.toDoValue,
            isChecked:false
          }; 
          this.setState((state) => {
            return state.datas[i] = input
          })
        }
      }
      this.awal()
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
    this.setState({ toDoValue: this.state.datas[xId].name, btnTitle: 'Edit',xId:xId+1 })
  }
  changeCheckBox(xId){
    let check
    this.setState((state)=>{
      if(state.datas[xId].isChecked != true){
        check = state.datas[xId].isChecked = true
      }else{
        check = state.datas[xId].isChecked = false
      } 
      this.setState
      return check
    })
  }
  
  render() {
    return (
      <Container>
        <Header style={styles.mb}>
          <Body>
            <Title>Header</Title>
          </Body>
        </Header>

        <Content>
          <Item rounded style={styles.mb}>
            <Input 
            value={this.state.toDoValue}
            onChangeText={(text) => this.setState({ toDoValue: text })}
            placeholder='Type Here...'/>
          </Item>          
          <Button onPress={()=> this.handleAddButton()} style={styles.mb}>
            <Text>{this.state.btnTitle}</Text>
          </Button>
          <List>
          {this.state.datas.map((item, key) => {
            return (
              <ListItem>
                <Left>
                  <View style={styles.col}>
                    <View style={styles.row}>
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
                  <Icon
                    onPress={() => this.handleUbah(item.id-1)}
                    name='create'
                    color='#00aced' /> 
                </Right>
                <Right>
                  <Icon
                    onPress={() => this.handleDelete(item.id)}
                    name='trash'
                    color='#00aced' />  
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

const styles = StyleSheet.create({
  mb:{
    marginBottom: 10,
  },
  col:{ 
    flexDirection: 'column',
  },
  row:{
    flexDirection: 'row', 
  },
})