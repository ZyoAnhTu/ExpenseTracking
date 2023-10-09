import { Children, createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2023-02-16')
    },
    {
        id: 'e2',
        description: 'A pair of hoddie',
        amount: 39.99,
        date: new Date('2023-02-12')
    },
    {
        id: 'e3',
        description: 'A pair of trousers',
        amount: 69.99,
        date: new Date('2023-02-20')
    },
    {
        id: 'e4',
        description: 'A pair of shoes',
        amount: 29.99,
        date: new Date('2023-02-23')
    },
    {
        id: 'e5',
        description: 'A pair of hoodies',
        amount: 19.99,
        date: new Date('2023-05-20')
    },
    {
        id: 'e6',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2023-02-16')
    },
    {
        id: 'e7',
        description: 'A pair of hoddie',
        amount: 39.99,
        date: new Date('2023-02-12')
    },
    {
        id: 'e8',
        description: 'A pair of trousers',
        amount: 69.99,
        date: new Date('2023-02-20')
    },
    {
        id: 'e9',
        description: 'A pair of shoes',
        amount: 29.99,
        date: new Date('2023-02-23')
    },
    {
        id: 'e10',
        description: 'A pair of hoodies',
        amount: 19.99,
        date: new Date('2023-05-20')
    },
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpenses: ({description , amount , date}) => {},
    updateExpenses: (id , {description , amount , date}) => {},
    deleteExpenses: (id) => {}
})

function ExpensesReducer(state, action) {
    switch(action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString()
            return [{ ...action.payload, id: id}, ...state]
        case 'UPDATE':
            const updatableExpensesIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            )
            const updatableExpenses = state[updatableExpensesIndex]
            const updatedItem = { ...updatableExpenses, ...action.payload.data}
            const updatedExpenses = [...state]
            updatedExpenses[updatableExpensesIndex] = updatedItem
            return updatedExpenses
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default: 
            return state
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(ExpensesReducer,DUMMY_EXPENSES)

    function addExpenses(expensesData) {
        dispatch({type: 'ADD', payload: expensesData})
    }

    function deleteExpenses(id) {
        dispatch({ type: 'DELETE', payload: id });
      }

    function updateExpenses(id, expensesData) {
        dispatch({type: 'UPDATE', payload: {id: id , data: expensesData}})
    }
    
    const value = {
        expenses: expensesState,
        addExpenses: addExpenses,
        updateExpenses: updateExpenses,
        deleteExpenses: deleteExpenses
    }
    return (
        <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider