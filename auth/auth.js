import * as React from 'react';
import {Image,View,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { StripeProvider } from '@stripe/stripe-react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DiscussionFeedScreen from '../discussionFeedComponents-Screens/discussionFeedScreen'
import AddArticleScreen from '../newsFeedComponents-Screens/addArticleScreen';
import NewsFeedScreen from '../newsFeedComponents-Screens/newsFeedScreen'
import ArticleScreen from '../newsFeedComponents-Screens/articleScreen';
import PublishArticleScreen from '../newsFeedComponents-Screens/publishArticleScreen';
import CommentsScreen from '../discussionFeedComponents-Screens/commentScreen';
import ChatScreen from '../screens/chatScreen';
import ProfileScreen from '../screens/profileScreen';
import ExploreScreen from '../exploreFeedComponents-Screens/exploreScreen'
import ExploreSearchScreen from '../exploreFeedComponents-Screens/exploreBySearch';
import ExploreByMapScreen from '../exploreFeedComponents-Screens/exploreByMapScreen';
import VisitingProfileScreen from '../discussionFeedComponents-Screens/visitingProfileScreen';
import SettingScreen from '../screens/settingScreen';
import ChatRoomScreen from '../screens/chatRoomScreen';
import SendImageScreen from '../screens/sendImageScreen'
import PublishPostScreen from '../discussionFeedComponents-Screens/publishPostScreen';
import SentimentAnalysisScreen from '../newsFeedComponents-Screens/sentimentAnalysisScreen';
import LoginScreen from './login'
import RegisterScreen from "./register"
import AdminLoginScreen from '../screens/adminLoginScreen';
import AdminProfileScreen from '../adminScreens/adminProfileScreen'
import ApprovalScreen from '../adminScreens/approvalScreen'
import PaymentScreen from '../adminScreens/paymentScreen'
import PaymentHistoryScreen from '../adminScreens/paymentHistoryScreen';
import UsersScreen from "../adminScreens/usersScreen"
import UserTypeScreen from '../screens/userTypeScreen';
import AddPostScreen from '../discussionFeedComponents-Screens/addPostScreen';
import SubscriptionScreen from '../newsFeedComponents-Screens/subscriptionScreen'
import NotificationScreen from '../screens/notificationScreen';
import AdvertiserProfileScreen from '../advertiserScreens/advertiserProfileScreen'
import AdvertiserLoginScreen from '../advertiserScreens/advertiserLoginScreen';
import AdvertisementsScreen from '../advertiserScreens/advertisementsScreen';
import AdvertiserFeed from '../advertiserScreens/advertiserFeed';
import PlaceAdvertisementScreen from '../advertiserScreens/placeAdvertisementScreen';
import AdvertisementPaymentScreen from '../advertiserScreens/advertisementPaymentScreen';
import AdvertisementPublishScreen from '../advertiserScreens/advertisementPublishScreen';
import NYTFeedScreen from "../newsFeedComponents-Screens/NYTFeedScreen"
import NYTArticleScreen from "../newsFeedComponents-Screens/NYTArticleScreen"
import MyPostScreen from '../screens/postScreen'
import MyArticleScreen from '../screens/articleScreen'
import OurCategoryFeed from '../exploreFeedComponents-Screens/ourCategoryFeed'
import ReportScreen from '../adminScreens/reportScreen'
import GlobalCategoryFeed from '../exploreFeedComponents-Screens/globalCategoryFeed'
import ReportPreview from '../adminScreens/reportPreview'
const Toptab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Auth(){



const AuthStack=()=>{
  return(
    <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name={"Login"} component={LoginScreen} options={{headerShown: false}}/>
    <Stack.Screen name={"Register"} component={RegisterScreen} options={{headerShown: false}}/>
    <Stack.Screen name={"Admin Login"} component={AdminLoginScreen} options={{headerShown: false}}/>
    <Stack.Screen name={"Advertiser Login"} component={AdvertiserLoginScreen} options={{headerShown: false}}/>
    <Stack.Screen name={"Register As"} component={UserTypeScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

const ChatStack=()=>{
  return(
    <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name={"ChatScreen"} component={ChatScreen} options={{headerShown: false}}/>
    <Stack.Screen name={"ChatRoom"} component={ChatRoomScreen}/>
    <Stack.Screen name={"Send Image"} component={SendImageScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

const ReportStack=()=>{
  return(
    <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name={"Reports"} component={ReportScreen} options={{headerShown: false}}/>
    <Stack.Screen name={"Preview Report"} component={ReportPreview}/>
    </Stack.Navigator>
  )
}

const ProfileStack=({navigation})=>{
  return(
    <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name={"PostsScreen"} component={MyPostTabs} options={{title: "Profile",headerTitle: () => {
      return (
<Text style={{fontSize:30,color: "black",fontWeight: "400"}}>Profile</Text>
      )
    },headerTitleAlign: "left",
    headerRight: ()=>(
      <Ionicons
      onPress={()=>navigation.navigate("ProfileScreen")}
      name="settings-outline"
      size={26}
      style={{ marginRight: 15 }}
    />
    ),
    headerStyle: {height: 70}}}/>
    <Stack.Screen name={"ProfileScreen"} component={ProfileScreen} options={{title: "Profile"}}/>
    <Stack.Screen name={"SentimentAnalysis"} component={SentimentAnalysisScreen} options={{title: "Sentiment Analysis"}}/>
    <Stack.Screen name={"SettingScreen"} component={SettingScreen} options={{title: "Settings"}}/>
    <Stack.Screen name={"Comments"} component={CommentsScreen} options={{}}/>
    <Stack.Screen name={"Article"} component={ArticleScreen} options={{headerStyle: {backgroundColor: "black"},
    headerTitleStyle: {color: "white"},headerBackTitleStyle: {color: "white"}}}/>
    </Stack.Navigator>
  )
}

const HomeStack=()=>{
  return(
    <StripeProvider
    publishableKey={'pk_test_51KrzWmLEJCPE187BH8zHoK2eLvAwYfeSQIJB4iji9VqBsDs0qBYuPfTfTjZ6jaYXgm1E8HaLGZNyh9nUEvgN1Jtv00HXIjVdzg'}
  >
    <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name={"Home"} component={MainToptabs} options={{header: ()=>(
      <View style={{backgroundColor: "white",borderBottomWidth:1,borderBottomColor: "black",paddingVertical:5}}>
      <Image source={require('../assets/logo.png')} style={{width:"60%",height: 50,alignSelf: "center",resizeMode: "cover"}}/>
      </View>
    )}}/>
    <Stack.Screen name={"Article"} component={ArticleScreen} options={{}}/>
    <Stack.Screen name={"NYTArticle"} component={NYTArticleScreen} options={{}}/>
    <Stack.Screen name={"Comments"} component={CommentsScreen} options={{}}/>
    <Stack.Screen name={"Add Article"} component={AddArticleScreen} options={{}}/>
    <Stack.Screen name={"Publish Article"} component={PublishArticleScreen} options={{}}/>
    <Stack.Screen name={"VisitingProfile"} component={VisitingProfileScreen} options={{title: "Profile"}}/>
    <Stack.Screen name={"Subscription"} component={SubscriptionScreen} options={{}}/>
    </Stack.Navigator>
    </StripeProvider>
  )
}

const MainToptabs=(props)=>{
  return(
    <Toptab.Navigator screenOptions={{}}>
    <Stack.Screen name={"Our Articles"} component={NewsFeedScreen} options={{headerShown: false}}/>   
    <Stack.Screen name={"NYT Articles"} component={NYTFeedScreen} options={{headerShown: false,title: "Top Headlines"}}/>
    </Toptab.Navigator>
  )
}

const ExploreTopTabs=(props)=>{
  return(
    <Toptab.Navigator screenOptions={{}}>
    <Stack.Screen name={"Our Articles"} component={OurCategoryFeed} options={{headerShown: false}}/>   
    <Stack.Screen name={"NYT Articles"} component={GlobalCategoryFeed} options={{headerShown: false,title: "Top Headlines"}}/>
    </Toptab.Navigator>
  )
}

const MyPostTabs=(props)=>{
  return(
    <Toptab.Navigator screenOptions={{}}>
    <Stack.Screen name={"My Articles"} component={MyArticleScreen} options={{headerShown: false}}/>   
    <Stack.Screen name={"My Posts"} component={MyPostScreen} options={{headerShown: false}}/>
    </Toptab.Navigator>
  )
}


const MainStack=(props)=>{
  return(
    <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name={"Auth"} component={AuthStack} options={{headerShown: false}}/>   
    <Stack.Screen name={"MainTabs"} component={MainTabs} options={{headerShown: false}}/>
    <Stack.Screen name={"AdminTabs"} component={AdminTabs} options={{headerShown: false}}/>
    <Stack.Screen name={"AdvertiserTabs"} component={AdvertiserTabs} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

const DiscussionStack=(props)=>{
  return(
    <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name={"DiscussionScreen"} component={DiscussionFeedScreen} options={{headerTitle: () => {
      return (
<Text style={{fontSize:30,color: "black",fontWeight: "400"}}>Discussions</Text>
      )
    },headerTitleAlign: "left",
    headerStyle: {height: 70}}}/>
    <Stack.Screen name={"Add Post"} component={AddPostScreen} options={{}}/>
    <Stack.Screen name={"VisitingProfile"} component={VisitingProfileScreen} options={{title: "Profile"}}/>
    <Stack.Screen name={"Publish Post"} component={PublishPostScreen} options={{}}/>   
    <Stack.Screen name={"Comments"} component={CommentsScreen} options={{}}/>
    </Stack.Navigator>
  )
}

const ExploreStack=(props)=>{
  return(
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen name={"ExploreScreen"} component={ExploreScreen} options={{headerTitle: () => {
              return (
                <View style={{flexDirection:"row",alignItems:"space-between"}}>
<Text style={{fontSize:30,color: "black",fontWeight: "400"}}>Explore</Text>
                </View>
              )
            },
            headerTitleAlign: "left",
            headerStyle: {height: 70}}}/>
      <Stack.Screen name={"ExploreSearchTabs"} component={ExploreTopTabs} options={{title: "Explore"}}/>
      <Stack.Screen name={"NYTArticle"} component={NYTArticleScreen} options={{}}/>
    <Stack.Screen name={"ExploreSearchScreen"} component={ExploreSearchScreen} options={{}}/>   
    <Stack.Screen name={"Map"} component={ExploreByMapScreen} options={{}}/>
    </Stack.Navigator>
  )
}

const AdvertisementHomeStack=(props)=>{
  return(
    <StripeProvider
    publishableKey={'pk_test_51KrzWmLEJCPE187BH8zHoK2eLvAwYfeSQIJB4iji9VqBsDs0qBYuPfTfTjZ6jaYXgm1E8HaLGZNyh9nUEvgN1Jtv00HXIjVdzg'}
  >
    <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name={"Advertiser Feed"} component={AdvertiserFeed} options={{title: "Home"}}/>   
    <Stack.Screen name={"Place Advertisement"} component={PlaceAdvertisementScreen} options={{}}/>
    <Stack.Screen name={"Advertisement Payment"} component={AdvertisementPaymentScreen} options={{}}/>
    <Stack.Screen name={"Publish Advertisement"} component={AdvertisementPublishScreen} options={{}}/>
    </Stack.Navigator>
    </StripeProvider>
  )
}

const PaymentStack=(props)=>{
  return(
    <Stack.Navigator screenOptions={{}}>
    <Stack.Screen name={"PaymentScreen"} component={PaymentScreen} options={{title: "Payments"}}/>   
    <Stack.Screen name={"PaymentHistory"} component={PaymentHistoryScreen} options={{title: "Payment History"}}/> 
    </Stack.Navigator>
  )
}

const MainTabs=(props)=>{  
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor: "white",tabBarStyle:{backgroundColor: "black"},tabBarInactiveTintColor: "grey"}}>
      <Tab.Screen name="HomeTab" component={HomeStack} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'newspaper' : 'newspaper-outline'}
                size={26}
                color="white"
              />
            );
          },
          title: "News Feed",
          headerShown: false
        }}/>
          <Tab.Screen name="Discussions" component={DiscussionStack} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'account-group' : 'account-group-outline'}
                size={26}
                color="white"
              />
            );
          },
          headerShown: false
        }}/>
        <Tab.Screen name="Explore" component={ExploreStack} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'search' : 'search-outline'}
                size={26}
                color="white"
              />
            )},
            headerShown: false
        }}/>
        <Tab.Screen name="Notifications" component={NotificationScreen} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'notifications' : 'notifications-outline'}
                size={26}
                color="white"
              />
            );
          },
          headerTitle: () => {
            return (
      <Text style={{fontSize:30,color: "black",fontWeight: "400"}}>Notifications</Text>
            )
          },headerTitleAlign: "left",
          headerStyle: {height: 70}
        }}/>
      <Tab.Screen name="Profile" component={ProfileStack} options={({route})=>({
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'person-sharp' : 'person-outline'}
                size={26}
                color="white"
              />
            )
          },
          headerShown: false
        })}/>
    </Tab.Navigator>
  );
}

