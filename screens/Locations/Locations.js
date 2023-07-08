import { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { FilterContext } from "../contexts/FilterContext";

export default function Locations({ navigation }) {
  // Establishing constants to searchbar
  const [filter, setFilter] = useContext(FilterContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setFilter("");
    }
  }, [isFocused]);

  // Establishing constants to the location and lists
  const [locations, setLocations] = useState([]);
  const [listLocation, setListLocation] = useState(<></>);

  // We obtain the reponse of the API and catch de error
  const getLocations = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/location");
      const json = await response.json();
      setLocations(json.results);
    } catch (error) {
      console.error(error);
    }
  };

  // We obtain the results from de API and show the results.
  const getListLocations = () => {
    let list = locations.map((e) => {
      const eName = e.name.toUpperCase();
      if (eName.startsWith(filter.toUpperCase()) || eName.includes(filter.toUpperCase())) {
        return (
          <TouchableOpacity
            style={Styles.touch}
            key={"epi" + e.id}
            onPress={() => {
              navigation.navigate("Localizacion", { id: e.id });
            }}
          >
            <Text style={Styles.location}>{e.location}</Text>
            <Text>{e.name}</Text>
            <Text style={Styles.dimension}>{e.dimension}</Text>
          </TouchableOpacity>
        );
      }
    });

    setListLocation(list);
  };

  // We run response
  useEffect(() => {
    getListLocations();
  }, [locations, filter]);

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <>
      <ScrollView>{listLocation}</ScrollView>
    </>
  );
}

const Styles = StyleSheet.create({
  touch: {
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  location: {
    color: "gray",
    fontSize: 12,
  },
  dimension: {
    color: "#00AAE9",
    fontSize: 14,
  },
});
