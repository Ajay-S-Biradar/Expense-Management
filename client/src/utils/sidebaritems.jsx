import {  dashboard, expenses, incomes, transactions } from "./icons";

export const menuItems = [
    {
        id: 1,
        title: "Dashboards",
        icon: dashboard,
        link: "/user",
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/user/transactions",
    },
    {
        id: 3,
        title: "Incomes",
        icon: incomes,
        link: "/user/incomes",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/user/expenses",
    },
]