const AdminTabs=()=>{
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor: "black"}}>
      <Tab.Screen name="Approvals" component={ApprovalScreen} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'newspaper' : 'newspaper-outline'}
                size={26}
                color="black"
              />
            );
          },
          title: "Approvals",
        }}/>
          <Tab.Screen name="Payments" component={PaymentStack} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'card' : 'card-outline'}
                size={26}
                color="black"
              />
            );
          }
        ,headerShown: false}}/>
        <Tab.Screen name="Users" component={UsersScreen} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'people' : 'people-outline'}
                size={26}
                color="black"
              />
            );
          },
        }}/>
        <Tab.Screen name="Reports" component={ReportStack} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'newspaper' : 'newspaper-outline'}
                size={26}
                color="black"
              />
            );
          },
          headerShown: false
        }}/>
      <Tab.Screen name="Profile" component={AdminProfileScreen} options={({route})=>({
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'person-sharp' : 'person-outline'}
                size={26}
                color="black"
              />
            )
          },
        })}/>
    </Tab.Navigator>
  );
}

const AdvertiserTabs=()=>{
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor: "black"}}>
      <Tab.Screen name="Home" component={AdvertisementHomeStack} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={26}
                color="black"
              />
            );
          },
          headerShown: false
        }}/>
          <Tab.Screen name="Advertisements" component={AdvertisementsScreen} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'advertisements' : 'advertisements'}
                size={26}
                color="black"
              />
            );
          }}}/>
      <Tab.Screen name="Profile" component={AdvertiserProfileScreen} options={({route})=>({
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'person-sharp' : 'person-outline'}
                size={26}
                color="black"
              />
            )
          },
        })}/>
    </Tab.Navigator>
  );
}
  return(
    <NavigationContainer>
    <MainStack />
    </NavigationContainer>
  )
}