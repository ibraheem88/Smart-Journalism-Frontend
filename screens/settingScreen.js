import React,{ useState,useEffect } from 'react';
import {connect} from "react-redux"
import { logout } from '../redux/actions';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  StyleSheet,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';


function SettingScreen(props){

  const [imageFile, setImageFile] = useState('');
  const [image, setImage] = useState("http://10.113.60.188:5000/upload/"+props.route.params.user.imageUri);

  uploadPhoto = () => {
    const data = new FormData();
    data.append('_id', props.route.params.user._id)
    data.append('imageUri', imageFile)
    fetch('http://10.113.60.188:5000/changeProfile',{
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: data
    }).then(
        ()=>console.log("Profile photo updated!")
    ).catch(err=>console.log(err))
  };

  changePhoto = async () => {
    const permissions=await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissions.status !== 'granted') {
      alert('Permission for gallery not granted!');
      return;
    }
    try{
    const result =await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    })
    const response=await fetch(result.uri)
    const blob=await response.blob()
    const file = {
      uri: result.uri,
      name: props.route.params.user.imageUri,
      type: blob['_data'].type
    }
    setImage(file.uri)
    setImageFile(file)
    uploadPhoto()
    } catch (err) {
      console.log(err);
    }

  };

  const signout = async () => {
    props.logout()
    props.navigation.replace("Auth")
  }

    return (
      <ScrollView style={{ backgroundColor: "white",flex: 1}}>
        <Image source={{ uri: image }} style={styles.image} />
        <TouchableOpacity style={{alignSelf: "center",marginVertical: 14}} onPress={() => changePhoto()} ><Text style={{color: "#2a9df4",fontWeight: "bold"}}>Change Profile Photo</Text></TouchableOpacity>
        <View style={{borderTopWidth: 1,borderColor: "#EBECF0",borderBottomWidth: 1,padding: 10}}>
        <View style={styles.textContainer}>
         <Text style={styles.heading}>Name</Text>
         <View style={{width: '78%',marginLeft: "14%",height: '100%',borderBottomColor: "#EBECF0",borderBottomWidth: 1}}>
         <Text style={styles.text}>{props.route.params.user.name}</Text>
         </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Email</Text>
          <View style={{width: '78%',marginLeft: "14%",height: '100%',borderBottomColor: "#EBECF0",borderBottomWidth: 1}}>
          <Text style={styles.text}>{props.route.params.user.email}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Website</Text>
          <View style={{width: '78%',marginLeft: "10%",height: '100%',borderBottomColor: "#EBECF0",borderBottomWidth: 1}}>
          <Text style={styles.text}></Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Bio</Text>
          <View style={{width: '78%',marginLeft: "18%"}}>
          <Text style={styles.text}>Just a traveller wandering around the world !</Text>
          </View>
        </View>
        </View>
        <TouchableOpacity style={{marginVertical: 14,marginLeft: 10}}><Text style={{color: "#2a9df4",fontWeight: "500",fontSize: 15}}>Personal Information Settings</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => signout()} style={styles.button}>
          <Text style={{ fontSize: 18 }}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    padding: 5,
  },
  heading: {
    fontWeight: "500",
    paddingBottom: 5
  },
  textContainer: {
    margin: 15,
    marginLeft: 5,
    flexDirection: "row",
    alignItems: 'center'
  },
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
  },
  image: {
    height: "16%",
    aspectRatio: 1,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 75,
  },
});

const mapState=state=>{
  return {
    
  }
}
export default connect(mapState,{logout})(SettingScreen)
