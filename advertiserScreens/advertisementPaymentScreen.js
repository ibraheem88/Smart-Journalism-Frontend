import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import {Ionicons} from "react-native-vector-icons"

export default function PublishAdvertisementScreen(props) {
  const [cardDetails, setCardDetails] = useState();
  const [days, setDays] = useState()
  const [payment, setPayment] = useState(false);
  const { confirmPayment, loading } = useConfirmPayment();
  const advertiser=props.route.params.advertiser

  useEffect(() => {
    props.navigation.setOptions({
    headerTitleStyle: {fontWeight: "bold"},headerLeft: ()=>(<Ionicons name="close-outline" size={40} style={{marginLeft: 15}} onPress={()=>props.navigation.goBack()
}/>),headerRight: ()=>(<View style={{marginRight: 10}}>{payment && <Button title={"Next"} onPress={()=>props.navigation.navigate("Publish Advertisement",{image: props.route.params.image,advertiser: props.route.params.advertiser,text:props.route.params.text,days:days})} />}</View>),gestureEnabled: false
  })
  })

  const handleDays = (days) => {
    setDays(days);
  };

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch('http://10.113.60.188:5000/create-payment-intent', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "days": days
      })
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !days) {
      Alert.alert("Please enter Complete card details and Days to advertise");
      return;
    }
    const billingDetails = {
      name: advertiser.name,
      email: advertiser.email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          await fetch('http://10.113.60.188:5000/paymentDetails',{
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
          },
            body: JSON.stringify({
              "id": advertiser._id,
              "currency": paymentIntent.currency,
              "amount": paymentIntent.amount/100,
              "card": cardDetails.brand,
              "status": paymentIntent.status,
              "type": "advertisement"
            })
          }).then(
            res=>setPayment(true))
          .catch(err=>console.log(err))
          alert("Payment Successful")
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Number of days to show advertisement"
        keyboardType="numeric"
        onChangeText={(days)=>handleDays(days)}
        value={days}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});