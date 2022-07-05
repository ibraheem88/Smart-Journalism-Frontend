import React,{ useState,useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Pressable,
  FlatList,
  ScrollView
} from 'react-native';
import MapView,{Marker,PROVIDER_GOOGLE} from 'react-native-maps';
import CustomMarker from "./marker"
import PostItem from './postItem'

let articles=[]
export default function ExploreByMap(props){

  const [selected, setSelected] = useState(null);
  const [list, setList] = useState([])

 
  const viewChanged = React.useRef(({viewableItems})=> {
    if(viewableItems.length>0){
        const selectedArticle=viewableItems[0].item
        setSelected(selectedArticle._id)
    }
})

  const viewabilityConfig = React.useRef({viewAreaCoveragePercentThreshold: 70})

  let listRef=React.useRef()
  let mapRef=React.useRef()

  useEffect(() => {
    getPosts()
  },[])

  const getPosts=async ()=>{
    fetch('http://10.113.60.188:5000/posts').then(
      res=>res.json())
    .then((data)=>{
      if(data)setList([...data.reverse()])}
      )
    .catch(err=>console.log(err))
}
  
  useEffect(() => {
    if(!selected || !listRef){
        return
      }
      const index=articles.findIndex(article=> article._id === selected)
      listRef.current.scrollToIndex({index})
      const selectedArticles=articles[index]
      const region={latitude: selectedArticles.coordinates.latitude,longitude: selectedArticles.coordinates.longitude,latitudeDelta: 0.8,
          longitudeDelta: 0.8}
      mapRef.current.animateToRegion(region)
  },[selected])

articles=list.filter(item=>{if(item.headline!="null" && item.coordinates!=undefined)return item})
    return(
      <View >
      <MapView
      ref={mapRef}
    initialRegion={{
      latitude: props.route.params.data.latitude,
      longitude: props.route.params.data.longitude,
      latitudeDelta: 0.9,
      longitudeDelta: 0.9,
    }}
    provider={PROVIDER_GOOGLE}
    style={{width: "100%",height: "100%"}}
  >{articles.map(article=><CustomMarker price={article.headline} coordinates={article.coordinates} selected={article._id === selected} onPress={()=>setSelected(article._id)} />)}</MapView>
  <View style={{position: 'absolute',bottom: 30}}>
  <FlatList
  ref={listRef}
  data={articles}
  keyExtractor={(item)=>item._id}
  renderItem={({item})=> <PostItem feed={item} navigation={props.navigation} />}
  horizontal
  viewabilityConfig={viewabilityConfig.current}
  onViewableItemsChanged={viewChanged.current}
  showsHorizontalScrollIndicator={false}
  snapToInterval={Dimensions.get('window').width-70}
  snapToAlignment={"center"}
  decelerationRate={"fast"}
  />
    </View>
      </View>
   
    );
}