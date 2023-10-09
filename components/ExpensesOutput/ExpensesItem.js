import { Pressable, StyleSheet, Text, View } from "react-native"
import {useNavigation} from '@react-navigation/native'

import { GlobalStyles } from "../../contants/styles"
import { getFormattedDate } from "../../util/date"

function ExpensesItem({ id , description , amount , date }) {
    const navigation = useNavigation()
    function exprensesPressHandler() {
        navigation.navigate('ManagerExpense', {
            expenseId: id
        })
    }

    return(
        <Pressable 
            onPress={exprensesPressHandler}
            style = {({ pressed }) => pressed && styles.pressed }
        >
            <View style= {styles.expensesItem}>
                <View >
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={[styles.textBase]}>{getFormattedDate(date)}</Text>
                </View>      
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>          
            </View>
        </Pressable>
    )
}

export default ExpensesItem 
const styles = StyleSheet.create({
    pressed:{
        opacity: 0.75
    },
    expensesItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: {width:1,height:1},
        shadowOpacity: 0.4,
        minWidth: 80
    },
    textBase: {
        color: GlobalStyles.colors.primary100,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 22,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,

    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
    }
})