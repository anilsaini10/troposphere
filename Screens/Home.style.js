import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        paddingHorizontal:40
    },
    box:{
        marginBottom:10
    },
    pickerContainer:{
        borderWidth:1,
        borderRadius:10
    },
    title:{
        fontWeight:"600",
        fontSize:16,
        color:"black",
        marginBottom:10
    },
    heading:{
        color:"black",
        fontWeight:"800",
        marginTop:100,
        alignSelf:"center",
        fontSize:30,
        marginBottom:20
    },
    answerText:{
        fontWeight:"600",
        fontSize:16,
        color:"gray"
    },
    amountText:{
        fontSize:24,
        fontWeight:"900",
        color:"black"
    }
});

export default styles;