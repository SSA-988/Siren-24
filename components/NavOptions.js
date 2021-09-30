import React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import tw from 'tailwind-react-native-classnames';
import {Icon} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
  {
    id: "123",
    title: "catch a ride",
    image: "https://freepngimg.com/thumb/categories/2989.png",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "lets get to know",
    image:
      "data:image/jpeg;base64,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",
    screen: "DetailsSceen",
  },
];

const NavOptions = () => {
    const navigation = useNavigation();

    const origin = useSelector(selectOrigin);
    return (
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            disabled={!origin}
            onPress={() => navigation.navigate(item.screen)}
            style={tw`pl-6 pb-8 p-2 bg-white border border-gray-900 border-opacity-5 m-2  w-40 `}
          >
            <View style={tw`${!origin && "opacity-20"}`}>
              <Image
                style={{
                  width: 120,
                  height: 120,
                  paddingTop: 16,
                  resizeMode: "contain",
                }}
                source={{ uri: item.image }}
              />

              <Text style={tw`mt-2 font-semibold text-lg`}>{item.title}</Text>
              <Icon
                style={tw`p-2 bg-yellow-700 w-10 mt-4 mb-3 rounded-full`}
                type="antdesign"
                color="white"
                name="arrowright"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    );
}

export default NavOptions


