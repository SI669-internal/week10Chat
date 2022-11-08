import { Button } from 'react-native';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

function LobbyScreen({navigation, route}) {
  const activeUser = useSelector(state => state.activeUser );
  const users = useSelector(state => state.users);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello, {activeUser.displayName}!</Text>
        <Text>Who would you like to chat with today?</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={users.filter(item => item.userId !== activeUser.userId)}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={()=>{
                  navigation.navigate('Chat', {
                    activeUserId: activeUser.userId,
                    otherUserId: item.userId
                  });
                }}
              >
                <Text style={styles.listItem}>{item.displayName}</Text>
              </TouchableOpacity>
            )
          }}
          keyExtractor={item => item.userId}
        />
      </View>
      <View style={styles.footer}>
        <Button
          title='Sign Out'
          onPress={()=>{
            navigation.navigate('Login');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  header: {
    flex: 0.2,
    padding: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 24
  },
  listContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '70%',
  },
  listItem: {
    padding: '3%',
    fontSize: 20
  }
});

export default LobbyScreen;