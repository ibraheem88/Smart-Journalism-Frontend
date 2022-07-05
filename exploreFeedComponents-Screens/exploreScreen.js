import React,{ useState,useEffect } from 'react';
import { Text,ScrollView, View,StyleSheet, Pressable,TextInput,TouchableOpacity,ImageBackground} from 'react-native';
import { Ionicons} from '@expo/vector-icons';

export default function ExploreScreen(props){

  const [text, setText] = useState('');

  const handleText = (text) => {
    setText(text);
  };

  return(
    <View style={{flex:1,backgroundColor: "white"}}>
      <View style={{width:'100%',height:'15%',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
        <Ionicons name="search-sharp"
           size={19}
            color="gray"
            style={{ position: 'absolute', left: '6%', zIndex: 1 }}
        />
        <TextInput
          style={{width:'76%',height:'70%',borderRadius: 8,backgroundColor:'#ECECEC',paddingLeft:'8%',fontSize: 16}}
                placeholder="Search"
                placeholderTextColor="gray"
                value={text}
                onChangeText={(text)=>handleText(text)}
        />
       <TouchableOpacity disabled={text.length>2 ? false: true} style={{ marginLeft: '4%',borderWidth:1,borderColor: "black",height: "60%",justifyContent:"center",width:"15%",alignItems: "center",borderRadius: 5 }}
        onPress={() => props.navigation.navigate("ExploreSearchTabs", {screen: 'NYT Articles',
        params: { category: text },
      })}>
          <Text style={{ fontSize: 15, fontWeight: '500' }}>
              Search
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView >
      <View style={styles.imageContainer}>
        <Pressable onPress={()=>props.navigation.navigate("ExploreSearchTabs", {screen: 'NYT Articles',
          params: { category: 'Sports' },
        })}>
        <ImageBackground imageStyle={styles.imageStyle} source={{uri: "https://images.unsplash.com/photo-1547941126-3d5322b218b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}} style={[styles.imageBackground,{marginLeft:0}]}>
          <Text style={styles.imageText}>#Sports</Text>
        </ImageBackground>
        </Pressable>
        <Pressable onPress={()=>props.navigation.navigate("ExploreSearchTabs", {screen: 'NYT Articles',
          params: { category: 'Business' },
        })}>
        <ImageBackground imageStyle={styles.imageStyle} source={{uri: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}} style={styles.imageBackground}>
          <Text style={styles.imageText}>#Business</Text>
        </ImageBackground>
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
      <Pressable onPress={()=>props.navigation.navigate("ExploreSearchTabs", {screen: 'NYT Articles',
          params: { category: 'Travel' },
        })}>
      <ImageBackground imageStyle={styles.imageStyle} source={{uri: "https://images.unsplash.com/photo-1648737967037-96967e9151b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MzB8fHRyYXZlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"}} style={[styles.imageBackground,{marginLeft:0}]}>
          <Text style={styles.imageText}>#Travel</Text>
        </ImageBackground>
        </Pressable>
        <Pressable onPress={()=>props.navigation.navigate("ExploreSearchTabs", {screen: 'NYT Articles',
          params: { category: 'Health' },
        })}>
        <ImageBackground imageStyle={styles.imageStyle} source={{uri: "https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1264&q=80"}} style={styles.imageBackground}>
          <Text style={styles.imageText}>#Health</Text>
        </ImageBackground>
        </Pressable>
      </View>
      <View style={[styles.imageContainer,{marginBottom:20}]}>
      <Pressable onPress={()=>props.navigation.navigate("ExploreSearchTabs", {screen: 'NYT Articles',
          params: { category: 'Science' },
        })}>
      <ImageBackground imageStyle={styles.imageStyle} source={{uri: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}} style={[styles.imageBackground,{marginLeft:0}]}>
          <Text style={styles.imageText}>#Science</Text>
        </ImageBackground>
        </Pressable>
        <Pressable onPress={()=>props.navigation.navigate("ExploreSearchTabs", {screen: 'NYT Articles',
          params: { category: 'Entertainment' },
        })}>
        <ImageBackground imageStyle={styles.imageStyle} source={{uri: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}} style={styles.imageBackground}>
          <Text style={styles.imageText}>#Entertainment</Text>
        </ImageBackground>
        </Pressable>
      </View>
      </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
  imageText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white"
  },
  imageBackground: {
    height:180,
    width:180,
    padding:10,
    marginLeft:30
  },
  imageStyle: {
    borderRadius: 5
  },
  imageContainer: {
    paddingHorizontal:10,
    flexDirection: "row",
    marginTop:10,
    justifyContent: "center"
  }
});
