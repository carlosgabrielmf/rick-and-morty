import "react-native-gesture-handler";
import { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FilterContext } from "./screens/contexts/FilterContext";
import { Searchbar } from "react-native-paper";
import Home from "./screens/Home";
import Episode from "./screens/Episodes/Episode";
import Location from "./screens/Locations/Location";

export default function App() {
  const Stack = createStackNavigator();
  const [filter, setFilter] = useState("");
  const searchBar = useRef(null);
  return (
    <FilterContext.Provider value={[filter, setFilter]}>
      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator>
          <Stack.Screen
            name="Rick and Morty"
            component={Home}
            options={{
              headerTintColor: "white",
              headerStyle: { backgroundColor: "black" },
              title: "Rick and Morty",
              headerRight: () => (
                <Searchbar
                  placeholder="search"
                  placeholderTextColor="#FFF"
                  color="#FFF"
                  textAlign="right"
                  onIconPress={() => searchBar.current.focus()}
                  onChangeText={(e) => setFilter(e)}
                  value={filter}
                  ref={searchBar}
                  style={{
                    backgroundColor: "black",
                    placeholderTextColor: "#FFF",
                    flexDirection: "row-reverse",
                  }}
                  iconColor="#FFF"
                />
              ),
            }}
          />
          <Stack.Screen
            name="Episodio"
            component={Episode}
            options={{
              headerTintColor: "white",
              headerStyle: { backgroundColor: "black" },
            }}
          />
          <Stack.Screen
            name="Localizacion"
            component={Location}
            options={{
              headerTintColor: "white",
              headerStyle: { backgroundColor: "black" },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FilterContext.Provider>
  );
}
