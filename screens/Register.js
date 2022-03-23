import React, { useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Text, Alert } from 'react-native'
import { auth } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import * as Styles from './Styles'
const styles = Styles.styles

const Register = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Registered
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name,
                    photoURL: avatar ? avatar : 'https://themalestrom.com/wp-content/uploads/Screen-Shot-2018-11-09-at-11.24.54.png',
                })
                    .then(() => {
                        Alert.alert(
                            'Registered Successfull',
                            "",
                            [
                                {
                                    text: 'Login',
                                    onPress: () => console.log('Install Pressed')
                                }
                            ]
                        );
                    })
                    .catch((error) => {
                        alert(error.message);
                    })
            })
            .catch((error) => {
                console.log("createUserWithEmailAndPassword error", error)
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerlft}>
                    <TouchableOpacity onPress={()=>{ navigation.navigate('Login');}}>
                        <Text style={styles.headerLfttxt}>Back</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.headerBody}>
                    <Text style={styles.headerBodyTxt}>Register</Text>
                </View>
                <View style={styles.headerryt}>
                </View>
            </View>
            <ScrollView style={styles.scroll}>

                <TextInput
                    style={styles.input}
                    onChangeText={text => setName(text)}
                    value={name}
                    placeholder='Enter your Name'
                />

                <TextInput
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                    value={email}
                    placeholder='Enter your email'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    placeholder='Enter your password'
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setAvatar(text)}
                    value={avatar}
                    placeholder='Enter your image url'
                />


                <TouchableOpacity onPress={() => { register() }} style={styles.button}>
                    <Text style={styles.buttontxt}>Register</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}

export default Register;