import { View, Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function CategoryList({ categoryList }) {

const router=useRouter();

const OnCategoryClick=(category)=>{
  router.push(
    {
      pathname:'/Category-details',
      params:{
        categoryId:category.id,
      }
    }
  )
}

const CalcTotalCost=(categoryItems)=>{
  let totalcost=0
  categoryItems.forEach(item=>{
    totalcost=totalcost+item.cost
  })
  return totalcost
}

  if (!categoryList || categoryList.length === 0) {
    // If categoryList is empty or undefined, return a message or null
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 25 }}>No categories found</Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 25, marginBottom: 10 }}>Latest Budget</Text>
      <View>
        {categoryList.map((category, index) => (
          <TouchableOpacity activeOpacity={0.9} onPress={()=>OnCategoryClick(category)}
            key={index}
            style={{
              marginBottom: 10,
              backgroundColor: 'white',
              padding: 5,
              borderRadius: 15,
              elevation: 10,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 35,
                  backgroundColor: category.color,
                  padding: 16,
                  borderRadius: 15,
                }}
              >
                {category.icon}
              </Text>
              <View
                style={{
                  marginLeft: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '70%',
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    {category.name}
                  </Text>
                  <Text style={{ fontSize: 15 }}>
                    {category?.CategoryItems?.length} Items
                  </Text>
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  ${CalcTotalCost(category?.CategoryItems)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
