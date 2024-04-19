import { View, Text, Image, TouchableOpacity, ToastAndroid, Linking } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '../util/SupaBase';
import { openURL } from 'expo-linking';

export default function CourseItemList({ categoryData,setUpdateRecord }) {
    const [expand, setExpand] = useState(-1); 

    const toggleExpand = (index) => {
        setExpand(expand === index ? -1 : index); 
    };
    const onDeleteItem=async(id)=>{
        const {error}=await supabase.from('CategoryItems')
        .delete()
        .eq('id',id)
        ToastAndroid.show("Item Deleted",ToastAndroid.SHORT)
        setUpdateRecord(true)

    }
    const openURL=(url)=>{
        if(url){
            Linking.openURL(url)
        }
    }
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Item List</Text>
            <View style={{ marginTop: 15 }}>
                {categoryData?.CategoryItems?.length > 0 ? (
                    categoryData?.CategoryItems?.map((item, index) => (
                        <React.Fragment key={item.id || index}>
                            <TouchableOpacity 
                                activeOpacity={0.1} 
                                onPress={() => toggleExpand(index)} // Call toggleExpand function
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: 10, 
                                    marginTop: 10
                                }}>
                                {item.Image && <Image style={{ width: 70, height: 70, borderRadius: 15 }} source={{ uri: item.Image }} />}
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
                                    <Text style={{ fontSize: 12, color: "gray" }} numberOfLines={2}>{item.url}</Text>
                                </View>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>${item.cost}</Text>
                            </TouchableOpacity>
                            {expand === index && (
                                <View style={{display:"flex",justifyContent:"flex-end",gap:20,flexDirection:"row"}}>
                                    <TouchableOpacity onPress={()=>onDeleteItem(item.id)}>
                                        <FontAwesome5 name="trash-alt" size={34} color="red" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>openURL(item.url)}>                              
                                        <AntDesign name="link" size={34} color="blue" />
                                    </TouchableOpacity>
                                </View>
                            )}
                            {categoryData?.CategoryItems?.length - 1 !== index && <View style={{ borderWidth: 0.5, marginTop: 7, borderColor: "gray" }}></View>}
                        </React.Fragment>
                    ))
                ) : (
                    <Text style={{ textAlign: "center", fontSize: 18 }}>No Item Found</Text>
                )}
            </View>
        </View>
    );
}
