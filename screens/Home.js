import React, { useEffect } from 'react';
import { View, Alert, TouchableOpacity, Text, TextInput, FlatList } from 'react-native'
import { auth, db } from './firebase';

import Entypo from 'react-native-vector-icons/Entypo';
import { signOut } from 'firebase/auth';

import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';

import * as Styles from './Styles'
const styles = Styles.styles

const Home = ({ navigation }) => {

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
    ];

    const signOutNow = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.replace('Login');
        }).catch((error) => {
            // An error happened.
        });
    }

    useEffect(() => {

        const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log("snapshot", snapshot)
            // setMessages(
            //     snapshot.docs.map(doc => ({
            //         _id: doc.data()._id,
            //         createdAt: doc.data().createdAt.toDate(),
            //         text: doc.data().text,
            //         user: doc.data().user,
            //     }))
            // )
        }
        );

        return () => {
            unsubscribe();
        };

    }, [navigation]);





    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerlft}>
                </View>
                <View style={styles.headerBody}>
                    <Text style={styles.headerBodyTxt}>Register</Text>
                </View>
                <View style={styles.headerryt}>
                    <TouchableOpacity style={{
                    }}
                        onPress={signOutNow}
                    >
                        <Text style={styles.headerRyttxt}>L out</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                    <Text >{item.title}</Text>

                )}
                keyExtractor={item => item.id}
            />

        </View>
    )
}

export default Home;