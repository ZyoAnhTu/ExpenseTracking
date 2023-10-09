import { StyleSheet, View, Text, Alert } from "react-native";
import { useState } from "react";

import Input from "./Input";
import ButtonUI from "../UI/ButtonUI";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../contants/styles";

function ExpensesForm({ submitButonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputS, setInputS] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid:true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputS((curInputS) => {
      return {
        ...curInputS,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  function submitHandler() {
    const expensesData = {
      amount: +inputS.amount.value,
      date: new Date(inputS.date.value),
      description: inputS.description.value,
    };

    const amountIsValid =
      !isNaN(expensesData.amount) && expensesData.amount > 0;
    const dateIsValid = expensesData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expensesData.description.trim().length > 0;

    if (!amountIsValid || !descriptionIsValid || !dateIsValid) {
      //   Alert.alert("Invalid Input", "Please check your input value");
      setInputS((curInputS) => {
        return {
          amount: { value: curInputS.amount.value, isValid: amountIsValid },
          date: { value: curInputS.date.value, isValid: dateIsValid },
          description: {
            value: curInputS.amount.description,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expensesData);
  }

  const formIsValid =
    !inputS.amount.isValid || !inputS.date.isValid || !inputS.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expenses</Text>
      <View style={styles.inputRows}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid= {!inputS.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputS.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid= {!inputS.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputS.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid= {!inputS.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputS.description.value,
        }}
      />
      {formIsValid && (<Text style = {styles.errorText}>Invalid input value - please check you entered data!</Text>)}
      <View style={styles.buttons}>
        <ButtonUI style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </ButtonUI>
        <ButtonUI style={styles.button} onPress={submitHandler}>
          {submitButonLabel}
        </ButtonUI>
      </View>
    </View>
  );
}

export default ExpensesForm;
const styles = StyleSheet.create({
  form: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginVertical: 24,
    textAlign: "center",
  },
  inputRows: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8
  }
});
