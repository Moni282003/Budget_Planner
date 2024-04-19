import React from 'react';
import { View, TouchableOpacity } from 'react-native';

const COLOR_LIST = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#8B42FC",
  "#FFFF00",
  "#FFC0CB",
];

export default function ColorPicker({ selectedColor, onSelectColor }) {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "row", gap: 20, marginTop: 20 }}>
      {COLOR_LIST.map((color, index) =>
        (
          <TouchableOpacity
            key={index}
            onPress={() => onSelectColor(color)} // Call onSelectColor callback with the selected color
            style={[{
              height: 30, width: 30, backgroundColor: color, borderRadius: 99
            }, selectedColor === color && { borderWidth: 4 }]}
          >
          </TouchableOpacity>
        ))}
    </View>
  )
}
