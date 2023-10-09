import { FlatList, StyleSheet,  } from "react-native"
import ExpensesItem from "./ExpensesItem"

function ExpensesList({expenses}) {
    function renderExpensesItem(itemData) {
        return (
            <ExpensesItem {...itemData.item}/>
        )
    }


    return(
        <FlatList 
            data={expenses}
            renderItem={renderExpensesItem}
            keyExtractor={(item) => item.id}
        />
    )
}

export default ExpensesList
const styles = StyleSheet.create({

})