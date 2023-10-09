import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";

import { GlobalStyles } from "../contants/styles";
import ButtonUI from "../components/UI/ButtonUI";
import { ExpensesContext } from "../store/Expenses-Context";
import ExpensesForm from "../components/ManagerExpenses/ExpensesForm";

function ManagerExpenses({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpense = route.params?.expenseId;
  const isEditing = !!editedExpense;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpense
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpenses(editedExpense);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expensesData) {
    if (isEditing) {
      expensesCtx.updateExpenses(editedExpense,expensesData);
    } else {
      expensesCtx.addExpenses(expensesData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpensesForm
        onCancel={cancelHandler}
        submitButonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues = {selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            F
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManagerExpenses;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
