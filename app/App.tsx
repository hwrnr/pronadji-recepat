import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import * as ImagePicker from "expo-image-picker";

import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";

type Receipe = {
  name: string;
  info: string;
};

const recepies: Array<Receipe> = [
  {
    name: "Egg",
    info: "Egg is a good source of protein",
  },
  {
    name: "Bread",
    info: "Bread is a good source of carbohydrate",
  },
  {
    name: "Milk",
    info: "Milk is a good source of calcium",
  },
  {
    name: "Apple",
    info: "Apple is a good source of fiber",
  },
];

const ReceipeCard = ({ receipe }: { receipe: Receipe }) => {
  return (
    <View style={styles.receipeCard}>
      <Text style={styles.h1}>{receipe.name}</Text>
      <Text>{receipe.info}</Text>
    </View>
  );
};

function App() {
  const [image, setImage] = useState<string>("");

  const getImage = (f: any) => async () => {
    let result = await f({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.back,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImage = getImage(ImagePicker.launchImageLibraryAsync);
  const takeImage = getImage(ImagePicker.launchCameraAsync);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={30} color="#000" />
          <TextInput
            style={{
              height: 40,
              paddingHorizontal: 10,
              flex: 1,
              fontSize: 16,
            }}
            placeholder="What do you want to cook today?"
            placeholderTextColor="gray"
          />
          <Pressable onPress={pickImage}>
            <Ionicons name="image" size={30} color="#000" />
          </Pressable>
          <Ionicons name="camera" size={30} color="#000" onPress={takeImage} />
        </View>
        <View style={styles.recepicesContainer}>
          {recepies.map((receipe, index) => (
            <ReceipeCard key={index} receipe={receipe} />
          ))}
        </View>
      </View>
    </NavigationContainer>
  );
}

export default function Wrapper() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <App />
      <StatusBar style="auto" translucent={false} />
    </SafeAreaView>
  );
}

// TODO: Fix invisible status bar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    gap: 10,
  },
  recepicesContainer: {
    flex: 1,
  },
  receipeCard: {
    padding: 10,
    margin: 10,
  },
  h1: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
