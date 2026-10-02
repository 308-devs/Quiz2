import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App(): React.JSX.Element {
  const [p1, setp1] = useState<string>("Rock");
  const [p2, setp2] = useState<string>("Rock");
  const [name, setName] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");

  const handlePress = () => {
    if (name.trim()) {
      setGreeting(`Hello ${name.trim()}`);
    } else {
      setGreeting("");
    }
  };

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
    flexDirection: "row", // จัด TextInput กับ Button ให้อยู่แถวเดียวกัน
    alignItems: "center",
    marginBottom: 20,
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
  },
});
