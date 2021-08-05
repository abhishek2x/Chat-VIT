import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, View, TextInput } from "react-native";
import { Button, Image, Input } from "react-native-elements";
import { auth } from "../firebase-config";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.navigate('Home')
      }
    });
  }, []);

  // useEffect(() => {
  //   console.log(email)
  //   console.log(password)
  // }, [email, password])

  const signin = () => {
    // let password1 = password.trim();
    // let email1 = email.trim();
    console.log(email);
    console.log(password);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var userLoggedIn = userCredential.user;
        console.log("Loggedin user", userLoggedIn);
        alert("User Logged in");
        navigation.replace("Home");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alert(errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://raw.githubusercontent.com/abhishek2x/Above-Belly/main/static/images/logooo.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          // autoFocus
          type="email"
          value={email}
          onChangeText={(currentText) => setEmail(currentText)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          secureTextEntry={true}
          onChangeText={(currentText) => setPassword(currentText)}
        />
      </View>
      <Button title="Login" containerStyle={styles.button} onPress={signin} />
      <Button
        title="Register"
        type="outline"
        containerStyle={styles.button}
        onPress={() => navigation.navigate("Register")}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
