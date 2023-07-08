import { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from '@react-navigation/native';
import { FilterContext } from "../contexts/FilterContext"

export default function Episodes({ navigation }) {
  // Establishing constants to searchbar
  const [filter, setFilter] = useContext(FilterContext);
  const isFocused = useIsFocused();

  useEffect(()=>{
    if(isFocused){
      setFilter("");
    }
  },[isFocused])

  // Establishing constants to the episode and lists
  const [episodes, setEpisodes] = useState([]);
  const [listEpisode, setListEpisode] = useState(<></>);

  // We obtain the reponse of the API and catch de error
  const getEpisodes = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/episode");
      const json = await response.json();
      setEpisodes(json.results);
    } catch (error) {
      console.error(error);
    }
  };

  // We obtain the results from de API and show the results.
  const getListEpisodes = () => {
    let list = episodes.map((e) => {
      const eName = e.name.toUpperCase();
      if (eName.startsWith(filter.toUpperCase()) || eName.includes(filter.toUpperCase())) {
        return (
          <TouchableOpacity
            style={Styles.touch}
            key={"epi" + e.id}
            onPress={() => {
              navigation.navigate("Episodio", { id: e.id });
            }}
          >
            <Text style={Styles.episode}>{e.episode}</Text>
            <Text>{e.name}</Text>
            <Text style={Styles.fecha}>{e.air_date}</Text>
          </TouchableOpacity>
        );
      }
    });

    setListEpisode(list);
  };

  // We run response
  useEffect(() => {
    getListEpisodes();
  }, [episodes, filter]);

  useEffect(() => {
    getEpisodes();
  }, []);

  return (
    <>
      <ScrollView>{listEpisode}</ScrollView>
    </>
  );
}

const Styles = StyleSheet.create({
  touch: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  episode: {
    color: "gray",
    fontSize: 12
  },
  date: {
    color: "#00AAE9",
    fontSize: 14
  },
});
