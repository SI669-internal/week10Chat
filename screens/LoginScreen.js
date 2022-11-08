import { FlatList, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from '../data/Reducer';

function LoginScreen({navigation}) {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Who are you?</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={users}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={()=>{
                  const action = {
                    type: SET_ACTIVE_USER,
                    payload: {
                      user: item
                    }
                  }
                  dispatch(action);
                  navigation.navigate('Lobby');
                }}
              >
                <Text style={styles.listItem}>{item.displayName}</Text>
              </TouchableOpacity>
            )
          }}
          keyExtractor={item => item.userId}
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

export default LoginScreen;