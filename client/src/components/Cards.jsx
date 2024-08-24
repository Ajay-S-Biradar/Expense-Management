import React, { useEffect } from 'react'
import Income from './Card'
import { DummyIncomes } from '../utils/dummyIncome'
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { addIncome, initialIncome } from '../store/incomeSlice';
import { initialExpense } from '../store/expenseSlice';

const Cards = ({apiString}) => {
  // const [incomes, setIncomes] = useState([]);
  const [alert, setAlert] = useState(false);

  // const location = useLocation().pathname ;
  // console.log(location);

  const dispatch = useDispatch();
  let items;
  if (apiString==='income')
    items = useSelector(appStore=>appStore.income.incomes);
  else items = useSelector(appStore=>appStore.expense.expenses)

  const navigate = useNavigate();
  useEffect(()=>{
    fetchData();
  },[]);

  const showAlert = ()=>{
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }

  const fetchData = async()=>{
    try {
      const res = await axios.get(API_URL+apiString,{
        withCredentials: true,
    });
    // console.log("error",res?.data?.error);
      if(res?.data?.error){
        showAlert();
      }
      if (apiString==='income') dispatch(initialIncome(res.data));
      else dispatch(initialExpense(res.data));
      console.log(res);
    } catch (error) {
      console.log(error.response);
      const stCode = error.response?.status
      if(stCode===400){
        navigate('/entry');
      }
      else if(stCode===401){
        navigate('/')
      }
    }
  }

  return (
    <>
      {alert && <div className="absolute top-0 p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
        <span className="font-medium">Warning alert!</span> Change a few things up and try submitting again.
      </div>}
      <div className='overflow-y-scroll w-full flex flex-col h-[80vh] gap-5 my-3 p-2'>
          {items.map((item, ind)=>{
              return <Card key={ind} item={item}/>
          })}
      </div>
    </>
  )
}

export default Cards