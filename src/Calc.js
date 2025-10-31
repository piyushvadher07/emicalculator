import React, { useState } from "react";

const EmiCalculator = () => {
  const [userValues, setUserValues] = useState({
    amount: "",
    interest: "",
    years: "",
  });
  const [results, setResults] = useState({
    monthlyPayment: "",
    totalPayment: "",
    totalInterest: "",
    isResult: false,
  });

  const calculateResults = ({ amount, interest, years }) => {
    const userAmount = Number(amount);
    const calculatedInterest = Number(interest) / 100 / 12;
    const calculatedPayments = Number(years) * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (userAmount * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      const monthlyPaymentCalculated = monthly.toFixed(2);
      const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
      const totalInterestCalculated = (
        monthly * calculatedPayments -
        userAmount
      ).toFixed(2);

      setResults({
        monthlyPayment: monthlyPaymentCalculated,
        totalPayment: totalPaymentCalculated,
        totalInterest: totalInterestCalculated,
        isResult: true,
      });
    }
    return;
  };

  const handleInputChange = (event) =>
    setUserValues({ ...userValues, [event.target.name]: event.target.value });

  const handleSubmitValues = (e) => {
    e.preventDefault();
    calculateResults(userValues);

    console.log(userValues);
  };
  return (
    <>
      <h1>EMI - CALCULATOR</h1>
      <form onSubmit={handleSubmitValues}>
        <div>
          <div>
            <label>Amount:</label>
            <input
              type="text"
              name="amount"
              placeholder="Loan amount"
              value={userValues.amount}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Annual interest rate (%):</label>
            <input
              type="text"
              name="interest"
              placeholder="Annual interest rate (%)"
              value={userValues.interest}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Loan term (in years):</label>
            <input
              type="text"
              name="years"
              placeholder="Loan term (in years)"
              value={userValues.years}
              onChange={handleInputChange}
            />
            <input type="submit" />
          </div>
        </div>
      </form>

      <div>
        <h4>
          Loan amount: ${userValues.amount} <br />
          Interest:{userValues.interest}% <br />
          Years to repay: {userValues.years}
        </h4>
        <div>
          <label>Monthly EMI payment:</label>
          <input type="text" value={results.monthlyPayment} disabled />
        </div>
        <div>
          <label>Total payment amount: </label>
          <input type="text" value={results.totalPayment} disabled />
        </div>
        <div>
          <label>Total interest paid:</label>
          <input type="text" value={results.totalInterest} disabled />
        </div>
      </div>
    </>
  );
};

export default EmiCalculator;
