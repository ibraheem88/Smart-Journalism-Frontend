import React,{ useState,useEffect } from 'react';
import {View,Text,StyleSheet,KeyboardAvoidingView,TextInput,TouchableOpacity,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function Register(props){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [image, setImage] = useState('');
  const [degree, setDegree] = useState('');
  const [institiute, setInstitute] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState(props.route.params.type);


  const handleEmail = (email) => {
      setEmail(email);
  };
  const handlePassword = (password) => {
      setPassword(password);
  };
  const handleDegree = (degree) => {
    setDegree(degree);
  };
  const handleInstitute = (institute) => {
    setInstitute(institute);
  };
  const handleYear = (year) => {
    setYear(year);
  };
  const handleFirstName = (firstname) => {
    setFirstName(firstname);
  }
  const handleLastName = (lastname) => {
    setLastName(lastname);
  };
  const handleCompany = (company) => {
    setCompany(company);
  };

  const registerAdvertiser = async() => {
    const data = new FormData();
    data.append('name', firstname+" "+lastname)
    data.append('email', email)
    data.append('password', password)
    data.append('imageUri', image)
    data.append('company', company)
    fetch('http://10.113.60.188:5000/signupAdvertiser',{
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: data
    }).then(
        res=>res.json()
    ).then(async data=>{
        try {
            await AsyncStorage.setItem('advertiserToken', data.token)
            props.navigation.replace('AdvertiserTabs')
          } catch (e) {
            console.log(e)
          }
    }).catch(err=>console.log(err))
  }

  const register = async() => {
    if(type=="advertiser"){
      registerAdvertiser()
      return
    }
    const data = new FormData();
    data.append('name', firstname+" "+lastname)
    data.append('email', email)
    data.append('password', password)
    data.append('education', {institiute: institiute,degree: degree,year: year})
    data.append('imageUri', image)
    if(type=='publisher'){
    data.append('approved', false) 
    }
    data.append('type', type)
    fetch('http://10.113.60.188:5000/signup',{
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: data
    }).then(
        res=>res.json()
    ).then(async data=>{
        try {
            await AsyncStorage.setItem('token', data.token)
            props.navigation.replace('MainTabs')
          } catch (e) {
            console.log(e)
          }
    }).catch(err=>console.log(err))
  }

  const addPhoto=async() => {
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
      name: blob['_data'].name,
      type: blob['_data'].type
    }
    setImage(file)
  }catch(err){
    console.log(err)
  }
  }

    return (
      <View style={{backgroundColor: "white",flex: 1}}>
        <Image style={{flex:1,resizeMode: "cover",opacity: 0.6,backgroundColor: "#b5e2ff"}} source={{uri: "https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"}} />
      <View style={{alignSelf: "center",position:"absolute",top:50}}>
       <Text style={{color: "black",fontSize: 30}}>Register</Text>
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TextInput
          value={firstname}
          placeholder={"First Name"}
          placeholderTextColor={"black"}
          style={styles.input}
          onChangeText={(firstname)=>handleFirstName(firstname)}
        />
      <TextInput
          value={lastname}
          placeholder={"Last Name"}
          placeholderTextColor={"black"}
          style={styles.input}
          onChangeText={(lastname)=>handleLastName(lastname)}
        />
        {(type=="publisher" || type=="consumer") && <TextInput
          value={institiute}
          placeholder={"Institute"}
          placeholderTextColor={"black"}
          style={styles.input}
          onChangeText={(institute)=>handleInstitute(institute)}
        />}
        {(type=="publisher" || type=="consumer") && <View style={{flexDirection: "row"}}>
        <TextInput
          value={degree}
          placeholder={"Degree"}
          placeholderTextColor={"black"}
          style={[styles.input,{width: "48%"}]}
          onChangeText={(degree)=>handleDegree(degree)}
        />
        <TextInput
          value={year}
          placeholder={"Graduation Year"}
          placeholderTextColor={"black"}
          style={[styles.input,{width: "48%"}]}
          onChangeText={(year)=>handleYear(year)}
        />
        </View>}
      {type=="advertiser" && <TextInput
          value={company}
          placeholder={"Company Name"}
          placeholderTextColor={"black"}
          style={styles.input}
          onChangeText={(company)=>handleCompany(company)}
        />}
        <TextInput
          value={email}
          placeholder={"Email"}
          placeholderTextColor={"black"}
          style={styles.input}
          onChangeText={(email)=>handleEmail(email)}
        />
        <TextInput
          value={password}
          placeholder={"Password"}
          placeholderTextColor={"black"}
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(password)=>handlePassword(password)}
        />
        <TouchableOpacity
          style={{width: '50%',
              backgroundColor: "black",
              borderWidth: 1,
              justifyContent: "center",
              margin: 5,
              borderRadius: 25,
              height: '15%',
              marginTop: 35}}
          onPress={()=> addPhoto()}>
          <Text style={styles.btnText}>Add Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={()=>register()} >
        <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      </View>
    )
}

const styles=StyleSheet.create({
    input: {
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    margin: 5,
    padding: 15,
  },
  button:{
    backgroundColor: "black",
    marginTop: 20,
    borderRadius: 12,
    fontSize: 20,
    borderWidth: 1,
    margin: 5,
    padding: 10,
    shadowColor: "black"
},
btnText:{
  color: "white",
  textAlign: "center"
},
  container: {
    top:100,
    right:0,
    left:0,
    padding:20,
    alignSelf: 'center',
    position:"absolute"
  },

})