import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import ExpenseForm from './ExpenseForm'; 
import ExpenseItem from '../ExpenseItem/ExpenseItem'; 

function Expenses() {
    const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();

    useEffect(() => {
        getExpenses();
    }, [getExpenses]);

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expenses">
                    Total Expense: <span>₹{totalExpenses}</span> {/* Fixed totalExpenses to use as a value */}
                </h2>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm /> {/* Form for adding new expenses */}
                    </div>
                    <div className="expenses">
                        {expenses.length > 0 ? (
                            expenses.map((expense) => {
                                const { _id, title, amount, date, category, description, type } = expense;
                                console.log(expense);
                                return (
                                    <ExpenseItem
                                        key={_id}
                                        id={_id}
                                        title={title || 'No Title'}
                                        description={description || 'No Description'}
                                        amount={amount || 0}
                                        date={date || 'No Date'}
                                        type={type || 'Other'}
                                        category={category || 'Uncategorized'}
                                        indicatorColor="var(--color-red)"  // Assuming you want red color for expenses
                                        deleteItem={deleteExpense}
                                    />
                                );
                            })
                        ) : (
                            <p className="empty-message">No expenses to display. Add your first expense!</p>
                        )}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    );
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;

    .total-expenses {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: 0.5rem;

        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-red); /* You can adjust this color as needed */
        }
    }

    .expense-content {
        display: flex;
        gap: 2rem;

        .expenses {
            flex: 1;
        }

        .empty-message {
            font-size: 1.2rem;
            color: rgba(34, 34, 96, 0.6);
            text-align: center;
            margin-top: 1rem;
        }
    }
`;

export default Expenses;
