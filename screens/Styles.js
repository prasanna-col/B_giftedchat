import { StyleSheet } from 'react-native'
import * as Colors from './Colors'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        padding: 10,alignItems:"center",
        backgroundColor: "#fff"
    },
    input: {
        height: 40,
        width: "50%",
        margin: 12,
        borderLeftColor: Colors.df,
        borderLeftWidth: 1,
        padding: 10,
    },
    button: {
        width: "50%",
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: Colors.df,
        height: 50, alignItems: "center", justifyContent: "center"
    },
    buttontxt: {
        fontWeight: "bold", color: "#fff"
    },
    reg_container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginTop: 100,
    },
    scroll:{
        width:"100%"
    },
    header:{width:"100%", height:50, flexDirection:"row"},
    headerlft:{
        width:"10%", alignItems:"center", justifyContent:"center"
    },
    headerBody:{
        width:"80%", alignItems:"center", justifyContent:"center"
    },
    headerryt:{
        width:"10%", alignItems:"center", justifyContent:"center"
    },
    headerBodyTxt:{
        fontWeight:"bold", color:Colors.df, fontSize:20
    },
    headerLfttxt:{
        color:Colors.df,
    },
    headerRyttxt:{
        color:Colors.df,
    }
});