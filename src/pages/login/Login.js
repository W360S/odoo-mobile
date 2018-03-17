import React, { Component } from 'react'
import { StyleSheet, View, Image,
  TextInput,
  WebView,
  KeyboardAvoidingView, Dimensions,
  ImageBackground,
  Keyboard, Platform, AsyncStorage } from 'react-native'

import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base'
import { Constants } from '../../Constants'

export default class Login extends Component {

  constructor(props) {
    super(props)
    const TAG = 'LOGIN'
    this.state = {
      domainName: this.props.navigation.state.params.domainName,
      username: '',
      password: '',
      error: false,
      behavior: 'padding',
      session_id: '',
      id: '',
      ranDomId: '',
      userNameError: false,
      passwordError: false,
      domainNameError: false,
    }
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentDidMount () {
    AsyncStorage.getItem('username').then(value => {
      if (value !== undefined) {
        this.setState({
          username: value,
        })
      }
    })

    AsyncStorage.getItem('password').then(value => {
      if (value !== undefined) {
        this.setState({
          password: value,
        })
      }
    })
  }

  _keyboardDidShow () {
    // alert('Keyboard Shown');
  }

  _keyboardDidHide () {
    // alert('Keyboard Hidden');
  }

  login = () => {
    Keyboard.dismiss()
    this.setState({
      error: false
    })
    // let db = this.state.username.substring(this.state.username.lastIndexOf("@") + 1)
    if (this.state.userNameError || this.state.passwordError) {

    } else {
      let db = ''
      if (this.state.domainName.indexOf('www') > -1) {
        db = this.state.domainName.substring(this.state.domainName.indexOf('.') + 1)
      } else {
        db = this.state.domainName
      }
      this.setState({ranDomId: Math.floor(Math.random() * 1000) + 1})

      let url = ''
      if (this.state.domainName === 'wcloud.vn') {
        url = 'https://' + this.state.domainName + '/web/session/authenticate'
      } else {
        url = 'http://' + this.state.domainName + '/web/session/authenticate'
      }

      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "call",
          params: {
            db: db,
            login: this.state.username,
            password: this.state.password,
            context: {}
          },
          id: this.state.ranDomId
        })
      })
      .then(response => response.json())
      .then((responseJson) => {
        // console.log(responseJson)
        if (responseJson.error) {
          this.setState({
            error: true
          })
          return;
        }
        this.setState({
          session_id: responseJson.result.session_id
        });
        AsyncStorage.setItem('username', this.state.username.toLowerCase().trim())
        AsyncStorage.setItem('password', this.state.password)
        this.props.navigation.navigate('Home_Page', {
            domainName: this.state.domainName.toLowerCase().trim(),
            username: this.state.username.toLowerCase().trim(),
            password: this.state.password,
            session_id: this.state.session_id
        });
      })
      .catch((error) => {
        // console.error(error)
        this.setState({
          error: true
        })
      });
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        
        <Container style={styles.wrapper}>
          
            <Content style={styles.container}>
                <Image source={require('../../../images/w360s-logo.jpg')}
                    style={styles.imageLogo}
                    resizeMode='contain'
                  />
                <Form style={styles.formWrapper}>
                  <Item floatingLabel error={this.state.userNameError} style={styles.inputTextWrapper}>
                      <Label>Username</Label>
                      <Input autoCapitalize={'none'} style={styles.inputText}
                          autoCorrect={false}
                          onChangeText={(username) => this.setState({username})}
                          value={this.state.username}/>
                  </Item>
                  <Item floatingLabel error={this.state.passwordError} style={styles.inputTextWrapper}>
                      <Label>Password</Label>
                      <Input secureTextEntry={true} style={styles.inputText}
                          onChangeText={(password) => this.setState({password})}
                          value={this.state.password}/>
                  </Item>
                  {this.state.error && <Text style={styles.errorLabel}>Please check your login info</Text>}
                  <Button full success style={styles.buttonContainer}
                      onPress={() => this.login()}>
                      <Text>LOGIN</Text>
                  </Button>
                </Form>
            </Content>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: undefined,
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#FFFFFF'
  },
  container: {
    marginLeft: 10,
    marginRight: 15
  },
  imageLogo: {
    width: Dimensions.get('window').width/2,
    alignSelf: 'center',
  },
  contentWrapper: {
    flex: 1,
    width: undefined,
    justifyContent: 'center',
  },
  formWrapper: {
    margin: 0,
  },
  loginHeader: {
    justifyContent: 'center',
    backgroundColor: "#000000",
    height: 40
  },
  loginHeaderLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  inputText: {
    height: 50,
    paddingLeft: 0,
    color: '#000000'
  },
  errorLabel: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 5
  },
  buttonContainer: {
    marginTop: 15,
    marginLeft: 10,
  }
});
