import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      url: 'http://' + this.props.domainName + '/web#home'
    }
  }

  onNavigationStateChange(navState) { 
    // let domain = 'http://' + this.props.domainName + '/web';
    // if (navState.url == (domain + '/logout/session')) {
    //     this.backToLogin()
    //     this.setState({url: ''})
    // } else if (navState.url == (domain + '/login#home')) { 
    //   navState.url = domain + '#home'
    // }
  }

  backToLogin() {
    // this.props.navigator.push({
    //   name: 'Login',
    //   component: LoginContainer,
    // });
  }

  render() {
    return (<WebView
      source={{uri: this.state.url}}
      onNavigationStateChange={ this.onNavigationStateChange.bind(this) }
      startInLoadingState={true}
      style={{
        marginTop: 0
    }}/>)
  }
}

const styles = StyleSheet.create({
});
