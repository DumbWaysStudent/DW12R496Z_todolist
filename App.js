import React, { Component } from 'react';
import {Keyboard, CheckBox,StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements'
import { Container,Content, Header, Left, Body, Right, Title, Text, ListItem, List,Input,Item,Button,View } from 'native-base';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [
        {id: 0, name:'work',isChecked: false},
        {id: 1, name:'swim',isChecked: false},
        {id: 2, name:'study',isChecked: false},
        {id: 3, name:'sleep',isChecked: false},
        {id: 4, name:'run',isChecked: false},
      ],
      toDoValue: '',
      btnTitle: 'Add',
      xId: '',
      
    };
  }
  awal(){
    this.setState({ toDoValue: '', btnTitle: 'Add',xId:''})
    Keyboard.dismiss()
  }
  handleAddButton(){
    if(this.state.btnTitle == 'Add'){
      if(this.state.toDoValue != ''){
        const input = [{
          id:this.state.datas.length, 
          name:this.state.toDoValue,
          isChecked:false
        }];
        this.setState({datas: [...this.state.datas, ...input]});

  
        alert('Berhasil!')
      }else{
        alert('todo tidak boleh kosong!')
      }
    }else if(this.state.btnTitle == 'Edit'){

      let id = this.state.xId
      let index = this.state.datas.findIndex((x) => x.id == id)

      this.setState((state) => {
        return state.datas[index].name = state.toDoValue
      })
  
      
    }
    this.awal()
  }

  handleDelete(xId){
    this.setState({datas: this.state.datas.filter((items) => {
      return items.id != xId
    })})    
    this.awal()
  }
  handleChange(xId){

    this.setState({ 
      toDoValue: this.state.datas[xId].name, 
      btnTitle: 'Edit',
      xId:xId
    })
  }
  changeCheckBox(xId){

    let index = this.state.datas.findIndex((x) => x.id == xId)
    
    this.setState((state)=>{
      if(state.datas[index].isChecked != true){
        return state.datas[index].isChecked = true
      }else{
        return state.datas[index].isChecked = false
      } 
    })

    this.awal()
  }
  
  render() {
    return (
      <Container>
        <Header style={styles.mb}>
          <Body>
            <Title>ToDo App</Title>
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
                        onValueChange={() => this.changeCheckBox(item.id)}
                      />
                      <Text
                      key={item.id}>
                      {item.name}{item.id}
                      </Text>
                    </View>
                  </View>
                </Left>
                <Right>
                  <Icon
                    onPress={() => this.handleChange(item.id)}
                    name='create'
                    color='#00aced' /> 
                </Right>
                <Right>
                  <Icon
                    onPress={() => this.handleDelete(item.id)}
                    name='delete'
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