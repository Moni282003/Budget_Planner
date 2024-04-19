import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function CourseInfo({ categoryData }) {
    const [totalCost, setTotalCost] = useState(0);
    const [perc, setPerc] = useState(0);

    useEffect(() => {
        calcTotalPerc();
    }, [categoryData]);

    const calcTotalPerc = () => {
        if (!categoryData || !categoryData.CategoryItems || !categoryData.assigned_budget) return;

        let total = 0;
        categoryData.CategoryItems.forEach(item => {
            total += item.cost;
        });
        setTotalCost(total);

        let percentage = (total / categoryData.assigned_budget) * 100;
        setPerc(percentage);
    }

    return (
        <View>
            <View
                style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                        style={{
                            fontSize: 25,
                            backgroundColor: categoryData.color,
                            padding: 20,
                            borderRadius: 15,
                        }}
                    >
                        {categoryData.icon}
                    </Text>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            {categoryData?.name}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            {categoryData?.CategoryItems?.length} Items
                        </Text>
                    </View>
                </View>
                <Ionicons name="trash" size={24} color="red" />
            </View>
            <View style={{ display: "flex", justifyContent: "space-between", marginTop: 15, flexDirection: 'row' }}>
                <Text>${totalCost}</Text>
                <Text>Total Budget: {categoryData.assigned_budget}</Text>
            </View>
            <View style={{ width: '100%', height: 15, backgroundColor: "gray", borderRadius: 99, marginTop: 7 }}>
                <View style={{ width: perc + '%', backgroundColor: categoryData.color, borderRadius: 99, height: 15 }}></View>
            </View>
        </View>
    );
}
