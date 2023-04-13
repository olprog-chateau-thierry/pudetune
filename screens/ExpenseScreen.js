import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useState} from "react";
import {findAll, remove} from "../services/bdd";

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

    const [dataList, setDataList] = useState([])

    useFocusEffect(
        useCallback(() => {
            findAll()
                .then(list => setDataList(list))
            return () => {
            }
        }, [])
    )

    useEffect(() => {
        findAll()
            .then(list => setDataList(list))
    }, [])

    const handleDelete = (id) => {
        setDataList(dataList.filter(item => item.id !== id))
    }

    return (
        <View style={{flex: 1}}>
            {dataList.length > 0 &&
                <FlatList data={dataList}
                          renderItem={({item}) => <Card data={item} onDelete={handleDelete}/>}
                          keyExtractor={item => item.id}
                />
            }
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

const Card = ({data, onDelete}) => {
    return (
        <Pressable
            onLongPress={() => {
                console.log("suppression")
                remove(data.id)
                onDelete(data.id)
            }}>
            <View style={styles.card}>
                <Text style={styles.cardText}>{data.nom}</Text>
                <View style={styles.cardInfo}>
                    <Text style={styles.montant}>{data.montant} €</Text>
                    <Text>{data.categorie}</Text>
                </View>
                <Text>{data.date}</Text>
            </View>
        </Pressable>
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
