import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';


// The "Edit" button calls the editUser function, which pre-fills the input fields with the selected user's data. The "Update" button updates the selected user's data with the new input field values using the updateUser function. 

const App = () => {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  //console.log(name, email, phone)

  const addUser = () => {
    const newUser = {
      id: Math.random(),
      name,
      phone,
      email,
    };
    setUser([...user, newUser]);
    setName('');
    setPhone('');
    setEmail('');
  };

  const deleteUser = (id) => {
    //console.log(id)
    const updatedUsers = user.filter((users) => users.id !== id);
    setUser(updatedUsers);
  };

  const editUser = (id) => {
    //console.log(id);
    const users = user.find((user) => user.id === id);
    setName(users.name);
    setEmail(users.email);
    setPhone(users.phone);
  };

  const updateUser = (id) => {
    
    const updatedUsers = user.map((users) => {
      if(users.id === id) {
        return{
          ...users,
          name: name,
          email: email,
          phone: phone,
        }
      } else {
        return users
      }
    })
    setUser(updatedUsers);
    setName('');
    setEmail('');
    setPhone('');
  }



  return (
    <View style={{ margin: 10 }}>
      <TextInput
        style={{
          height: 40,
          width: '100%',
          borderWidth: 1,
          borderColor: 'black',
        }}
       // placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={{ height: 40, width: '100%', borderWidth: 1, marginTop: 5 }}
        //placeholder="Phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={{ height: 40, width: '100%', borderWidth: 1, marginVertical: 5 }}
        //placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Add user" onPress={addUser} />

      {user.map((users) => (
        <View key={users.id} style={{ marginVertical: 10 }}>
          <Text>{users.name}</Text>
          <Text>{users.phone}</Text>
          <Text style={{ marginBottom: 5 }}>{users.email}</Text>

          <Button title="Edit" onPress={() => editUser(users.id)} />
          <View style={{marginVertical: 10}}>
            <Button title="Delete" onPress={() => deleteUser(users.id)} />
          </View>
          <Button title='update' onPress={() => updateUser(users.id)}/>
        </View>
      ))}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
