import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../util/SupaBase';
import CourseInfo from '../components/CourseInfo';
import { TouchableOpacity } from 'react-native';
import CourseItemList from '../components/CourseItemList';

export default function Categorydetails() {
    const router = useRouter();
    const { categoryId } = useLocalSearchParams();
    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {
        categoryId && getCategoryDetail();
    }, [categoryId]);

    const getCategoryDetail = async () => {
        const { data, error } = await supabase
            .from("Category")
            .select("*,CategoryItems(*)")
            .eq("id", categoryId);

        if (error) {
            console.error("Error fetching category details:", error.message);
            return;
        }

        if (data && data.length > 0) {
            setCategoryData(data[0]);
        }
    };

    useEffect(() => {
        console.log("Category Data:", categoryData);
    }, [categoryData]);

    return (
        <View style={{ flex: 1, padding: 20, marginTop: 20 }}>
            <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
                <Ionicons name="arrow-back-circle" size={44} color="black" />
            </TouchableOpacity>
            {categoryData && (
                <View>
                    <CourseInfo categoryData={categoryData} />
                    <CourseItemList setUpdateRecord={()=>getCategoryDetail()} categoryData={categoryData} />
                </View>
            )}
            <Link
                href={{
                    pathname: '/add-new-category-item',
                    params: {
                        categoryId: categoryData?.id // Guarding against accessing id when categoryData is null
                    }
                }}
                style={{ position: 'absolute', bottom: 16, right: 16 }}
            >
                <Ionicons name="add-circle" size={60} color="black" />
            </Link>
        </View>
    );
}
