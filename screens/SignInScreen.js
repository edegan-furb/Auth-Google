import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

export default function SignInScreen({ promptAsync }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#171515",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          padding: 10,
        }}
      >
        <Ionicons name="logo-firebase" size={75} color="#F5820D" />
        <Ionicons name="add-outline" size={50} color="#ffffff" />
        <Ionicons name="logo-google" size={75} color="#4285F4" />
      </View>

      <Text style={{ fontSize: 32, fontWeight: "bold", color: "#ffffff" }}>
        Sign In with{" "}
        <Text style={{ color: "#4285F4" }}>
          G<Text style={{ color: "#EA4336" }}>o</Text>
          <Text style={{ color: "#FBBC04" }}>o</Text>
          <Text style={{ color: "#4285F4" }}>g</Text>
          <Text style={{ color: "#34A853" }}>l</Text>
          <Text style={{ color: "#EA4336" }}>e</Text>
        </Text>
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#4259f4",
          width: "90%",
          padding: 10,
          borderRadius: 15,
          marginTop: 80,
        }}
        onPress={() => promptAsync()}
      >
        <AntDesign name="google" size={30} color="white" />
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 17,
            marginLeft: 10,
          }}
        >
          Sign In with Google
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
