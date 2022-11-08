
const SET_ACTIVE_USER = 'SET_ACTIVE_USER';
const SET_ACTIVE_CHAT = 'LOAD_CHAT';
const ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE';

const initialState = {
  users: [
    { 
      displayName: 'Bob',
      userId: 'abc123'
    },
    {
      displayName: 'Alice',
      userId: 'def456'
    },
    {
      displayName: 'Charlie',
      userId: 'ghi789'
    },    
    {
      displayName: 'Dorothy',
      userId: 'jkl10'
    }
  ],
  chats: []
}

const setActiveUser = (state, payload) => {
  const { user } = payload;
  return {
    ...state,
    activeUser: user
  }
}

const setActiveChat = (state, payload) => {
  const {activeUser, otherUser} = payload;
  const chatId = [activeUser.userId, otherUser.userId].sort().join('_');  
  return {
    ...state,
    activeChatId: chatId
  }
}

const addChatMessage = (state, payload) => {
  const {message, user1Id, user2Id} = payload;

  // create a chat ID using the two users' IDs. Sort them so the ID will always match
  const chatId = [user1Id, user2Id].sort().join('_');

  // see if this chat already exists
  let activeChat = state.chats.find(item => item.chatId === chatId); // see if it exists

  // if not, create a new one
  if (!activeChat) { 
    activeChat = {
      chatId: chatId,
      user1Id: user1Id,
      user2Id: user2Id,
      messages: []
    }
  }

  // add the new message to the chat that was found or created
  let newChatMessages = activeChat.messages.concat(message);
  let newChat = {
    ...activeChat,
    messages: newChatMessages 
  }

  // update or add the new chat to the list of state.chats
  let newChats = state.chats.map(item=>item.chatId === newChat.chatId ? newChat : item);
  if (!newChats.find(item => item.chatId === newChat.chatId)) {
    newChats = state.chats.concat(newChat);
  }

  // push out a new state object!
  return {
    ...state,
    chats: newChats
  }
}

const rootReducer = (state=initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ACTIVE_USER:
      return setActiveUser(state, payload);
    case SET_ACTIVE_CHAT:
        return setActiveChat(state, payload);
    case ADD_CHAT_MESSAGE:
      return addChatMessage(state, payload);
    default:
      return state;
  }
}

export {
  rootReducer, 
  ADD_CHAT_MESSAGE, 
  SET_ACTIVE_CHAT, 
  SET_ACTIVE_USER
};