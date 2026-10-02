import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App(): React.JSX.Element {
  const [p1, setp1] = useState<string>("");
  const [p2, setp2] = useState<string>("");
  const [p1store, setp1store] = useState<string>("");
  const [p2store, setp2store] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");

  const handlePress = () => {
    setp1(p1store);
    setp2(p2store);
  };
  const p1playing = (
    P1playing: "Rock" | "Paper" | "Scissors",
    P2playing: "Rock" | "Paper" | "Scissors",
  ) => {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.row}>
          <Text style={styles.Played}>P1 "{p1}"</Text>
          <Text style={styles.versus}> Versus </Text>
          <Text style={styles.Played}>P2 "{p2}"</Text>
        </Text>
      </Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Hello</Text>
        </TouchableOpacity>
      </View>
      {greeting !== "" && <Text style={styles.greetingText}>{greeting}</Text>}
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.Played}>P1</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setp1store("Rock")}
            >
              Rock
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setp1store("Paper")}
            >
              Paper
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setp1store("Scissors")}
            >
              Scissors
            </TouchableOpacity>
          </View>
        </View>
        <Text></Text>
        <View style={styles.col}>
          <Text style={styles.Played}>P2</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setp2store("Rock")}
            >
              Rock
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setp2store("Paper")}
            >
              Paper
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setp2store("Scissors")}
            >
              Scissors
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    width: 200,
    marginRight: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  versus: {
    fontSize: 62,
    fontWeight: "bold",
  },
  Played: {
    fontSize: 62,
    fontWeight: "bold",
    textAlign: "center",
  },
  rpsrow: {
    flexDirection: "row",
  },
  col: {
    flexDirection: "column",
  },
});
