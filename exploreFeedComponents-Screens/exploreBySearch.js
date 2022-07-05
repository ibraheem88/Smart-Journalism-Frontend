import * as React from 'react';
import Constants from 'expo-constants';
import GeoDBCitiesSearch from 'react-native-geodb';
import SearchItem from "./searchItem"

export default function ExploreSearchScreen(props){
    return(
        <GeoDBCitiesSearch
  debounce={200}
  placeholder="Search cities"
  placeholderTextColor="#f5f5f5"
  onSelectItem={(data) => console.log(data.city)}
  onError={(err)=>console.log(err)}
  query={{
    api: 'geo',
    types: 'cities'
  }}
  params={{
    language: 'en',
    limit: 10,
    offset: 0
  }}
  renderItem={({ item }) => <SearchItem data={item} navigation={props.navigation}/>}
  styles={{contentContainer: {margin: 20,marginTop: Constants.statusBarHeight},textInput: {width: "100%",height: 70,borderWidth: 1},textInputContainer: {backgroundColor: "white"}}}
/>
   
    )
}