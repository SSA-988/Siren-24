import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Icon } from 'react-native-elements';
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { selectTravelTimeInformation } from '../slices/navSlice';
import { useSelector } from 'react-redux';


const data = [
  {
    id: "Uber-X-123",
    title: "Ford Basis",
    multiplier: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzkYYOe2re8TJEm3HrwMeHyLu8mUp85OuAzwWQQyxTHZAXA5MS4rT18X6GXPwNf3ajQsI&usqp=CAU",
  },
  {
    id: "Uber-XL-456",
    title: "Metronix",
    multiplier: 2,
    image:
      "https://thumbs.dreamstime.com/b/ambulance-white-isolated-background-40734827.jpg",
  },
  {
    id: "Uber-LUX-789",
    title: "Advance",
    multiplier: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ5vR7fu1aRlVuC0kp2DR8axrEsAO5fGviOezfNgf0yhW_4gCDQStOVZhxd0nLeu_GG8A&usqp=CAU",
  },
];

const SURGE_CHARGE_RATE = 1;

const RideOptionsCard = () => {
    const navigation = useNavigation();

    const [selected,setSelected] = useState(null);

    const travelTimeInformation = useSelector(selectTravelTimeInformation);
    return (
      <SafeAreaView style={tw`bg-white flex-grow`}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
          >
            <Icon name="chevron-left" type="fontawesome" />
          </TouchableOpacity>
          <Text style={tw`text-center py-5 text-xl`}>
            Select a Ride - {travelTimeInformation?.distance?.text}
          </Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item: { id, title, multiplier, image }, item }) => (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              style={tw`flex-row items-center px-4 justify-between  ${
                id === selected?.id && "bg-gray-200"
              }`}
            >
              <Image
                style={{ width: 90, height: 90, resizeMode: "contain", }}
                source={{ uri: image }}
              />
              <View style={tw`-ml-6`}>
                <Text style={tw` text-xl font-semibold`}>{title}</Text>
                <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
              </View>
              <Text style={tw`text-xl`}>
                Rs.
                {(travelTimeInformation?.duration.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  100}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View>
          <TouchableOpacity
            disabled={!selected}
            style={tw`bg-black m-3 py-2 rounded-lg ${
              !selected && "bg-gray-300"
            }`}
          >
            <Text style={tw`text-center text-white text-xl`}>
              Choose {selected?.title}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
}

export default RideOptionsCard

const styles = StyleSheet.create({})
