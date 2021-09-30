import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination} from "../slices/navSlice";
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavorites';
import { Icon } from "react-native-elements";

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    return (
      <SafeAreaView style={tw`bg-white flex-1`}>
        <Text style={tw`text-center py-5 text-xl `}>Good Morning, {"User"}</Text>

        <View style={tw`border-t border-gray-200 flex-shrink`}>
          <View>
            <GooglePlacesAutocomplete
              placeholder="Where To?"
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={200}
              styles={toInputBoxstyles}
              fetchDetails={true}
              minLength={2}
              onPress={(data, details = null) => {
                dispatch(
                  setDestination({
                    location: details.geometry.location,
                    description: data.description,
                  })
                );

                navigation.navigate("RideOptionsCard");
                // console.log(data);
                // console.log(details);
              }}
              enablePoweredByContainer={false}
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: "en",
              }}
              returnKeyType={"search"}
            />
          </View>
          <NavFavorites />
        </View>
        <View style={tw`flex flex-row border-t border-gray-100`}>
          <TouchableOpacity
          onPress={() => navigation.navigate('RideOptionsCard')}
            style={tw`flex flex-row bg-black w-24 px-4 py-3 rounded-full ml-5 mt-4`}
          >
            <Icon
              name="car"
              type="font-awesome"
              color="white"
              size={16}
              style={tw`mr-3`}
            />
            <Text style={tw`text-white text-center`}>Rides</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex flex-row bg-black w-24 px-4 py-3 rounded-full ml-5 mt-4`}
          >
            <Icon
              name="fast-food-outline"
              type="ionicon"
              color="white"
              size={16}
              style={tw`mr-3`}
            />
            <Text style={tw`text-white text-center`}>Stats</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
}

export default NavigateCard

const toInputBoxstyles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        paddingTop:20,
        flex:0,
    },
    textInput:{
        backgroundColor:"#DDDDDF",
        borderRadius:3,
        fontSize:18,
    },
    textInputContainer:{
        paddingHorizontal:20,
        paddingBottom:0,
    }
})
