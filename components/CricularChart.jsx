import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import PieChart from 'react-native-pie-chart'
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function CricularChart({ categoryList }) {
  const[totalCalcEstimate,setTotalCalcEstimate]=useState(0)
  useEffect(() => {
      updateCircularChart();
  }, [categoryList]);

  const COLOR_LIST = [
      "#FF0000",
      "#00FF00",
      "#0000FF",
      "#FFFF00",
      "#800080",
      "#FFA500",
      "#FFC0CB",
      "#808080"
  ];

  const updateCircularChart = () => {
    let totalEstimate=0;
      setSlicecolor([]);
      setValues([]);
      let otherCost=0;

      categoryList?.forEach((item, index) => {
        if(index<4){
          let itemTotalcost = 0;
          (item.CategoryItems || []).forEach((item_) => {
              itemTotalcost += item_.cost || 0;
              totalEstimate=totalEstimate+item_.cost;
          });
          setSlicecolor(sliceColor => [...sliceColor, COLOR_LIST[index]]);
          setValues(values => [...values, itemTotalcost]);}
          else{
            (item.CategoryItems || []).forEach((item_) => {
              otherCost =otherCost+item_.cost;
              totalEstimate=totalEstimate+item_.cost;

          });
          }
      });
      setTotalCalcEstimate(totalEstimate)
      setSlicecolor(sliceColor => [...sliceColor, COLOR_LIST[4]]);
          setValues(values => [...values, otherCost]);

  };

  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSlicecolor] = useState(["gray"]);
  const series = values;

  if (series.every(value => value === 0)) {
      return (
          <View style={{
              marginTop: 20,
              padding: 20,
              borderRadius: 15,
              elevation: 10,
              backgroundColor: "#fff"
          }}>
              <Text style={{ fontSize: 20 }}>No data available</Text>
          </View>
      );
  }

  return (
      <View style={{
          marginTop: 20,
          padding: 20,
          borderRadius: 15,
          elevation: 10,
          backgroundColor: "#fff"
      }}>
          <Text style={{ fontSize: 20 }}>Total Estimate: <Text style={{ fontWeight: "bold" }}>${totalCalcEstimate}</Text></Text>
          <View style={{
              marginTop: 10,
              display: "flex",
              gap: 40,
              flexDirection: "row"
          }}>
              <PieChart
                  widthAndHeight={widthAndHeight}
                  series={series}
                  sliceColor={sliceColor}
                  coverRadius={0.65}
                  coverFill={'#FFF'}
              />
              {categoryList?.length==0?
              <View style={{
                  display: "flex", gap: 5, flexDirection: "row", alignItems: "center"
              }}>
                  <MaterialCommunityIcons
                      name="checkbox-blank-circle" size={24} color="gray" />
                  <Text>NA</Text>
              </View>
            :
            <View>
              {
                categoryList?.map((category,index)=>index<=4&&(
                  <View key={index} style={{display: "flex", gap: 5, flexDirection: "row", alignItems: "center",marginBottom:4
                }}>
                    <MaterialCommunityIcons
                      name="checkbox-blank-circle" size={24} color={COLOR_LIST[index]} />
                  <Text>{index <4?category?.name:"Other"}</Text>

                    </View>
                ))
              }
              </View>  
            }
          </View>
      </View>
  );
} 