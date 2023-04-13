import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useEffect, useState} from "react";
import {getStore, setStore} from "./services/shared_preferences";
import {setupDatabase} from "./services/bdd";
import {ExpenseScreen} from "./screens/ExpenseScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AddExpenseScreen} from "./screens/AddExpenseScreen";

function HomeScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Home!</Text>
            <Button
                title="Delete Username"
                onPress={()=>{
                  setStore("username", "")
                }}
            />
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Settings!</Text>
        </View>
    );
}

const ExpenseStack = createNativeStackNavigator();

const ExpenseHomeStack = () => {
    return (
        <ExpenseStack.Navigator>
            <ExpenseStack.Screen
                name="ALL_EXPENSES"
                component={ExpenseScreen}
                options={{headerTitle: 'Dépenses'}}
            />
            <ExpenseStack.Screen
                name="ADD_EXPENSE"
                component={AddExpenseScreen}
                options={{headerTitle: 'Ajouter une dépense'}}
            />
        </ExpenseStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

export default function App() {
    const [username, setUsername] = useState(null);
    const [formUser, setFormUser] = useState(null);

    setupDatabase();

    useEffect(() => {
        getStore("username")
            .then(user => {
                if (user) {
                    setUsername(user)
                }
            })
    }, [])

    return (
        <SafeAreaView style={{flex: 1}}>
            { username
                ? <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={({route}) => ({
                            tabBarIcon: ({focused, color, size}) => {
                                let iconName;

                                if (route.name === 'Expense') {
                                    iconName = focused
                                        ? 'ios-information-circle'
                                        : 'ios-information-circle-outline';
                                } else if (route.name === 'Settings') {
                                    iconName = focused ? 'ios-list' : 'ios-list-outline';
                                }

                                // You can return any component that you like here!
                                return <Ionicons name={iconName} size={size} color={color}/>;
                            },
                            tabBarActiveTintColor: 'tomato',
                            tabBarInactiveTintColor: 'gray',
                        })}
                    >
                        <Tab.Screen name="Expense"
                                    component={ExpenseHomeStack}
                                    options={{headerShown: false}}
                        />
                        <Tab.Screen name="Settings" component={SettingsScreen}/>
                    </Tab.Navigator>
                </NavigationContainer>
                : <View style={styles.form}>
                    <Text style={styles.label}>Veuillez entrer un pseudo :</Text>
                    <TextInput
                        onChangeText={(text) => setFormUser(text)}
                        value={formUser}
                        style={styles.input}
                    />
                    <Button
                        title="Valider"
                        onPress={ () => {
                            setStore("username", formUser)
                            setUsername(formUser)
                        }}
                        />
                </View>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 20
    },
    input: {
        height: 40,
        borderColor: "#333",
        borderWidth: 1,
        borderRadius: 5,
        width: '80%',
        margin: 5,
        padding: 5
    }
})
