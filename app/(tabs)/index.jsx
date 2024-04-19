import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, RefreshControl } from 'react-native';
import services from '../../util/services';
import { useRouter } from 'expo-router';
import { client } from '../../util/Kinde';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../util/SupaBase';
import Header from '../../components/Header';
import CricularChart from '../../components/CricularChart';
import { Link } from 'expo-router';
import CategoryList from '../../components/CategoryList';
import { ScrollView } from 'react-native';


export default function Home() {
  const [loading,setLoading]=useState(false)
  const router = useRouter();
  const [categoryList,setCategoryList]=useState()
  useEffect(() => {
    checkUserAuth();
    getcategoryList()
  }, []);
  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
    await services.storeData('login','false')
      router.replace('/login');
    } else {
    }
};
  const checkUserAuth = async () => {
    const result = await services.getData('login');
    console.log("Result", result);
    if (result !== 'true') {
      router.replace('/login');
    }
  };
  const getcategoryList =async()=>{
    setLoading(true)
  const user=await client.getUserDetails()
   const {data,error}=await supabase.from('Category').select('*,CategoryItems(*)').eq('created_by',user.email)
   console.log("Data",data)
   setCategoryList(data)
   data&&setLoading(false)
  }
  return (
    <View
    style={{
      marginTop:20,
      flex:1
    }}
    >
      <ScrollView
      refreshControl={
        <RefreshControl
        onRefresh={()=>getcategoryList()}
        refreshing={loading}
        />
      }
      >
    <View style={{marginTop:30,
    padding:20,
    backgroundColor:'#8B42FC',
    height:150
    }}>
      <Header/></View>
      <View style={{
        padding:20,marginTop:-75
      }}>
      <CricularChart categoryList={categoryList}/>
      <CategoryList categoryList={categoryList} /></View>
     </ScrollView>
    <Link href={'/add-new-category'}  style={{
      position:"absolute",
      bottom:16,
      right:16
    }}>
    <Ionicons name="add-circle" size={64} color="#8B42FC" />
      </Link>   
    </View>

  );
}

