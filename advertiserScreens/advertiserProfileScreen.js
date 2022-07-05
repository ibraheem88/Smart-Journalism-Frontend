import React,{ useState,useEffect} from 'react';
import { logoutAdvertiser } from '../redux/actions';
import {connect} from "react-redux"
import {View, StyleSheet,Text,TouchableOpacity, Image} from 'react-native';

function AdvertiserProfile(props){

  const signout = async () => {
      props.logoutAdvertiser()
      props.navigation.replace("Auth")
  }

    return (
      <View style={{backgroundColor: "white",padding: 10,flex:1}}>
          <Text style={{color: "black",fontSize:30}}>Welcome </Text>
          <TouchableOpacity onPress={() => signout()} style={styles.button}>
          <Text style={{ fontSize: 18 }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    width: '50%',
    borderColor: "black",
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 2,
    marginVertical: 20
  }
});

const mapState=state=>{
  return {

  }
}
export default connect(mapState,{logoutAdvertiser})(AdvertiserProfile)