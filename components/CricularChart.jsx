import { View, Text } from 'react-native'
import React, { useState } from 'react'
import PieChart from 'react-native-pie-chart'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CricularChart() {
  
  const widthAndHeight=150
  const [values,setValues] = useState([1])
 const [sliceColor,setSlicecolor]=useState(["gray"])
  const series = values
    return (
    <View style={{
        marginTop:20,
        padding:20,
        borderRadius:15,
        elevation:10,
        backgroundColor:"#fff"
    }}>
      <Text
      style={{
        fontSize:20
      }}
      >Total Estimate:<Text style={{fontWeight:"bold"}}>0$</Text></Text>
      <View  style={{
        marginTop:10,
        display:"flex",
        gap:40,
       flexDirection:"row" 
      }}>
      <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.65}
            coverFill={'#FFF'}
          />
          <View style={{
            display:"flex",gap:5,flexDirection:"row",alignItems:"center"
          }}>
          <MaterialCommunityIcons
           name="checkbox-blank-circle" size={24} color="gray" />
           <Text>NA</Text>
          </View>
      </View>
    </View>
  )
}