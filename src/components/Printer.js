import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  NativeModules,
  Platform,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import RNPrint from 'react-native-print';

export default class PrintData extends Component {
  state = {
    selectedPrinter: null
  }

  // @NOTE iOS Only
  selectPrinter = async () => {
    try{
      const selectedPrinter = await RNPrint.selectPrinter()
      this.setState({ selectedPrinter })
    } catch (error) {
      alert(error);
    }
  }

  async printHTML() {
    try{
      await RNPrint.print({
        html: '<h1 style="text-align: center;"><strong>Hello Guys</strong></h1><p style="text-align: center;">Here is an example of pdf Print in React Native</p><p style="text-align: center;"><strong>Team About React</strong></p>'
      })
    } catch (error) {
      alert(error);
    }
  }  

  customOptions = () => {
    return (
      <View>
      <TouchableOpacity onPress={this.selectPrinter} style={styles.button}>
            <Text style={{ color: '#FFF', fontSize: 18 }}>
            Select Printer
            </Text>
        </TouchableOpacity>
    </View>

    )
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && this.customOptions()}
        <TouchableOpacity onPress={this.printHTML} style={styles.button}>
            <Text style={{ color: '#FFF', fontSize: 18 }}>
                Print
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
    instructions: {
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#2979FF',
        alignItems: 'center',
        padding: 12,
        width: 300,
        marginTop: 14,
        color: '#fff',
        fontSize: 18,
    },
})