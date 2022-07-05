import React,{ useState,useEffect,useCallback } from 'react';
import { Text,FlatList,TouchableOpacity,StyleSheet,RefreshControl,Platform,View } from 'react-native';
import { updateUser } from '../redux/actions';
import {connect} from "react-redux"
import NYTArticle from './NYTArticleComponent';

function NYTFeedScreen(props){

const [articles, setArticles] = useState(null);

useEffect(() => {
    getNYTArticles()
  },[])

  const getNYTArticles=async ()=>{
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=c0e3838931ba4586a2eae271cebdd7f1',{
      method: "GET"
    }).then(
      res=>res.json())
    .then((data)=>{
      setArticles(data.articles)
      }
      )
    .catch(err=>console.log(err))
}


  return (
    <FlatList
    style={{backgroundColor: "white"}}
    data={articles}
    removeClippedSubviews={true}
    keyExtractor={(item)=>item.url}
    renderItem={useCallback(({ item }) => {
      return <NYTArticle article={item} navigation={props.navigation} key={item}/>
  })}
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
      
  }
}
export default connect(mapState,{})(NYTFeedScreen)