import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

export default function Episode({ route, navigation }) {
  const { id = 0 } = route.params;

  const [episode, setEpisode] = useState(null);
  const [imgCharacters, setImgCharacters] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState(false);

  const getEpisode = async (id) => {
    try {
      const response = await fetch(
        "https://rickandmortyapi.com/api/episode/" + id
      );
      const json = await response.json();
      setEpisode(json);
      json.characters.forEach((url) => {
        getCharacter(url);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getCharacters = (characters) => {
    characters.forEach((url) => {
      getCharacter(url);
    });
  };

  const getCharacter = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const image = (
        <>
          <View style={{ flexDirection: "column", width: 80 }}>
            <Image
              source={{ uri: json.image }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                margin: 5,
              }}></Image>
            <Text style={{ fontSize: 11, margin: 5, textAlign: "center" }}>
              {json.name}
            </Text>
          </View>
        </>
      );
      setImgCharacters((prevImg) => [...prevImg, image]);
    } catch (error) {
      console.error(error);
    }
  };

  const sendForm = async () => {
    if (name === "" || email === "" || comment === "") {
      setFormError(true);
      return;
    }

    try {
      const response = await fetch("https://example.com/api/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          comment: comment,
        }),
      });

      if (response.ok) {
        console.log("Petición enviada exitosamente");
        setName("");
        setEmail("");
        setComment("");
        setFormError(false);
      } else {
        console.error("Error al enviar la petición");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id !== 0) {
      getEpisode(id);
    }
  }, [id]);

  useEffect(() => {
    if (episode !== null) {
      navigation.setOptions({ title: episode.name });
      getCharacters(episode.characters);
    }
  }, [episode]);

  return (
    <View>
      {episode !== null && (
        <>
          <Text style={Styles.titulo}>
            {episode.episode}: {episode.name}
          </Text>
          <Text style={Styles.fecha}>{episode.air_date}</Text>
          <Text style={Styles.subTitulo}>Personajes</Text>
          <ScrollView horizontal>{imgCharacters}</ScrollView>
          <Text style={Styles.subTitulo}>Comentarios</Text>
          <TextInput
            style={Styles.inputSingle}
            placeholder="Nombre"
            value={name}
            onChangeText={(text) => setName(text)}></TextInput>
          <TextInput
            style={Styles.inputSingle}
            placeholder="Correo Electronico"
            value={email}
            onChangeText={(text) => setEmail(text)}></TextInput>
          <TextInput
            style={Styles.inputMulti}
            placeholder="Comentario (max 500 caracteres)"
            multiline
            require
            value={comment}
            onChangeText={(text) => setComment(text)}></TextInput>
          {formError && (
            <Text style={Styles.errorText}>
              Todos los campos son obligatorios
            </Text>
          )}
          <Pressable style={Styles.button} onPress={sendForm}>
            <Text style={Styles.text}>Enviar</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 15,
    marginLeft: 10,
  },
  button: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#00AAE9",
  },
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
  fecha: {
    padding: 10,
    fontSize: 15,
    color: "gray",
  },
  subTitulo: {
    padding: 10,
    fontSize: 20,
  },
  inputSingle: {
    borderColor: "#ccc",
    color: "#000",
    borderWidth: 1,
    padding: 8,
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
  },
  inputMulti: {
    borderColor: "#ccc",
    color: "#000",
    borderWidth: 1,
    padding: 8,
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
    height: 100,
    textAlignVertical: "top",
  },
});
