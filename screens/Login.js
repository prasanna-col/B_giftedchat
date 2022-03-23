import React, { useState } from 'react';
import { View, Alert, TouchableOpacity, Text, TextInput } from 'react-native'
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Styles from './Styles'
const styles = Styles.styles

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const openRegisterScreen = () => {
        navigation.navigate('Register');
    };

    const signin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("userCredential", userCredential)
                navigation.navigate('Home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerlft}>
                </View>
                <View style={styles.headerBody}>
                    <Text style={styles.headerBodyTxt}>Login</Text>
                </View>
                <View style={styles.headerryt}>
                </View>
            </View>
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
            <TouchableOpacity onPress={() => { signin() }} style={styles.button}>
                <Text style={styles.buttontxt}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { openRegisterScreen() }} style={styles.button} >
                <Text style={styles.buttontxt}>Register</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Login;