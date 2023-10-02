import { signOut } from "firebase/auth";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { auth } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";

export default function SignOutScreen() {
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    const getUserData = async () => {
      try {
        const userJSON = await AsyncStorage.getItem("@user");
        const userData = userJSON ? JSON.parse(userJSON) : null;
        setUserData(userData);
      } catch (error) {
        console.log(error, "Error getting user data");
      }
    };

    getUserData();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#171515",
      }}
    >
      {userData && (
        <>
          <View
            style={{
              alignItems: "center",
              padding: 25,
            }}
          >
            <View
              style={{
                borderWidth: 2,
                borderColor: "#ffffff",
                borderRadius: 100,
                padding: 5,
              }}
            >
              <Image
                source={{ uri: userData.photoURL }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 75,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#ffffff",
                marginTop: 10,
              }}
            >
              {userData.displayName}
            </Text>
          </View>
        </>
      )}
      <View
        style={{
          height: 1,
          width: "90%",
          backgroundColor: "#ffffff",
          marginVertical: 20,
        }}
      />
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#4285F4",
          width: "90%",
          padding: 10,
          borderRadius: 15,
          marginTop: 25,
        }}
        onPress={async () => {
          await signOut(auth);
          await AsyncStorage.removeItem("@user");
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 17,
            marginLeft: 10,
          }}
        >
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
