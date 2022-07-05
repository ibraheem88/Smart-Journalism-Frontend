import React,{ useState,useEffect,useImperativeHandle} from 'react';
import {View, StyleSheet,Text,Modal,Dimensions,Pressable, FlatList,Button,TouchableOpacity,Image} from 'react-native';


export default PopUpLikes=React.forwardRef((props,ref)=>{

  const [likedBy, setLikedBy] = useState(props.likedBy)

    return (
        <Modal
        ref={ref}
        animationType='fade'
        visible={props.show}
        transparent={true}
        onRequestClose={props.onTouchOutside}
         >
        <View style={{flex:1,justifyContent:"flex-end",alignItems:"center",backgroundColor:'rgba(255,255,255,0.2)'}}>
          <Pressable style={{height:'100%',width: "100%"}} onPress={props.onTouchOutside}>
          </Pressable>
          <View style={{backgroundColor: "black",width: '100%',justifyContent: "center",height: Dimensions.get('window').height*0.5,borderTopRightRadius:10,borderTopLeftRadius:10,borderTopColor: "white",borderTopWidth: 1}}>
          <FlatList
            data={props.users}
            renderItem={({item})=> {if(likedBy.indexOf(item._id)>-1) return(<TouchableOpacity style={{paddingTop: 25,padding: 10,paddingLeft: 15,flexDirection: "row",justifyContent: "space-between",borderBottomColor: "white",borderBottomWidth: 0.5}}>
            <View style={{flexDirection: "row"}}>
            <Image source={{uri: "http://10.113.60.188:5000/upload/"+item.imageUri}} style={{width:50,height: 50,borderRadius: 50}}/>
            <View style={{flexDirection: "column",marginLeft: 10,marfinTop: 10}}>
            <Text style={{fontWeight: "bold",fontSize: 15,color:"white"}}>{item.name}</Text>
            </View>
            </View>
    
            </TouchableOpacity>)}}
            keyExtractor={(item,index)=>index.toString()}
    />
    </View>
        </View>
        </Modal>
    );
})