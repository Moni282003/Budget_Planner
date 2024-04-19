// Addnewcategory.js
import React, { useState } from 'react';
import { View, TextInput, Text, ToastAndroid } from 'react-native';
import ColorPicker from '../components/ColorPicker';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { supabase } from '../util/SupaBase';
import { client } from '../util/Kinde';
import { useRouter } from 'expo-router';

export default function Addnewcategory() {
  const router=useRouter();
  const [selected, setSelected] = useState('IC');
  const [selectedColor, setSelectedColor] = useState('#8B42FC'); 
  const [categoryName,setCategoryName]=useState()
  const [totalBudget,setTotalBudget]=useState()
  // Callback function to update selected color
  const handleSelectColor = (color) => {
    setSelectedColor(color);
  };
 const onCreateCategory=async()=>{
    const user=await client.getUserDetails();
    const {data,error}=await supabase.from('Category')
    .insert([{
        name:categoryName,
        assigned_budget:totalBudget,
        icon:selected,
        color:selectedColor,
        created_by:user.email
    }]).select();
    console.log(data)
    if(data){
        router.replace({
          pathname:'/Category-details',
          params:{
            categoryId:data[0].id,
          }
        })
        ToastAndroid.show('Category Created!',ToastAndroid.SHORT)
    }
 }
  return (
    <View style={{ marginTop: 20, padding: 20 }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TextInput style={{ padding: 20, textAlign: "center", fontSize: 30, backgroundColor: selectedColor, borderRadius: 99, paddingHorizontal: 28 }}
                onChangeText={(v)=>setSelected(v)}

        >
          {selected} 
        </TextInput>
        <ColorPicker selectedColor={selectedColor} onSelectColor={handleSelectColor} />

        <View style={{borderWidth:1,flexDirection:"row",borderRadius:10,gap:2,padding:14,display:"flex",borderColor:"gray",
    backgroundColor:'white',alignItems:"center",marginTop:20
    }}>
        <MaterialIcons name="local-offer" size={24} color="gray" />
        <TextInput placeholder='Category Name'
        style={{width:"100%",fontSize:17}}
        onChangeText={(v)=>setCategoryName(v)}
        />
        </View>
        <View style={{borderWidth:1,flexDirection:"row",borderRadius:10,gap:2,padding:14,display:"flex",borderColor:"gray",
    backgroundColor:'white',alignItems:"center",marginTop:20
    }}>
        <FontAwesome name="rupee" size={24} color="gray" />
        <TextInput placeholder='Budget Amount' keyboardType='numeric'
        style={{width:"100%",fontSize:17}}
        onChangeText={(v)=>setTotalBudget(v)}
        />
        </View>
      </View>

      <TouchableOpacity
      onPress={()=>onCreateCategory()}
      disabled={!categoryName||!totalBudget}
      style={{
        backgroundColor: "#8B42FC",
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        elevation:1

      }} activeOpacity={0.9}>
       <Text style={{color:"white",fontWeight:"bold",}}>
        {
            !categoryName||!totalBudget ? (
                   <Text>Fill All The Field</Text>
            ):(
                <Text>Create</Text>

            )

        }
       </Text>

      </TouchableOpacity>

    </View>
  )
}
