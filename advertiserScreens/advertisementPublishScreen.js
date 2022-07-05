import React,{ useState,useEffect } from 'react';
import { Text, View, Image, ScrollView, TextInput, Button } from 'react-native';
import uuid from 'react-native-uuid';


export default function AdvertisementPublishScreen(props){

  const [image, setImage] = useState(props.route.params.image)
  const [file, setFile] = useState({})
  const [text, setText] = useState(props.route.params.text);

  const handleText = (text) => {
    setText(text);
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerTitleStyle: { fontWeight: 'bold' },
      headerRight: (props) => (
        <View style={{ marginRight: 10 }}>
          {file && <Button title="Post Ad" color="blue" onPress={() => post()} />}
        </View>
      ),
    });
    getBlob()
  },[image])

 const getBlob=async ()=>{
    const response=await fetch(props.route.params.image)
    const blob=await response.blob()
    const type=blob['_data'].type
    const typef=type.replace('image/','')
    const file = {
      uri: props.route.params.image,
      name: uuid.v4()+'.'+typef,
      type: blob['_data'].type
    }
    setFile(file)
  }

  post = async () => {
    const data = new FormData();
    data.append('text', props.route.params.text)
    data.append('company', props.route.params.advertiser.company)
    data.append('authorName', props.route.params.advertiser.name)
    data.append('authorImage', props.route.params.advertiser.imageUri)
    data.append('postedBy', props.route.params.advertiser._id)
    data.append('image', file)
    data.append('days', props.route.params.days)
    fetch('http://10.113.60.188:5000/newadvertisement',{
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: data
    }).then((res)=>
        props.navigation.navigate('Advertiser Feed')
    ).catch(err=>console.log(err))
  };

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View
          style={{
            flexDirection: 'row',
            height: 100,
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 1,
            padding: 16,
          }}>
          <Image
            source={{ uri: image }}
            style={{ width: 65, height: 65 }}
          />
          <TextInput
            placeholder="Write a caption..."
            placeholderTextColor="grey"
            style={{
              marginLeft: 10,
              width: '80%',
              height: '100%',
              paddingBottom: 40,
              fontSize: 15,
              color: 'black',
            }}
            onChangeText={(text)=>handleText(text)}
            value={text}
          />
        </View>
        <View
          style={{
            padding: 20,
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 1,
          }}>
          <Text style={{ fontSize: 15, fontWeight: '500' }}>Add Location</Text>
        </View>
        <View
          style={{
            padding: 20,
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 1,
          }}>
          <Text style={{ fontSize: 15, fontWeight: '500' }}>
            Post to Other Accounts
          </Text>
        </View>
      </View>
    )
}