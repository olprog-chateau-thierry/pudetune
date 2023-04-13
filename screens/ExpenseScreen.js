import {FlatList, StyleSheet, Text, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";

const DATA = [
    {
        id: 1,
        nom: "Macbook pro",
        montant: 2000,
        categorie: "PC",
        date: "2023-04-13",
    },
    {
        id: 2,
        nom: "Pizza Hawaiian",
        montant: 15,
        categorie: "Nourriture",
        date: "2023-04-09",
    },
    {
        id: 3,
        nom: "Porte de garage",
        montant: 10_000,
        categorie: "Maison",
        date: "2023-02-25",
    },
]

export const ExpenseScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{flex: 1}}>
            <FlatList data={DATA}
                      renderItem={({item}) => <Card data={item}/>}
                      keyExtractor={item => item.id}
            />
            <Ionicons
                name="add-circle"
                size={60}
                color="blue"
                style={styles.floatingBtn}
                onPress={() => {
                    navigation.navigate('ADD_EXPENSE')
                }}
            />
        </View>
    )
}

const Card = ({data}) => {
    return (
        <View style={styles.card}>
            <Text style={styles.cardText}>{data.nom}</Text>
            <View style={styles.cardInfo}>
                <Text style={styles.montant}>{data.montant} €</Text>
                <Text>{data.categorie}</Text>
            </View>
            <Text>{data.date}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    floatingBtn: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    card: {
        elevation: 10,
        backgroundColor: "white",
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    cardText: {
        fontSize: 20,
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    cardInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    montant: {
        fontWeight: 700,
        fontSize: 18
    }
})
