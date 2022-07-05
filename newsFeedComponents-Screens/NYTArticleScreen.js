import * as React from 'react';
import { WebView } from 'react-native-webview';


export default function NYTArticle(props){
const article=props.route.params.article
  return (
    <WebView
      originWhitelist={['*']}
      source={{ uri: article.url }}
    />
  )
}