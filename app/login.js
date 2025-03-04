import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { Link, router } from "expo-router";
import { setKeyboardHeight, setUserId } from "../store/authReducer";
import { useDispatch } from "react-redux";
import { useKeyboard } from "../hooks/useKeyboard";

const App = () => {
  const dispatch = useDispatch();
  const isKeyboardOpen = useKeyboard();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isKeyboardOpen) {
      dispatch(setKeyboardHeight(isKeyboardOpen?.endCoordinates?.height));
    }
  }, [isKeyboardOpen]);

  const login = () => {
    auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then((e) => {
        dispatch(setUserId(e.user.uid));
        router.replace("/");
      })
      .catch((error) => {
        // Alert.alert(error);
        // console.log("error", JSON.stringify(error));
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.inputStyle}
        value={state.email}
        onChangeText={(e) => setState((prev) => ({ ...prev, email: e }))}
      />
      <TextInput
        placeholder="Password"
        style={styles.inputStyle}
        value={state.password}
        onChangeText={(e) => setState((prev) => ({ ...prev, password: e }))}
      />

      <Button title="Login" onPress={() => login()} />
      <Link href={"/signUp"}>Sign Up</Link>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "white",
    gap: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
  },
  inputStyle: {
    padding: 0,
    backgroundColor: "rgb(245, 245, 245)",
  },
});
