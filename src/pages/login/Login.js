import React, { Component } from 'react'
import { StyleSheet, Text, View,
  TextInput,
  Button,
  WebView,
  KeyboardAvoidingView,
  ImageBackground } from 'react-native'

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      domainName: 'w360s.com.vn',
      username: '',
      password: '',
      error: '',
      behavior: 'padding',
      session_id: ''
    }
  }

  login = () => {
    fetch('http://w360s.com.vn/web/session/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {
          db: "w360s.com.vn",
          login: "nguyenpap@w360s.com",
          password: "P@ssword123",
          context: {}
        },
        id: "1234"
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
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
      console.error(error)
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

  render() {
    return (
      <ImageBackground style={styles.wrapper} source={require('../../../images/background-landscape.png')}>
      
        <KeyboardAvoidingView behavior={this.state.behavior} style={styles.container}>
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
        </KeyboardAvoidingView>
      
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
    paddingLeft: 10
  },
  errorLabel: {
    color: '#FF0000',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10
  }
});
