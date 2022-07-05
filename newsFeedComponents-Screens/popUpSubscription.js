import React,{ useState,useEffect,useImperativeHandle} from 'react';
import {View, StyleSheet,Text,Modal,Dimensions,Pressable, FlatList,Button,TouchableOpacity,Image} from 'react-native';
import {Ionicons} from "react-native-vector-icons"


export default PopUpSubscription=React.forwardRef((props,ref)=>{


    return (
        <Modal
        ref={ref}
        animationType='fade'
        visible={props.show}
        transparent={true}
        onRequestClose={props.onTouchOutside}
         >
        <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:'rgba(255,255,255,0.2)'}}>
          <View style={{backgroundColor: "#FFD580",width: '90%',height: Dimensions.get('window').height*0.7,borderRadius:10}}>   
          <TouchableOpacity onPress={props.onTouchOutside} style={{alignItems: "flex-end",paddingTop: 15,paddingRight: 15}}>
            <Ionicons name={"close-outline"} size={28}/>
          </TouchableOpacity>
          <Text style={{fontSize:17,paddingTop: 5,textAlign: "center",fontWeight: "500"}}>My Pay Plan</Text>
          <View style={{height: '70%',flexDirection: "row",justifyContent: "space-around",paddingTop: 20}}>
            <View style={{width: '45%',backgroundColor: "white",borderRadius: 5}}>
                <Text style={{fontSize:17,paddingTop: 10,fontWeight: "500",textAlign: "center"}}>Basic</Text>
                <View style={{flexDirection: "row",alignItems: "center"}}>
                <Text style={{padding: 10,fontSize:15}}>No Ads</Text>
                <Ionicons name={"checkmark"} size={20}/>
                </View>
                <View style={{flexDirection: "row",alignItems: "center"}}>
                <Text style={{padding: 10,fontSize:15}}>No Ads</Text>
                <Ionicons name={"checkmark"} size={20}/>
                </View>
                <View style={{flexDirection: "row",alignItems: "center"}}>
                <Text style={{padding: 10,fontSize:15}}>No Ads</Text>
                <Ionicons name={"checkmark"} size={20}/>
                </View>
            <View style={{flex:1,justifyContent: "flex-end"}}>
          <TouchableOpacity style={{alignSelf: "center",padding: 10,bottom: 10,backgroundColor: "orange",borderRadius: 10}}
          onPress={()=>{
              props.onTouchOutside()
              props.navigation.navigate('Subscription',{user: props.user})
          }}>
            <Text style={{fontSize:15}}>Get Basic</Text>
          </TouchableOpacity>
          </View>
            </View>
            <View style={{width: '45%',backgroundColor: "white",borderRadius: 5}}>
                <Text style={{fontSize:18,paddingTop: 10,fontWeight: "500",textAlign: "center"}}>Premium</Text>
                <View style={{flexDirection: "row",alignItems: "center"}}>
                <Text style={{padding: 10,fontSize:15}}>No Ads</Text>
                <Ionicons name={"checkmark"} size={20}/>
                </View>
                <View style={{flexDirection: "row",alignItems: "center"}}>
                <Text style={{padding: 10,fontSize:15}}>No Ads</Text>
                <Ionicons name={"checkmark"} size={20}/>
                </View>
                <View style={{flexDirection: "row",alignItems: "center"}}>
                <Text style={{padding: 10,fontSize:15}}>No Ads</Text>
                <Ionicons name={"checkmark"} size={20}/>
                </View>
            <View style={{flex:1,justifyContent: "flex-end"}}>
          <TouchableOpacity style={{alignSelf: "center",padding: 10,bottom: 10,backgroundColor: "orange",borderRadius: 10}}>
            <Text style={{fontSize:15}}>Get Premium</Text>
          </TouchableOpacity>
          </View>
            </View>
          </View>
          <Text style={{fontSize:16,padding: 10}}>Become a paid memeber and get access to our featured content</Text>
          </View>
        </View>
        </Modal>
    );
})