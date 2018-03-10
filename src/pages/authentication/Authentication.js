import React, { Component } from 'react'
import { StyleSheet, View, WebView, Image, Dimensions, Keyboard, Platform } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Constants } from '../../Constants'

export default class Authentication extends Component {

  constructor(props) {
    super(props)
    const TAG = 'AUTHENTICATION'
    this.state = {
      domainName: '',
      session_id: '',
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

  _keyboardDidShow () {
    // alert('Keyboard Shown');
  }

  _keyboardDidHide () {
    // alert('Keyboard Hidden');
  }

  checkDomainName = (domainName) => {
    Keyboard.dismiss()
    if (domainName !== '') {
      this.setState({
        ranDomId: Math.floor(Math.random() * 1000) + 1,
        domainNameError: false,
        error: false,
      })
      let url = 'http://' + this.state.domainName + '/web/webclient/version_info'
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
            context: {}
          },
          id: this.state.ranDomId + ""
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          domainNameError: false,
          error: false
        })
        this.props.navigation.navigate('Login_Page', {
          domainName: this.state.domainName.toLowerCase().trim()
        });
      })
      .catch((error) => {
        this.setState({
          domainNameError: true,
          error: true
        })
      })
    } else {
      this.setState({
        domainNameError: true,
        error: true
      })
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Image source={require('../../../images/logo.png')}
          style={styles.imageLogo}
          resizeMode='contain'/>
        <Content style={styles.container}>
          <Form style={styles.formWrapper}>
              <Item error={this.state.domainNameError} style={styles.inputTextWrapper}>
                <Input autoCapitalize={'none'} style={styles.inputText}
                    autoCorrect={false}
                    onChangeText={(domainName) => this.setState({domainName})}
                    value={this.state.domainName}
                    placeholder='Enter your company domain'/>
                <Icon name="chevron-right" style={styles.nextBtn} 
                  onPress={(domainName) => this.checkDomainName(domainName)} />
              </Item>
              {this.state.domainNameError && <Text style={styles.errorLabel}>Your company domain not valid or you do not have wlcoud account yet. Please contact support for assistant</Text>}
          </Form>
        </Content>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: undefined,
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  container: {
    width: Dimensions.get('window').width,
    
    marginRight: 15,
  },
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  imageLogo: {
    width: Dimensions.get('window').width/2,
    alignSelf: 'center',
  },
  inputText: {
    height: 40,
    color: '#000000',
    backgroundColor: '#ebebeb',
    textAlign: 'center',
    alignSelf: 'center',
  },
  nextBtn: {
    color: 'black',
    fontSize: 16,
    fontWeight: "300",
    position: 'absolute',
    right: 0,
    marginRight: 10,
  },
  errorLabel: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 5,
    width: Dimensions.get('window').width - 10,
  },
});