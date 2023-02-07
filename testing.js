import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, FlatList, Text } from "react-native";

const Testing = () => {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  // console.log('data =>', data);

  const handleSubmit = () => {
    const newData = [...data, { name, phone, password, email, id }]
    setData(newData)
    setName("");
    setPhone("");
    setPassword("");
    setEmail("");
    setId("");
  }

  const handleUpdate = (index) => {
    const newData = [...data];
    newData[index].name = name;
    newData[index].phone = phone;
    newData[index].password = password;
    newData[index].email = email;
    newData[index].id = id;
    setData(newData);
    // setName("");
    // setPhone("");
    // setPassword("");
    // setEmail("");
    // setId("");
  }

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  }


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={setId}
      />
      <Button title="Submit" onPress={handleSubmit} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          console.log(item);
          return (
            <View>
              <TextInput
                style={styles.itemInput}
                value={item.name}
                onChangeText={(text) => {
                  const newData = [...data];
                  newData[index].name = text;
                  setData(newData);
                }}
              />
              <TextInput
                style={styles.itemInput}
                value={item.phone}
                onChangeText={(text) => {
                  const newData = [...data];
                  newData[index].phone = text;
                  setData(newData);
                }}
              />
              <TextInput
                style={styles.itemInput}
                value={item.email}
                onChangeText={(text) => {
                  const newData = [...data];
                  newData[index].email = text;
                  setData(newData);
                }}
              />
              <TextInput
                style={styles.itemInput}
                value={item.id}
                onChangeText={(text) => {
                  const newData = [...data];
                  newData[index].id = text;
                  setData(newData);
                }}
              />
              <Button title="Update" onPress={() => {
                setName(item.name);
                setPhone(item.phone);
                setPassword(item.password);
                setEmail(item.email);
                setId(item.id);
                handleUpdate(index);
                }} />
              <Button title="Delete" onPress={() => handleDelete(index)} />
            </View>
          )
        }}
      />
    </View>
  )
}

export default Testing

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
})