import React,{ useState,useEffect } from 'react';
import { Text,FlatList,TouchableOpacity,StyleSheet,RefreshControl,Platform,View } from 'react-native';
import {connect} from "react-redux"


function AdvertiserFeed(props){

  const getHeader = () => (
  <TouchableOpacity
        style={{width: 100,
            backgroundColor: "black",
            borderWidth: 1,
            justifyContent: "center",
            alignSelf: "center",
            margin: 5,
            borderRadius: 20,
            height: 50,
            width:'40%',
            marginTop: 35}}
            onPress={()=>props.navigation.navigate("Place Advertisement",{advertiser: advertiser})}
        >
        <Text style={styles.btnText}>Post Advertisement</Text>
    </TouchableOpacity>
  );
  
    const [advertiser, setAdvertiser] = useState(props.advertiser);
    const [advertisements, setAdvertisements] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
  
    const refresh=()=>{
      setRefreshing(true)
      getAdvertisements().then(() => {
        setRefreshing(false);
      });
  }
  
  
  
  useEffect(() => {
      getAdvertisements()
    },[])

  
    const getAdvertisements=async ()=>{
          fetch('http://10.113.60.188:5000/advertisements').then(
            res=>res.json())
          .then((data)=>{
            if(data)setAdvertisements([...data.reverse()])
          console.log(data)}
            )
          .catch(err=>console.log(err))
    }
  
    return (
      <FlatList
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={()=>refresh()} />
          }
      style={{backgroundColor: "white"}}
      data={advertisements}
      keyExtractor={(item)=>item._id}
      renderItem={({item})=>
      <View>
      </View>
      }
      ListHeaderComponent={getHeader()}
      />
    )
  }
  
  const styles=StyleSheet.create({
      input: {
      borderRadius: 25,
      fontSize: 15,
      borderWidth: 1,
      margin: 5,
      padding: 15,
    },
    button:{
      backgroundColor: "black",
      marginTop: 20,
      borderRadius: 25,
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
      padding: 20,
      justifyContent: 'center',
    },
  
  })
  
  const mapState=state=>{
    return {
      advertiser: state.user.advertiser
    }
  }
  export default connect(mapState,{})(AdvertiserFeed)