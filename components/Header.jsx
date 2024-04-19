import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { client } from '../util/Kinde';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
    const [user,setUser]=useState();
    const GetUserData=async ()=>{
        const user=await client.getUserDetails();
        setUser(user);

    }
    useEffect(()=>{
        GetUserData();
    },[])
  return (
    <View  style={{
        display:"flex",
        alignItems:"center",
        padding:10,
        flexDirection:"row",
        gap:8
    }}>
        <Image source={{uri:user?.picture}}
        style={{
            width:50,
            height:50,
            borderRadius:99,
           
        }}/>
        <View
       style={{
        display:"flex",
        alignItems:"center",
        flexDirection:"row",
        width:"85%",
        justifyContent:"space-between"
    }}
        >
            <View>
                <Text style={{color:"white"
            ,fontSize:16
            }}>Welcome</Text>
                <Text
                style={{color:"white"
                ,fontSize:20,
                fontWeight:"bold"
                }}
                >{user?.given_name}</Text>
            </View>
            <Ionicons name="notifications" size={24} color="white" />
        </View>
    </View>
  )
}