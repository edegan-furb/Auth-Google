import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import SignInScreen from "./screens/SignInScreen";
import SignOutScreen from "./screens/SignOutScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

// This line ensures that any existing web browser authentication sessions are cleared before starting a new one.
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  //States
  const [userInfo, setUserInfo] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: process.env.WEBCLIENTID,
  });

  /* 
    This function retrieves user data from local storage using AsyncStorage 
    and updates the userInfo state variable.
  */
  const getLocalUser = async () => {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUserInfo(userData);
    } catch (e) {
      console.log(e, "Error getting local user");
    } finally {
      setLoading(false);
    }
  };

  //  This effect hook listens for changes in the response state variable.
  React.useEffect(() => {
    /*
      If a successful response is received from Google Sign-In:
      - it extracts the id_token
      - creates a Firebase credential
      - signs in the user.
      */
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  //  This effect hook runs once when the component is mounted.
  React.useEffect(() => {
    getLocalUser();
    //  It sets up an authentication state listener using Firebase's onAuthStateChanged function.
    const unsub = onAuthStateChanged(auth, async (user) => {
      //  If a user is authenticated, their information is stored locally and displayed.
      if (user) {
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
        //  If not, the userInfo state is set to null.
      } else {
        setUserInfo(null);
        console.log("user not authenticated");
      }
    });
    return () => unsub();
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  return userInfo ? (
    <SignOutScreen />
  ) : (
    <SignInScreen promptAsync={promptAsync} />
  );
}
