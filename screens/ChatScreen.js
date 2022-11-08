import { useDispatch, useSelector } from 'react-redux';
import { ADD_CHAT_MESSAGE, LOAD_CHAT } from '../data/Reducer';

import { useState } from 'react';
import { TextInput, Text, View, FlatList, StyleSheet } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';

export function ChatScreen ({navigation, route}) {

  const { activeUserId, otherUserId } = route.params;

  const activeUser = useSelector(state => {
    return state.users.find(item => item.userId === activeUserId);
  });

  const otherUser = useSelector(state => {
    return state.users.find(item => item.userId === otherUserId);
  });

  const messages = useSelector(state => {
    const chatId = [activeUserId, otherUserId].sort().join('_'); // should make this a function somewhere
    let activeChat = state.chats.find(item => item.chatId === chatId);
    if (activeChat) {
      return activeChat.messages;
    } else {
      return [];
    }
  });

  const dispatch = useDispatch();

  const [messageInput, setMessageInput] = useState('');

  return (
    <View style={styles.body}>
      
      <View style={styles.header}>
        <Icon
          name='arrow-left'
          size={32}
          onPress={()=>navigation.goBack()}
        />
        <Text style={styles.headerText}>
          {activeUser.displayName}, meet {otherUser.displayName}! 
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputBoxContainer}>
          <TextInput 
            style={styles.inputBox}
            placeholder='Type your message'
            value={messageInput}
            onChangeText={(text)=>setMessageInput(text)}
          />
        </View>
        <View style={styles.inputButtonContainer}>
          <Icon
            name='send'
            color='black'
            size={18}
            onPress={()=>{
              let messageContents = {
                text: messageInput,
                authorId: activeUserId,
                recipients: [otherUserId],
                timestamp: new Date().toISOString()
              };
              const action = {
                type: ADD_CHAT_MESSAGE,
                payload: {
                  message: messageContents, 
                  user1Id: activeUserId, 
                  user2Id: otherUserId
                }
              }
              dispatch(action);
              setMessageInput('');
            }}
          />
        </View>
      </View>

      <View style={styles.messageListContainer}>
        <FlatList
          data={messages}
          renderItem={({item}) => {
            return (
              <View style={[
                styles.messageContainer,
                item.authorId===activeUserId?{}:{alignItems: 'flex-end'}
              ]}>
                <Text style={styles.messageText}>
                  {item.authorId===activeUserId?'Me':otherUser.displayName}: {item.text}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: '15%',
    paddingHorizontal: '2%'
  },
  headerText: {
    fontSize: 32
  },
  header: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%'
  },

  inputContainer: {
    flex: 0.1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  inputBoxContainer: {
    flex: 0.8,
    paddingHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  inputButtonContainer: {
    flex: 0.2,
    paddingHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  inputBox: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 18,
    padding: '3%'
  },

  messageListContainer: {
    flex: 0.6,
    width: '100%',
    paddingHorizontal: '5%',
  },
  messageContainer: {
    flex: 1,
    width: '100%',
    padding: '5%',
    justifyContent: 'center',
    alignItems: 'flex-start',    
  },
  messageText: {
    fontSize: 18
  },
});

export default ChatScreen;
