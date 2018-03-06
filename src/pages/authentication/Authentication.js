import React, { Component } from 'react'
import { StyleSheet, Text, View, WebView } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base'

export default class Authentication extends Component {

  constructor(props) {
    super(props)
    const TAG = 'AUTHENTICATION'
    this.state = {
      url: 'about:blank',
      // url: 'http://' + this.props.navigation.state.params.domainName + '/web#login',
      domainName: '',
      session_id: ''
    }
  }  
  
  onNavigationStateChange(navState) { 
    // console.log(this.TAG, navState.url)
    // let domain = 'http://' + this.props.navigation.state.params.domainName + '/web#home'
    // let domain = 'http://' + this.props.domainName + '/web';
    let tempUrl = navState.url + ''

    // if (navState.url === domain) {
        
    // }

    if (tempUrl.indexOf('logout') > -1) {
      this.setState({url: 'about:blank'})
      // this.backToLogin()
      this.props.navigation.goBack()
    }
  }

  backToLogin() {
    this.props.navigator.push({
      name: 'Login',
      component: LoginContainer,
    });
  }

  render() {
    let jsCode = `document.cookie = 'session_id='` + this.state.session_id + `";`
    return (
      <View>
        <Content style={styles.container}>
          <Image source={require('../../../images/w360s-logo.jpg')}
              style={styles.imageLogo}
              resizeMode='contain'
            />
          <Form style={styles.formWrapper}>
              <Item floatingLabel error={this.state.domainNameError} style={styles.inputTextWrapper}>
                <Label>Company Domain Name</Label>
                <Input autoCapitalize={'none'} style={styles.inputText}
                    autoCorrect={false}
                    onBlur={(domainName) => this.checkDomainName(domainName)}
                    onChangeText={(domainName) => this.setState({domainName})}
                    value={this.state.domainName}/>
              </Item>
          </Form>
        </Content>
        <WebView
          source={{uri: this.state.url}}
          javaScriptEnabled={true}
          injectedJavaScript={jsCode}
          onNavigationStateChange={ this.onNavigationStateChange.bind(this) }
          startInLoadingState={true}
          style={styles.hiddenWebView}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  hiddenWebView: {
    width: 0,
    height: 0,
    marginTop: 20
  }
});