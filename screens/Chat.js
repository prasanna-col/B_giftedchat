import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, db } from './firebase';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const signOutNow = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.replace('Login');
        }).catch((error) => {
            // An error happened.
        });
    }
    useEffect(() => {
        // navigation.setOptions({
        //     headerLeft: () => (
        //         <View style={{ marginLeft: 20 }}>
        //             <Avatar
        //                 rounded
        //                 source={{
        //                     uri: auth?.currentUser?.photoURL,
        //                 }}
        //             />
        //         </View>
        //     ),
        //     headerRight: () => (
        //         <TouchableOpacity style={{
        //             marginRight: 10
        //         }}
        //             onPress={signOutNow}
        //         >
        //             <Text>logout</Text>
        //         </TouchableOpacity>
        //     )
        // })

        const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log("snapshot", snapshot)
            setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            }))
        )});

        return () => {
            unsubscribe();
        };

    }, [navigation]);

    const onSend = useCallback((messages = []) => {
        const { _id, createdAt, text, user, } = messages[0]

        addDoc(collection(db, 'chats'), { _id, createdAt, text, user });
    }, []);

    return (
        <View>
            <View style={styles.header}>
                <View style={styles.headerlft}>
                    <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { navigation.navigate('Login'); }}>
                        <Text style={styles.headerLfttxt}>Back</Text>
                        <Avatar
                            rounded
                            source={{
                                uri: auth?.currentUser?.photoURL,
                            }}
                        />
                    </TouchableOpacity>

                </View>
                <View style={styles.headerBody}>
                    <Text style={styles.headerBodyTxt}>Register</Text>
                </View>
                <View style={styles.headerryt}>
                    <TouchableOpacity style={{
                    }}
                        onPress={signOutNow}
                    >
                        <Text>logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={true}
                renderUsernameOnMessage={true}
                showUserAvatar={true}
                isTyping={true}
                onSend={messages => onSend(messages)}
                user={{
                    _id: auth?.currentUser?.email,
                    name: auth?.currentUser?.displayName,
                    avatar: auth?.currentUser?.photoURL
                }}
            />
        </View>

    );
}

export default Chat;