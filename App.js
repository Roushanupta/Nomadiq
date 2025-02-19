import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import axios from "axios";

export default function App() {
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("3");
  const [interests, setInterests] = useState("");
  const [itinerary, setItinerary] = useState("");

  const generateItinerary = async () => {
    try {
      const response = await axios.post("http://localhost:5000/generate-itinerary", {
        location,
        days,
        interests,
      });
      setItinerary(response.data.itinerary);
    } catch (error) {
      setItinerary("Error fetching itinerary");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter Destination:</Text>
      <TextInput style={{ borderBottomWidth: 1, marginBottom: 10 }} value={location} onChangeText={setLocation} />

      <Text>Number of Days:</Text>
      <TextInput style={{ borderBottomWidth: 1, marginBottom: 10 }} value={days} onChangeText={setDays} keyboardType="numeric" />

      <Text>Interests (e.g., adventure, history, food):</Text>
      <TextInput style={{ borderBottomWidth: 1, marginBottom: 10 }} value={interests} onChangeText={setInterests} />

      <Button title="Generate Itinerary" onPress={generateItinerary} />

      <ScrollView style={{ marginTop: 20 }}>
        <Text>{itinerary}</Text>
      </ScrollView>
    </View>
  );
}
