import React, { Component } from 'react'
import { StyleSheet, View, Image,
  TextInput,
  WebView,
  KeyboardAvoidingView, Dimensions,
  ImageBackground } from 'react-native'

  import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base'

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      domainName: '',
      username: '',
      password: '',
      error: '',
      behavior: 'padding',
      session_id: '',
      id: '',
      ranDomId: '',
    }
  }

  login = () => {
    // let db = this.state.username.substring(this.state.username.lastIndexOf("@") + 1)
    let db = ''
    if (this.state.domainName.indexOf('www') > -1) {
      db = this.state.domainName.substring(this.state.domainName.indexOf('.') + 1)
    } else {
      db = this.state.domainName
    }
    this.setState({ranDomId: Math.floor(Math.random() * 1000) + 1})

    fetch('https://' + this.state.domainName + '/web/session/authenticate', {
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
      this.setState({
        session_id: responseJson.result.session_id
      });
      this.props.navigation.navigate('Authentication_Page', {
          domainName: this.state.domainName.toLowerCase().trim(),
          username: this.state.username.toLowerCase().trim(),
          password: this.state.password,
          session_id: this.state.session_id
      });
    })
    .catch((error) => {
      // console.error(error)
    });
    // if (this.state.domainName === '' || this.state.username === '' || this.state.password === '') {

    // } else {
    //   this.props.navigation.navigate('Authentication_Page', {
    //     domainName: this.state.domainName.toLowerCase().trim(),
    //     username: this.state.username.toLowerCase().trim(),
    //     password: this.state.password
    //   });
    // }
  }

  checkDomainName = (domainName) => {
    fetch('https://' + this.state.domainName + '/web/webclient/version_info', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {
          context: {}
        },
        id: this.state.ranDomId + ""
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {

    })
    .catch((error) => {

    })
  }

  render() {
    return (
      <ImageBackground style={styles.wrapper} source={require('../../../images/background-landscape.png')}>
        
        <Container style={styles.wrapper}>
          
            <Content>
                <Image source={require('../../../images/w360s-logo.jpg')}
                    style={styles.imageLogo}
                  />
                <Form style={styles.formWrapper}>
                    <Item floatingLabel style={styles.inputTextWrapper}>
                      <Label>Company Domain Name</Label>
                      <Input autoCapitalize={'none'} style={styles.inputText}
                          autoCorrect={false}
                          // onBlur={(domainName) => this.checkDomainName(domainName)}
                          onChangeText={(domainName) => this.setState({domainName})}
                          value={this.state.domainName}/>
                    </Item>
                    <Item floatingLabel style={styles.inputTextWrapper}>
                        <Label>Username</Label>
                        <Input autoCapitalize={'none'} style={styles.inputText}
                            autoCorrect={false}
                            onChangeText={(username) => this.setState({username})}
                            value={this.state.username}/>
                    </Item>
                    <Item floatingLabel style={styles.inputTextWrapper}>
                        <Label>Password</Label>
                        <Input secureTextEntry={true} style={styles.inputText}
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}/>
                    </Item>
                    <Button full primary style={styles.buttonContainer}
                        onPress={() => this.login()}>
                        <Text>LOGIN</Text>
                    </Button>
                </Form>
            </Content>
        </Container>

        {/* <KeyboardAvoidingView behavior={this.state.behavior} style={styles.container}>
          <View
            style={{
              marginTop: 40,
              backgroundColor: 'rgba(255,255,255,0.9)',
              marginLeft: 20,
              marginRight: 20
            }}>
            <View style={styles.loginHeader}>
              <Text style={styles.loginHeaderLabel}>WCLOUD APPLICATION</Text>
            </View>

            <TextInput
              style={styles.inputText}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder="Company Domain Name"
              onChangeText={(domainName) => this.setState({domainName})}
              value={this.state.domainName}/>
            <TextInput
              style={styles.inputText}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder="Username"
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}/>
            <TextInput
              style={styles.inputText}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}/>
            <Text style={styles.errorLabel}>{this.state.error}</Text>
            <Button
              style={{
              marginTop: 10,
              marginBottom: 10
            }}
              title="Login"
              onPress={() => this.login()}/>
          </View>
        </KeyboardAvoidingView> */}
      
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: undefined,
    justifyContent: 'center',
    marginTop: 20
  },
  container: {
    paddingHorizontal: 20
  },
  imageLogo: {
    
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/2
  },
  contentWrapper: {
    flex: 1,
    width: undefined,
    justifyContent: 'center',
  },
  formWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    
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
    paddingLeft: 10,
    color: '#FFFFFF'
  },
  errorLabel: {
    color: '#FF0000',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  buttonContainer: {
    marginTop: 15,
  }
});
