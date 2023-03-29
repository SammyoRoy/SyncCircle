import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const CreateGroup = () => {
  const [groupTitle, setGroupTitle] = useState('');

  const handleSubmit = () => {
    const url = 'http://localhost:4000/create';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ group: groupTitle })
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // navigate to /group page
      })
      .catch(error => {
        console.error(error);
        // handle the error
      });
  };

  return (
    <View>
      <Text>Create Group</Text>
      <TextInput
        placeholder="Group Title"
        value={groupTitle}
        onChangeText={setGroupTitle}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default CreateGroup;

