import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import useReceipe from "../../query/useReceipe";

export default () => {
  const { id } = useLocalSearchParams();

  if (!id) {
    return <Text>Missing id</Text>;
  }

  const { data } = useReceipe(id);

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>{data.title}</Text>
      <Text style={styles.h4}>Ingredients</Text>
      {data.ingredients
        .split("\n")
        .filter((x) => x !== "")
        .map((ingredient, index) => (
          <Text key={index}>- {ingredient}</Text>
        ))}
      <Text style={styles.h4}>Directions</Text>
      <Text>{data.directions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
