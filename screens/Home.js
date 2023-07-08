import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Episodes from "./Episodes/Episodes";
import Locations from "./Locations/Locations";

export default function Home({ navigation }) {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { color: "white"  },
        tabBarStyle: { backgroundColor: "black" },
      }}>
      <Tab.Screen name="Episodios" children={() => <Episodes navigation={navigation}/>} />
      <Tab.Screen name="Localizaciones" children={() => <Locations navigation={navigation}/>} />
    </Tab.Navigator>

  );
}
