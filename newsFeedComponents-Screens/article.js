import React,{ useState,useEffect} from 'react';
import {View} from 'react-native';
import ArticleBody from './articleComponent'
import ArticleFooter from "./articleFooter"


export default function Article(props){

  return (
    <View>
    <ArticleBody article={props.article} navigation={props.navigation}/>
    <ArticleFooter article={props.article} navigation={props.navigation} user={props.user} users={props.users} key={JSON.stringify(props.article)}/>
    </View>
  )
}