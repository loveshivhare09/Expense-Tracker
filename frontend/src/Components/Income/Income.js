import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
    const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

    useEffect(() => {
        getIncomes();
    }, [getIncomes]);

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">
                    Total Income: <span>₹{totalIncome}</span>
                </h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        {incomes.length > 0 ? (
                            incomes.map(({ _id, title, amount, date, category, description, type }) => (
                                <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title || 'No Title'}
                                    description={description || 'No Description'}
                                    amount={amount || 0}
                                    date={date || 'No Date'}
                                    type={type || 'Other'}
                                    category={category || 'Uncategorized'}
                                    indicatorColor="var(--color-green)"
                                    deleteItem={deleteIncome}
                                />
                            ))
                        ) : (
                            <p className="empty-message">No incomes to display. Add your first income!</p>
                        )}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;

    .total-income {
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
            color: var(--color-green);
        }
    }

    .income-content {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;

        .form-container {
            flex: 1;
        }

        .incomes {
            flex: 1;

            .empty-message {
                font-size: 1.2rem;
                color: rgba(34, 34, 96, 0.6);
                text-align: center;
                margin-top: 1rem;
            }
        }
    }
`;

export default Income;
