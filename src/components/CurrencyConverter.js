// We are going to make the API call inside the useEffect Hook/ with the help of useEffect Hook.
import React, { useState, useEffect } from "react";
import { Card } from "antd";

// Already installed the "axios" package for calling the API, just making a Functional Component here.
import axios from "axios";



const Convertor = () => {
  // Inserting the HOOKS
  const [initialState, setState] = useState({
    currencies: ["USD", "SGD", "PHP", "EUR", "INR"],
    base: "USD",
    amount: "",
    convertTo: "INR",
    result: "",
    date: "",
  });


  // Destructuring of the Initial State so that we need not write like initialState.currency, initialState.base, etc again & again
  const { currencies, base, amount, convertTo, result, date } = initialState;


  // The API CALL (happens in useEffect React Hook Only)
  useEffect(() => {
    if (amount === isNaN) {
      return;
    } else {
      // We will be making the API Call here only. The "get" method wil return us the Real-Time Data.
      const getCurrencyconvertTor = async () => {
        const response = await axios.get(
          `https://api.exchangeratesapi.io/latest?base=${base}`
        );
        // Including a dynamic variable as we wil be changing the currencies.
        console.log("response==>", response);
        const date = response.data.date;
        const result = (response.data.rates[convertTo] * amount).toFixed(3);
        setState({
          ...initialState,
          result,
          date,
        });
      };
      getCurrencyconvertTor();
    }
  }, [amount, base, convertTo]);


  const onChangeInput = (e) => {
    setState({
      ...initialState,
      amount: e.target.value,
      result: null,
      // Whenever the User is selecting a value from the dropdown list/ menu, Result will be NULL in that cases.
      date: null,
    });
  };


  const handleSelect = (e) => {
    setState({
      ...initialState,
      [e.target.name]: e.target.value,
      result: null,
    });
  };


  const handleSwap = (e) => {
    // To prevent the loss of information on refreshing the page
    e.preventDefault();
    setState({
      ...initialState,
      convertTo: base,
      base: convertTo,
      result: null,
    });
  };



  return (
    // Bootstrap Styling Of The React-App Components

    <div className="container ml-5">
      <div className="row">
        {/* Inline Styling Of The React-App Components */}
        <div style={{ padding: "30px", background: "#ececec" }}>
          <Card
            title="CURRENCY CONVERTOR"
            bordered={false}
            style={{ width: 550 }}
          >
            <h5>
              {amount} {base} is equivalent to{" "}
            </h5>
            <h3>
              {amount === ""
                ? "0"
                : result === null
                ? "Calculating ..."
                : result}
              {convertTo}
            </h3>
            <p>As of {amount === "" ? "" : date === null ? "" : date}</p>
            <div className="row">
              <div className="col-lg-10">
                {/* mb = margin-bottom */}



                {/* Form for the 1st Input */}
                <form className="form-inline mb-4">
                  <input
                    type="number"
                    value={amount}
                    onChange={onChangeInput}
                    className="form-control form-control-lg mx-5"
                  />

                  {/* Dropdown Menu */}
                  <select
                    name="base"
                    value={base}
                    onChange={handleSelect}
                    className="form-control form-control-lg"
                  >
                    {/* Array of currencies, so using the Map Function */}
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </form>



                {/* Form for the 2nd Input */}
                <form className="form-inline mb-4">
                  <input
                    disabled={true}
                    value={
                      amount === ""
                        ? "0"
                        : result === null
                        ? "Calculating..."
                        : result
                    }
                    className="form-control form-control-lg mx-5"
                  />

                  {/* Dropdown Menu */}
                  <select
                    name="convertTo"
                    value={convertTo}
                    onChange={handleSelect}
                    className="form-control form-control-lg"
                  >
                    {/* Array of currencies, so using the Map Function */}
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </form>
              </div>



              {/* Arrow Sign for the switching of the Conversion */}
              <div className="col-lg-2 align-self-center">
                <h1 onClick={handleSwap} style={{ cursor: "pointer" }}>
                  {/* HTML ENTITIES : Codes of HTML for UP & DOWN ARROW SYMBOLS */}
                  &#8595;&#8593;
                </h1>
              </div>



            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Convertor;
