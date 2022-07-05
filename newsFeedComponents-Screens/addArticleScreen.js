import React,{ useState,useEffect } from 'react';
import { Text, View,Image,ScrollView,FlatList,TouchableOpacity,Button,TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Ionicons} from "react-native-vector-icons"

export default function AddArticleScreen(props){

  const [text, setText] = useState('');
  const [headline, setHeadline] = useState('')
  const [image, setImage] = useState();

  useEffect(() => {
    props.navigation.setOptions({
    headerTitleStyle: {fontWeight: "bold"},headerLeft: ()=>(<Ionicons name="close-outline" size={40} style={{marginLeft: 15}} onPress={()=>props.navigation.goBack()
}/>),headerRight: ()=>(<View style={{marginRight: 10}}>{(text.length>100 && image) && <Button title={"Next"} onPress={()=>props.navigation.navigate("Publish Article",{image: image,headline: headline,user: props.route.params.user,text:text})} />}</View>),gestureEnabled: false
  })
  })

  const handleText = (text) => {
    setText(text);
  };
  const handleHeadline = (headline) => {
    setHeadline(headline);
  };

  const getImage = async () => {
    const permissions=await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissions.status !== 'granted') {
      alert('Permission for gallery not granted!');
      return;
    }
    try{
    const result =await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })
    if(result.type=='image'){
      setImage(result.uri)
    }
    } catch (err) {
      console.log(err);
    }

  };



  return (
    <ScrollView style={{flex: 1,backgroundColor: "white"}}>
                <TextInput
            placeholder="Add Article Headline..."
            placeholderTextColor="grey"
            style={{
              width: '95%',
              marginTop: 30,
              backgroundColor: "#EBECF0",
              height: image ? 50 : 100,
              paddingHorizontal: 10,
              borderRadius: 5,
              alignSelf: "center",
              fontSize: 17,
              color: 'black'
            }}
            multiline
            onChangeText={(headline)=>handleHeadline(headline)}
            value={headline}
          />
          <TextInput
            placeholder="Type Article Text Here..."
            placeholderTextColor="grey"
            style={{
              width: '95%',
              marginTop: 30,
              height: image ? 100 : 200,
              backgroundColor: "#EBECF0",
              borderRadius: 5,
              paddingHorizontal: 10,
              alignSelf: "center",
              fontSize: 17,
              color: 'black'
            }}
            multiline
            onChangeText={(text)=>handleText(text)}
            value={text}
          />
          {image && <Image
            source={{ uri: image }}
            style={{ width: "100%", height: 400,marginTop: 20,alignSelf: "center"}}
          />}
          <TouchableOpacity
          style={{width: 150,
          backgroundColor: "black",
          borderWidth: 1,
          justifyContent: "center",
          alignSelf: "center",
          margin: 5,
          borderRadius: 20,
          height: 50,
          marginVertical: 35}}
          onPress={()=>getImage()}
      >
      <Text style={{  color: "white",
  textAlign: "center"}}>Add Photo</Text>
  </TouchableOpacity>
    </ScrollView>
  )
}
