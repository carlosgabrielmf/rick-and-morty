import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Searchbar } from "react-native-paper";

export default function Location({ route, navigation }) {
  const { id = 0 } = route.params;

  const [location, setLocation] = useState(null);
  const [imgResidents, setImgResidents] = useState([]);

  const getLocation = async (id) => {
    try {
      const response = await fetch(
        "https://rickandmortyapi.com/api/location/" + id
      );
      const json = await response.json();
      setLocation(json);
    } catch (error) {
      console.error(error);
    }
  };

  const getResidents = (residents) => {
    residents.forEach((url) => {
      getResident(url);
    });
  };

  const getResident = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const image = (
        <>
          <View style={{ flexDirection: "column", alignItems: "center", width: 60, margin: 8 }}>
            <Image
              source={{ uri: json.image }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                margin: 5,
              }}></Image>
            <Text style={{ fontSize: 11, textAlign: "center" }}>{json.name}</Text>
          </View>
        </>
      );
      setImgResidents((prevImg) => [...prevImg, image]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id !== 0) {
      getLocation(id);
    }
  }, [id]);

  useEffect(() => {
    if (location !== null) {
      navigation.setOptions({ title: location.name });
      getResidents(location.residents);
    }
  }, [location]);

  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      {location !== null && (
        <>
          <Text style={Styles.titulo}>{location.name}</Text>
          <Text style={Styles.dimension}>{location.dimension}</Text>
          <Text style={Styles.subTitulo}>Habitantes</Text>
          <ScrollView horizontal>{imgResidents}</ScrollView>
        </>
      )}
    </View>
  );
}
const Styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  titulo: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#00AAE9",
  },
  dimension: {
    padding: 10,
    fontSize: 15,
    color: "gray",
  },
  subTitulo: {
    padding: 10,
    fontSize: 20,
  },
});
