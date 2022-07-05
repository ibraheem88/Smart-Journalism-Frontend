import React,{ useState,useEffect } from 'react'
import {View,Text,Image} from 'react-native'
import moment from 'moment'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { Ionicons, Entypo} from '@expo/vector-icons';


export default function ChatMessage(props){

    const [sender, setSender] = useState('');
    const [image, setImage] = useState('https://lh3.googleusercontent.com/proxy/n8DBYcGSsu1kooWk6BV00MQXpl7scmyvwlIDsgzcP72YADw8R5GW0RI-zgCTu3e19LrunYEk73uWA86YjeHNv0MVIg');
    const [document, setDocument] = useState(undefined);

  const isMyMessage=()=>{
        return props.currentUser===props.message.sentBy
    }

    return(
        <View style={{ padding: 10, paddingHorizontal: 16 }}>
        {props.message.type != 'text' ? (
          <View
            style={[
              { paddingHorizontal: 4,paddingVertical: 3, borderRadius: 5 },
              isMyMessage()
                ? {
                    backgroundColor: '#DCF8C5',
                    alignSelf: 'flex-end',
                    marginLeft: 60,
                  }
                : {
                    backgroundColor: 'white',
                    marginRight: 60,
                    alignSelf: 'flex-start',
                  },
            ]}>
            {!isMyMessage() && (
              <Text style={{ color: 'lightgreen', fontWeight: 'bold' }}>
                {props.message.sentBy}
              </Text>
            )}
            {props.message.type==='image' ?
              <Image
              source={{uri: "http://10.113.60.188:5000/upload/messages/"+props.message.image}}
              style={{ width: 280, height: 280,marginVertical: 2 }}
            /> :
              <View style={{flexDirection: "row",marginTop: 7,alignItems: "center"}}>
              <Ionicons
              name="document-text-outline"
              size={24}
              color="black"/>
              <Text style={{ marginTop: 5,marginHorizontal: 5 }}>{props.message.name}</Text>
              {document &&
              (<Ionicons
              name="download-outline"
              onPress={()=>downloadDocument()}
              size={24}
              color="blue"/>)
              }
              </View>
            }
            <Text style={{fontSize: 14 }}>
            {props.message.message}
            </Text>
            <Text style={{ alignSelf: 'flex-end', color: 'grey',fontSize: 14 }}>
              {moment(props.message.createdAt).fromNow()}
            </Text>
          </View>
        ) : (
          <View
            style={[
              { padding: 8,paddingVertical: 5, borderRadius: 5 },
              isMyMessage()
                ? {
                    backgroundColor: '#DCF8C5',
                    alignSelf: 'flex-end',
                    marginLeft: 60,
                  }
                : {
                    backgroundColor: 'white',
                    marginRight: 60,
                    alignSelf: 'flex-start',
                  },
            ]}>
            {!isMyMessage() && (
              <Text style={{ color: 'lightgreen', fontWeight: 'bold' }}>
                {props.message.sentBy}
              </Text>
            )}
              <Text style={{ marginTop: 5 }}>{props.message.message}</Text>
            <Text style={{ alignSelf: 'flex-end', color: 'grey',fontSize: 14 }}>
              {moment(props.message.createdAt).fromNow()}
            </Text>
          </View>
        )}
      </View>
    
    )
}