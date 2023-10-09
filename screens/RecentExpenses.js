import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/Expenses-Context";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
  const expenseCtx = useContext(ExpensesContext);
  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 200);

    return expense.date > date7DaysAgo;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 200 days"
      fallBackText="No expenses registered for the last 200 days"
    />
  );
}

export default RecentExpenses;
