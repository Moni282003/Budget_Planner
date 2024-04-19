import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../util/SupaBase';
import { decode } from 'base64-arraybuffer';
import { useLocalSearchParams, useRouter } from 'expo-router';
const placeholder = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReAsxC7lPQ398VdLqxUHqr0YB5nLb-iLdwXw&s';

export default function Addnewcategoryitem() {
    const [loading,setLoading]=useState(false)
    const router=useRouter()
    const [image, setImage] = useState(placeholder);
    const [preview,setPreview]=useState(placeholder);
    const [name,setName]=useState();
    const [cost,setCost]=useState();
    const [url,setUrl]=useState();
    const [note,setNote]=useState();
    const{categoryId}=useLocalSearchParams()
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
          base64:true
        });    
        if (!result.canceled) {
          setPreview(result.assets[0].uri);
          setImage(result.assets[0].base64);
        }
      };

    const onClickAdd=async()=>{
        setLoading(true)
        const fileName=Date.now();
        const {data,error}=await supabase.storage.from('images')
        .upload(fileName+'.png',decode(image),{
            contentType:'image/png'
        })
        if(data){
        const fileUrl="https://waddhspjbnabfrtsehpw.supabase.co/storage/v1/object/public/images/"+fileName+".png"
        const {data,error}=await supabase.from('CategoryItems').insert([
            {
                name:name,
                cost:cost,
                url:url,
                Image:fileUrl,
                note:note,
                category_id:categoryId
    }]).select();
    ToastAndroid.show("New Item Added!!",ToastAndroid.SHORT)
    console.log(data);
    setLoading(false)
    router.replace(
        {
          pathname:'/Category-details',
          params:{
            categoryId:categoryId,
          }
        }
      )
}}
    return (
        <KeyboardAvoidingView>
        <ScrollView style={{ padding: 20 }}>
            <TouchableOpacity activeOpacity={0.9} onPress={()=>pickImage()}>
            <Image
                source={{ uri: preview }}
                style={{
                    width: 150,
                    height: 150,
                    borderRadius: 15,
                }}
            /></TouchableOpacity>
            <View style={{ padding: 10, borderWidth: 1, borderRadius: 5, marginTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <MaterialIcons name="label" size={24} color="black" />
                    <TextInput style={{ fontSize: 17 }} placeholder='Item name' 
                    onChangeText={(value)=>setName(value)}
                    />
                </View>
            </View>
            <View style={{ padding: 10, borderWidth: 1, borderRadius: 5, marginTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <FontAwesome name="dollar" size={24} color="black" />
                    <TextInput style={{ fontSize: 17 }} placeholder='Item Cost' keyboardType='numeric'
                    onChangeText={(value)=>setCost(value)}

                    />
                </View>
            </View>
            <View style={{ padding: 10, borderWidth: 1, borderRadius: 5, marginTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <AntDesign name="link" size={24} color="black" />
                    <TextInput style={{ fontSize: 17 }} placeholder='Item URL'
                    onChangeText={(value)=>setUrl(value)}
                                        />
                </View>
            </View>
            <View style={{ padding: 10, borderWidth: 1, borderRadius: 5, marginTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <FontAwesome name="sticky-note-o" size={24} color="black" />
                    <TextInput style={{ fontSize: 17 }} numberOfLines={3} placeholder='Item note' 
                    onChangeText={(value)=>setNote(value)}
                                        />
                </View>
            </View>
            {(name&&cost&&note&&url||loading)&&
            <TouchableOpacity onPress={()=>onClickAdd()} style={{backgroundColor:"midnightblue",padding:10,borderRadius:10,marginTop:20}} activeOpacity={0.9}>
               <Text style={{color:"white",textAlign:"center",fontSize:18}}>Add</Text>
            </TouchableOpacity>}
            {
                loading?
                <ActivityIndicator size='large'/>:""
            }
        </ScrollView></KeyboardAvoidingView>
    );
}
