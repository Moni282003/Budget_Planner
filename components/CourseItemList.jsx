import { View, Text, Image } from 'react-native';
import React from 'react';

export default function CourseItemList({ categoryData }) {
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Item List</Text>
            <View>
                {
                    categoryData?.CategoryItems?.map((item, index) => (
                        console.log("Bye",item)
                        // <View key={index}>
                        //     {item.Image && <Image style={{ width: 100, height: 100 }} source={{ uri: item.Image }} />}
                        //     <Text>{item.cost}</Text>
                        //     <Text>{item.name}</Text>
                        // </View>
                    ))
                }
            </View>
        </View>
    );
}
