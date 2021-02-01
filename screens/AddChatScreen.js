import React, { useLayoutEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import { db } from '../firebase-config'

const AddChatScreen = ({ navigation }) => {

  const [input, setInput] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats"
    })
  }, [navigation])

  const createChat = async () => {
    await db.collection('chats').add({
      chatName: input
    }).then(() => {
      navigation.goBack()
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      alert(errorMessage)
    })
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter Chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon
            name="wechat"
            type="antdesign"
            size={24}
            color="black"
          />
        }
      />
      <Button
        onPress={createChat}
        title="Create New Chat"
      />
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    height: "100%"
  }
})
