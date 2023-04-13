import {Pressable, Text, View} from "react-native";
import {TextInput} from "@react-native-material/core";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {useEffect, useState} from "react";
import {create} from "../services/bdd";
import {useNavigation} from "@react-navigation/native";

export const AddExpenseScreen = () => {

    const navigation = useNavigation();

    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)

    const [datetime, setDateTime] = useState()
    const [datetimeSql, setDateTimeSql] = useState()

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [amount, setAmount] = useState("0")

    const transformDateTime = (date, time) => {
        setDateTimeSql(`${date.getFullYear()}-${date.getMonth().toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')} ${time.getHours().toString().padStart(2,'0')}:${time.getMinutes().toString().padStart(2,'0')}`)
        setDateTime(`${date.getDate().toString().padStart(2,'0')} / ${date.getMonth().toString().padStart(2,'0')} / ${date.getFullYear()} ${time.getHours().toString().padStart(2,'0')}:${time.getMinutes().toString().padStart(2,'0')}`)
    }

    useEffect(() => {
        transformDateTime(date, time)
    }, [date, time])

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20}}>
            <TextInput
                label="Nom. Ex : Achat Mac"
                variant="filled"
                style={{
                    width: '80%'
                }}
                value={name}
                onChangeText={(text) =>{
                    setName(text)
                }}
            />
            <TextInput
                label="Catégorie. Ex : Maison"
                variant="filled"
                style={{
                    width: '80%'
                }}
                value={category}
                onChangeText={(text)=>{
                    setCategory(text)
                }}
            />
            <TextInput
                label="Montant"
                variant="filled"
                style={{
                    width: '80%'
                }}
                keyboardType="number-pad"
                value={amount.toString()}
                onChangeText={(text)=>{
                    setAmount(text)
                }}
            />

            <TextInput
                label="Date"
                variant="filled"
                style={{
                    width: '80%'
                }}
                value={datetime}
                onFocus={() => setShowDatePicker(true)}
                onPressIn={() => setShowDatePicker(true)}
            />
            {
                showDatePicker &&
                <RNDateTimePicker
                    display="default"
                    mode="date"
                    value={date}
                    onChange={(e, selectedDate) => {
                        setShowDatePicker(false)
                        if (e.type === "set") {
                            setDate(selectedDate)
                            setShowTimePicker(true)
                        }
                    }}
                />
            }
            {
                showTimePicker &&
                <RNDateTimePicker
                    display="default"
                    mode="time"
                    value={time}
                    is24Hour={true}
                    onChange={(_, selectedTime) => {
                        setShowTimePicker(false)
                        setTime(selectedTime)
                    }}
                />
            }
            <Pressable
                onPress={() => {
                    const montant = parseFloat(amount.replace(",", "."))
                    if (montant <= 0 || category.trim().length === 0 || name.trim().length === 0) {
                        alert("Veuillez vérifier les informations")
                        return
                    }
                    create(name, montant, category, datetimeSql)
                        .then(id => {
                            // TODO: si tout est correct vider les champs
                            console.log(id)
                            navigation.goBack()
                        })
                        .catch(err => {
                            alert(err)
                        })
                    console.log("Validation")
                }}>
                <Text style={{
                    backgroundColor: "blue",
                    paddingVertical: 10,
                    paddingHorizontal: 50,
                    color: 'white',
                    fontSize: 20,
                }}>Valider</Text>
            </Pressable>
        </View>
    )
}
