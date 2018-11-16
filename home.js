'use strict';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ImageBackground } from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
export default class home extends Component<Props>{
	static navigationOptions = {
    header:null,
  	};
	render(){
		//const {navigate} = this.props.navigation;
		return(
	<ImageBackground style={ styles.imgBackground } 
                 resizeMode='cover' 
                 source={require('./image/bg.png')}>
			<View style={styles.container}>
			<View style={styles.button}>
				<TouchableOpacity style={styles.press} onPress={()=>this.props.navigation.navigate("Start")}>
					
					<Image source={require('./image/power1.png')}/>
				</TouchableOpacity>
			</View>
			</View>
			</ImageBackground>
			)
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
	},
	thanhvien:{
		flex:4,
		marginTop: 35
	},
	details:{
		flex: 1,
		alignContent: "center",
		alignItems: "center",
		justifyContent: 'center',
		borderRadius:25
	},
	button:{
		flex: 3,
		justifyContent: 'center',
		// borderWidth:1,
		alignContent: "center",
		alignItems: "center",
		marginTop: 150
	},
	text:{
		color: "rgba(255,255,255,0.9)",
		fontSize: 20
	},
	text1:{
		color: "rgba(255,255,255,0.9)",
		fontSize: 15
	},
	press:{
		//borderWidth: 1,
		width: 62,
		height: 62,
		alignContent: "center",
		alignItems: "center",
		justifyContent: 'center',
		//borderRadius: 150,
		//backgroundColor: "#e84118"
	},
	imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1,
},
})

