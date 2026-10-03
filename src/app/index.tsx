import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App(): React.JSX.Element {
  const [p1, setp1] = useState<string>("");
  const [p2, setp2] = useState<string>("");
  const [p1store, setp1store] = useState<string>("");
  const [p2store, setp2store] = useState<string>("");
  const [winner, setwinner] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");

  const handlePress = () => {
    if (p1store && p2store !== "") {
      if (p1store == p2store) {
        setwinner("เสมอ");
      } else if (p1store == "Scissors" && p2store == "Paper") {
        setwinner("P1 ชนะ");
      } else if (p1store == "Rock" && p2store == "Scissors") {
        setwinner("P1 ชนะ");
      } else if (p1store == "Paper" && p2store == "Rock") {
        setwinner("P1 ชนะ");
      } else {
        setwinner("P2 ชนะ");
      }
    } else {
      setwinner("Both players must choose an option.");
    }
    setp1(p1store);
    setp2(p2store);
  };
  return (
    <View style={styles.container}>
      <Text testID="text-winner" style={styles.wintext}>
        {winner}
      </Text>
      <Text style={styles.title}>
        <Text style={styles.row}>
          <Text style={styles.Played}>P1 "{p1}"</Text>
          <Text style={styles.versus}> Versus </Text>
          <Text style={styles.Played}>P2 "{p2}"</Text>
        </Text>
      </Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text testID="btn-submit" style={styles.buttonText}>
            แสดงผล
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.Played}>P1</Text>
          <View style={styles.row}>
            <TouchableOpacity
              testID="p1-rock"
              style={styles.button}
              onPress={() => setp1store("Rock")}
            >
              <Text style={styles.buttonText}>Rock</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="p1-paper"
              style={styles.button}
              onPress={() => setp1store("Paper")}
            >
              <Text style={styles.buttonText}>Paper</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="p1-scissors"
              style={styles.button}
              onPress={() => setp1store("Scissors")}
            >
              <Text style={styles.buttonText}>Scissors</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.col}>
          <Text style={styles.Played}> | </Text>
          <Text style={styles.Played}> | </Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.Played}>P2</Text>
          <View style={styles.row}>
            <TouchableOpacity
              testID="p2-rock"
              style={styles.button}
              onPress={() => setp2store("Rock")}
            >
              <Text style={styles.buttonText}>Rock</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="p2-paper"
              style={styles.button}
              onPress={() => setp2store("Paper")}
            >
              <Text style={styles.buttonText}>Paper</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="p2-scissors"
              style={styles.button}
              onPress={() => setp2store("Scissors")}
            >
              <Text style={styles.buttonText}>Scissors</Text>
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
    marginHorizontal: 5,
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
  wintext: {
    fontSize: 124,
    fontWeight: "bold",
    textAlign: "center",
  },
});
