import Ionicons from "@expo/vector-icons/Ionicons";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import { useEffect, useState } from "react";

import useRecognizeImage from "../query/useRecognizeImage";
import useSearchRecipes from "../query/useSearchRecipes";
import Receipe from "../types/Receipe";
import { Link } from "expo-router";

const ReceipeCard = ({ receipe }: { receipe: Receipe }) => {
  return (
    <Link href={`/receipe/${receipe.id}`} style={styles.receipeCard}>
      <Text style={styles.h1}>{receipe.title}</Text>
      <Text style={styles.h4}>Ingredients</Text>
      {receipe.ingredients
        .split("\n")
        .slice(0, 3)
        .map((ingredient, index) => (
          <Text key={index}>- {ingredient}</Text>
        ))}
      <Text>...</Text>
    </Link>
  );
};

export default function App() {
  const [image, setImage] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const { data } = useRecognizeImage(image);
  const { data: recepies } = useSearchRecipes(searchText);

  useEffect(() => {
    if (data) {
      setSearchText(data.tag);
    }
  }, [data]);

  const getImage = (f: any) => async () => {
    setImage("");
    let result = await f({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.back,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    const manipulateResult = await manipulateAsync(
      result.assets[0].uri,
      [{ resize: { width: 300 } }],
      { format: SaveFormat.JPEG, compress: 1 } // from 0 to 1 "1 for best quality"
    );

    setImage(manipulateResult.base64 ?? manipulateResult.uri ?? "");
  };

  const pickImage = getImage(ImagePicker.launchImageLibraryAsync);
  const takeImage = getImage(ImagePicker.launchCameraAsync);

  return (
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
          value={searchText}
          onChangeText={setSearchText}
          inlineImageLeft="search"
          placeholder="What do you want to cook today?"
          placeholderTextColor="gray"
        />
        <Pressable onPress={pickImage}>
          <Ionicons name="image" size={30} color="#000" />
        </Pressable>
        <Pressable onPress={takeImage}>
          <Ionicons name="camera" size={30} color="#000" />
        </Pressable>
      </View>
      <View style={styles.recepicesContainer}>
        {image ? (
          <Image
            source={{
              uri: image.startsWith("file:///")
                ? image
                : "data:image/jpeg;base64," + image,
            }}
            style={{
              width: "100%",
              aspectRatio: "4/3",
              marginHorizontal: "auto",
              maxWidth: 500,
            }}
            resizeMode="cover"
          />
        ) : null}
        <FlatList
          data={recepies}
          renderItem={({ item }) => <ReceipeCard receipe={item} />}
          keyExtractor={(_, index) => index.toString()}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

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
    backgroundColor: "#ddd",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
  },
  h1: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  h4: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
