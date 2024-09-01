import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Cards from "../components/Cards/index";
import { Modal } from "antd";
import AddExpense from "../components/Modals/addExpense";
import AddIncome from "../components/Modals/addIncome";
import {deleteDoc,doc, collection, addDoc,getDocs,query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import TransactionTable from "../components/TransactionsTable/index";
import ChartComponent from "../components/charts/index";
import NoTransaction from "../components/Notransaction";

function Dashboard() {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [user] = useAuthState(auth);
  const [income,setIncome]=useState(0);
  const [expense,setExpense]=useState(0);
  const [balance,setBalance]=useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  

  const onFinish = (values, type) => {
    const amount = parseFloat(values.amount);

    if (isNaN(amount)) {
      toast.error("Please enter a valid amount",{autoClose:1000});
      return;
    } 
    const newTransaction = {
      type: type,
      date:values.date.format("YYYY-MM-DD"),
      amount:amount,
      tag: values.tag,
      name: values.name,
    };
    console.log(newTransaction);
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction,many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log(docRef.id);
      if(!many)toast.success("Transaction added!",{autoClose:1000});
      let newArray=transactions;
      console.log(newArray);
      newArray.push(transaction);
      setTransactions(newArray);
      calculateBalance();
    } catch (e) {
      console.error(e);
     if(!many) toast.error("couldn't add transaction",{autoClose:1000});
    }
  }

  useEffect(()=>{
    fetchTransaction();
  },[user]);
 

  useEffect(() => {
    calculateBalance();
  }, [transactions]);
  
const calculateBalance=()=>{
  let totalIncome=0;
  let totalExpense=0;
  transactions.forEach((transaction)=>{
    if(transaction.type==="income"){
      totalIncome+=transaction.amount;
    }
    else{
      totalExpense+=transaction.amount;
    }
  })
  setExpense(totalExpense);
  setIncome(totalIncome);
  setBalance(totalIncome-totalExpense);
}

  
  async function fetchTransaction() {
    setLoading(true);
    if (user) {
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnapshot = await getDocs(q);
        let transactionArray = [];
        querySnapshot.forEach((doc) => {
          transactionArray.push(doc.data());
        });
        setTransactions(transactionArray);
        console.log("transaction array",transactionArray); 
        toast.success("Transaction fetched!",{autoClose:1000});
    } 
    setLoading(false);
  }

 let sortTransactions=transactions.sort((a,b)=>{
  return new Date(a.date)-new Date(b.date);
 })

 async function resetBalance() {
  try {
    const q = query(collection(db, `users/${user.uid}/transactions`));
    const querySnapshot = await getDocs(q);

    const deletePromises = querySnapshot.docs.map((docSnapshot) => 
      deleteDoc(doc(db, `users/${user.uid}/transactions`, docSnapshot.id))
    );

    await Promise.all(deletePromises);
    setTransactions([]);
    setIncome(0);
    setExpense(0);
    setBalance(0);

    toast.success("All transactions reset successfully!", { autoClose: 1000 });
  } catch (e) {
    toast.error("Failed to reset transactions", { autoClose: 1000 });
  }
}
  return (
    <div>
      <Header />
      {loading ? (<p>loading...</p>):(
        <>
        <Cards
        income={income}
        expense={expense}
        balance={balance}
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
        resetBalance={resetBalance}
      />
      {transactions && transactions.length !==0 ? <ChartComponent sortTransactions={sortTransactions}/> : <NoTransaction/>}
      <AddIncome
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />
      <AddExpense
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />
      <TransactionTable transactions={transactions} addTransaction={addTransaction} fetchTransactions={fetchTransaction}/>
        </>
      )}
    </div>
  );
}

export default Dashboard;
