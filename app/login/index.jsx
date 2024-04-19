import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import login from './../../assets/main.png';
import { client } from '../../util/Kinde';
import services from './../../util/services';
import { useRouter } from 'expo-router';
export default function LoginScreen() {
  const router=useRouter();
  const handleSignIn = async () => {
    const token = await client.login();
    if (token) {
      await services.storeData('login','true')
      router.replace('/')
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={login}
        style={{
          width: 300,
          height: 400,
          marginTop: 70,
          borderWidth: 3,
          borderColor: "black", // Use BLACK color constant
          borderRadius: 20
        }}
      />
      <View style={{
        backgroundColor: "#8B42FC", // Use PRIMARY color constant
        width: "100%",
        height: "100%",
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20
      }}>
        <Text style={{
          fontSize: 28,
          textAlign: 'center',
          fontWeight: 'bold',
          color: "white" // Use WHITE color constant
        }}>
          Personal Budget Planner
        </Text>
        <Text
        style={{
            fontSize: 18,
            textAlign: 'center',
            marginTop: 20,
            color: "white" // Use WHITE color constant
          }}>
            Stay on Track,Event by Event:Your personal budget planner
        </Text>
        <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleSignIn}
        style={{
            backgroundColor:"white",
            padding:20,
            paddingHorizontal:5,
            borderRadius:99,
            marginTop:20

        }}
        >
            <Text
            style={{
                textAlign:"center",
                color:"#8B42FC",
                fontSize:20

            }}
            >Login/Signup</Text>
        </TouchableOpacity>
        <Text
        style={{
            fontSize:12,
            color:"white",
        marginTop:15       }}
        >* By login/signup you will agree to our terms and conditons</Text>
      </View>
    </View>
  );
}
