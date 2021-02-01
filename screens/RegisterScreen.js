import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from "../firebase-config"

const RegisterScreen = ({ navigation }) => {

  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Login',
    })
  }, [navigation])


  useEffect(() => {
    console.log(email)
    console.log(password)
  }, [email, password])

  const register = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log(email);
        console.log(authUser)
        authUser.user.updateProfile({
          displayName: fullname,
          photoURL: "https://ra.ac.ae/wp-content/uploads/2017/02/user-icon-placeholder.png"
        })
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        alert(errorMessage)
      })
  }

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>Create a Chat VIT account</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          // autoFocus
          type="text"
          value={fullname}
          onChangeText={(currentText) => setFullname(currentText)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(currentText) => setEmail(currentText)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(currentText) => setPassword(currentText)}
        />
      </View>
      <Button
        title="Register"
        containerStyle={styles.button}
        onPress={register}
      />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  inputContainer: {
    width: 300
  },
  button: {
    width: 200,
    marginTop: 10
  }
})
