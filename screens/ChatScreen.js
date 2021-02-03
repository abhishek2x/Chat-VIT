import React, { useLayoutEffect, useState } from 'react'
import { Keyboard, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { KeyboardAvoidingView } from 'react-native';
import { auth, db } from '../firebase-config';
import * as firebase from 'firebase'

const ChatScreen = ({ navigation, route }) => {

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}>
          <Avatar
            rounded
            source={{
              uri: "data:image/jpeg;base64,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"
            }}
          />
          <Text
            style={{
              fontWeight: '700',
              color: 'white',
              marginLeft: 10
            }}
          >{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign
            name='arrowleft'
            size={24}
            color="white"
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20
          }}
        >
          <TouchableOpacity >
            <FontAwesome
              name='video-camera'
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity >
            <Ionicons
              name='call'
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      )

    })
  }, [navigation, messages])

  const sendMessage = () => {
    Keyboard.dismiss()
    db
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        displayName: auth.currentUser.displayName || '',
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL || '',
        message: input
      })

    setInput('')
  }

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          }))
        )
      })

    return unsubscribe
  }, [route])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        // behavior={Platform.OS === 'ios' ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <>
          <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
            {messages.map(({ id, data }) => (
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.receiver}>
                  <Avatar
                    rounded
                    source={{ uri: data.photoURL }}
                    position="absolute"
                    size={30}
                    bottom={-15}
                    right={-5}
                    // for web
                    containerStyle={{
                      position: 'relative',
                      bottom: -15,
                      right: -5
                    }}
                  />
                  <Text style={styles.receiverText} >
                    {data.message}
                  </Text>
                  <Text style={styles.receiverName} >
                    {data.displayName}
                  </Text>
                </View>
              ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      rounded
                      source={{ uri: data.photoURL }}
                      position="absolute"
                      size={30}
                      bottom={-15}
                      left={-5}
                      // for web
                      containerStyle={{
                        position: 'relative',
                        bottom: -15,
                        left: -5
                      }}
                    />
                    <Text style={styles.sendersText} >
                      {data.message}
                    </Text>
                    <Text style={styles.sendersName} >
                      {data.displayName}
                    </Text>
                  </View>
                )
            ))}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              placeholder="Enter a message"
              value={input}
              style={styles.textInput}
              onSubmitEditing={sendMessage}
              onChangeText={(text) => setInput(text)}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={sendMessage}
            >
              <Ionicons
                name='send'
                size={24}
                color="#2B68E6"
              />
            </TouchableOpacity>
          </View>
        </>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  receiver: {
    padding: 15,
    backgroundColor: '#ECECEC',
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative'
  },
  sender: {
    padding: 15,
    backgroundColor: '#2B6826',
    alignSelf: 'flex-start',
    borderRadius: 20,
    margin: 15,
    maxWidth: '80%',
    position: 'relative'
  },
  receiverText: {
    fontWeight: '500',
    color: 'black',
    marginLeft: 10,
  },
  sendersText: {
    marginLeft: 10,
    marginBottom: 15,
    fontWeight: '500',
    color: 'white'
  },
  sendersName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: 'white'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: 'transparent',
    backgroundColor: '#ECECEC',
    padding: 10,
    color: 'grey',
    borderRadius: 30
  },
})
