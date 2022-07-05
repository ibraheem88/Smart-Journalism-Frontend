import React,{ useState,useEffect,useCallback } from 'react';
import { Text,FlatList,TouchableOpacity,StyleSheet,RefreshControl,Platform,View } from 'react-native';
import { updateUser } from '../redux/actions';
import {connect} from "react-redux"
import NYTArticle from '../newsFeedComponents-Screens/NYTArticleComponent';

function GlobalCategoryFeed(props){
  let uri='';

const [articles, setArticles] = useState(null);

useEffect(() => {
  if(props.route.params.category=="Travel"){
    uri="https://newsapi.org/v2/everything?q=travel&language=en&apiKey=c0e3838931ba4586a2eae271cebdd7f1"
  }
  else if(props.route.params.category=="Science" || props.route.params.category=="Business" || props.route.params.category=="Sports" || props.route.params.category=="Health" || props.route.params.category=="Entertainment"){
    uri=`https://newsapi.org/v2/top-headlines?category=${props.route.params.category}&language=en&apiKey=c0e3838931ba4586a2eae271cebdd7f1`
  }
  else{
    uri=`https://newsapi.org/v2/everything?q=${props.route.params.category}&language=en&apiKey=c0e3838931ba4586a2eae271cebdd7f1`
  }
    getArticles()
  },[])

  const getArticles=async ()=>{
    fetch(uri,{
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

const mapState=state=>{
  return {
      
  }
}
export default connect(mapState,{})(GlobalCategoryFeed)