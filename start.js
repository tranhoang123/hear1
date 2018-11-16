
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts'
import { Client, Message } from 'react-native-paho-mqtt';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class start extends Component<Props> {
	static navigationOptions = {
    title:"Đo",
    headerStyle:{
    	backgroundColor: "#ff9ff3"
    }
  	};
  	constructor(props){
    	super(props);
    	this.state={
      		SpoString: "--",
      		PRbString: "--",
      		warning: "",
      		o2P: 0,
      		nhiptimP: 0,
      		c1: "#474787",
      		c2: "#474787"
    }
  }
  parseData = (data) =>{
    var s = data.indexOf("*");
    if(s == -1) return;
    var a = data.indexOf("&");
    if(a == -1) return;
    var t = data.indexOf("#");
    if(t == -1) return;
    var nhiptim = data.slice(s+1, a);
    var o2 = data.slice(a+1, t);
    var o2PP = parseFloat(o2)/150;
    var nhiptimPP = parseFloat(nhiptim)/150;
    //console.log("o2 "+o2PP+", ")
    this.setState({SpoString : o2, PRbString : nhiptim, o2P: o2PP, nhiptimP: nhiptimPP});
    this.warning({o2p : o2, nhiptimP: nhiptim});
  }
  warning = (data) =>{
    if(data.nhiptimP > 130 ) {
      this.setState({warning: "Nhịp tim cao", c1:"#eb2f06"});
    }else if(data.nhiptimP < 45){
      this.setState({warning: "Nhịp tim thấp"});
    }else{
      this.setState({warning: "", c1:"#474787"});
    }
  }
  componentDidMount(){
    const myStorage = {
      setItem: (key, item) => {
        myStorage[key] = item;
    },
      getItem: (key) => myStorage[key],
      removeItem: (key) => {
        delete myStorage[key];
    },
  };

// Create a client instance
const client = new Client({ uri:'wss://m15.cloudmqtt.com:34655/mqtt', clientId: 'web_83434287hshd6e2', storage: myStorage }); // chỗ này liên kết nè, sau đó nó phát ra một sự kiện nào đó ở bên dưới

// set event handlers
client.on('connectionLost', (responseObject) => { 
  if (responseObject.errorCode !== 0) {
    console.log(responseObject.errorMessage);
  }
});
client.on('messageReceived', (message) => { 
  const data = message.payloadString;
  console.log(data);
  this.parseData(data); 
});

var options = {
  userName: "eofoyfkw",
  password:"qePnaMIrUD0d",
  timeout :30000,
  cleanSession : true,
  mqttVersion : 3.1,
}
client.connect(options) 
  .then(() => {   
    console.log('onConnect');
    return client.subscribe('nhinguyen/Vietnam'); 
  })
  .catch((responseObject) => { 
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
  });
  }
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.chart}>
        <View style={styles.chart1}>
        <Text style={{position: 'absolute', paddingTop: 65, fontSize: 30, color:"red"}}>{this.state.PRbString}</Text>
            <ProgressCircle
                style={ { height: 190, width: 195 } }
                progress={ this.state.nhiptimP }
                progressColor={this.state.c1}
                startAngle={ -Math.PI * 0.8 }
                endAngle={ Math.PI * 0.8 }
              >
            </ProgressCircle>
            <Text style={{position: 'absolute', fontSize: 25, paddingTop: 170}}>PRbmp (b/m)</Text>
          </View>
          <View style={styles.chart2}>
          <Text style={{position: 'absolute', paddingTop: 135, fontSize: 30, color:"red"}}>{this.state.SpoString}</Text>
            <ProgressCircle
                style={ { height: 190, width: 195 } }
                progress={ this.state.o2P }
                progressColor={this.state.c2}
                startAngle={ -Math.PI * 0.8 }
                endAngle={ Math.PI * 0.8 }
              >
            </ProgressCircle>
            <Text style={{position: 'absolute', fontSize: 25, paddingTop: 230 }}>SpO2 (%)</Text>
            <Text style={{position: 'absolute', fontSize: 25, paddingTop: 295, color:"#e67e22" }}>{this.state.warning}</Text>
          </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header:{
    flex: 1,
    //color: "#44bd32",
    //backgroundColor: "#95a5a6",
    //borderWidth: 1
  },
  chart:{
    //flexDirection: "row",
    //borderWidth: 1,
    //height: 200,
    //flex:1
    marginTop: 50,

  },
  chart1:{
    alignItems: "center",
    //borderWidth: 1,
    flex: 2.5
  },
  chart2:{
    alignItems: "center",
    paddingTop: 60,
    flex: 4,
    alignContent: "center",
    //borderWidth: 1,
    //justifyContent: 'center',
  },
  result:{
    flex:1,
    //borderWidth: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
