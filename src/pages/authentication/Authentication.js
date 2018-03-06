import React, { Component } from 'react'
import { StyleSheet, Text, View, WebView } from 'react-native'

export default class Authentication extends Component {

  constructor(props) {
    super(props)
    const TAG = 'AUTHENTICATION'
    this.state = {
      url: 'http://' + this.props.navigation.state.params.domainName + '/web#login',
      domainName: this.props.navigation.state.params.domainName,
      session_id: this.props.navigation.state.params.session_id
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
        <WebView
          source={{uri: this.state.url}}
          javaScriptEnabled={true}
          injectedJavaScript={jsCode}
          onNavigationStateChange={ this.onNavigationStateChange.bind(this) }
          startInLoadingState={true}
          style={{
            marginTop: 20
          }}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
});