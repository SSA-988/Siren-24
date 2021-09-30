import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image ,ScrollView} from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {GOOGLE_MAPS_API_KEY} from "@env";
import PlacesInput from "react-native-places-input";
import { KeyboardAvoidingView } from 'react-native';
import { useDispatch } from 'react-redux';
import {setDestination, setOrigin} from "../slices/navSlice"
import NavFavorites from '../components/NavFavorites';


const HomeScreen = ({navigation}) => {

    const dispatch = useDispatch();

    useLayoutEffect(()=> {
        navigation.setOptions({
          headerTitleAlign: "center",
          title: "welcome to Siren 24",
        });
    })
    return (
      <KeyboardAvoidingView contentContainerStyle={{ flex: 1 }}>
        <SafeAreaView style={tw`h-full bg-white`}>
          <View style={tw`p-5`}>
            {/* <Image
              style={{ width: 120, height: 100, resizeMode: "contain" }}
              source={{
                uri: "data:image/png;base64,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",
              }}
            /> */}
            <Text
              style={{
                fontSize: 30,
                fontWeight: "700",
                marginLeft: 10,
                marginBottom: 3,
              }}
            >
              Siren 24
            </Text>

            <GooglePlacesAutocomplete
              styles={{
                container: {
                  flex: 0,
                },
                textInput: {
                  fontSize: 18,
                },
              }}
              minLength={2}
              onPress={(data, details = null) => {
                dispatch(
                  setOrigin({
                    location: details.geometry.location,
                    description: data.description,
                  })
                );

                dispatch(setDestination(null));
              }}
              fetchDetails={true}
              returnKeyType={"search"}
              enablePoweredByContainer={false}
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: "en",
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={200}
              placeholder="where from"
              // listViewDisplayed={"auto"}
            />
            {/* <ScrollView> */}

            {/* </ScrollView> */}

            <NavOptions />

            {/* <PlacesInput
            googleApiKey={GOOGLE_MAPS_API_KEY}
            onSelect={(place) => console.warn(place)}
            placeHolder={"Where from? "}
            language={"en-US"}
          /> */}

            <NavFavorites />

            <Text style={{fontSize:18,marginLeft:15,marginTop:5,fontWeight:"600"}}>
              The day we learn to allow an ambulance to pass through in traffic,
              might be the first step towards being a truly responsible society.
            </Text>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
}

export default HomeScreen

const styles = StyleSheet.create({})
