/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

function App() {
  const [currency1, setCurrency1] = useState("THB");
  const [currency2, setCurrency2] = useState("USD");
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [rates, setRates] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/e3d89cd867869c1eb5e3a100/latest/${currency1}`
        );
        const data = await res.json();
        const newRate = data.conversion_rates[currency2];
        const rateText= `1 ${currency1} = ${newRate} ${currency2}`

        setAmount2((amount1 * newRate).toFixed(2));
        setRates(rateText);
      } catch (err) {
        console.log("Failed to fetch: ", err);
      }
    };

    fetchData();

    console.log(currency1);
  }, [currency1, currency2, amount1]);

  const handleSwapCurrency = () => {
    setCurrency1(currency2);
    setCurrency2(currency1);
  };

  const handleReset = () => {
    setAmount1(1);
  };

  const currencies = [
    "AED",
    "ARS",
    "AUD",
    "BGN",
    "BRL",
    "BSD",
    "CAD",
    "CHF",
    "CLP",
    "CNY",
    "COP",
    "CZK",
    "DKK",
    "DOP",
    "EGP",
    "EUR",
    "FJD",
    "GBP",
    "GTQ",
    "HKD",
    "HRK",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "ISK",
    "JPY",
    "KRW",
    "KZT",
    "MXN",
    "MYR",
    "NOK",
    "NZD",
    "PAB",
    "PEN",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "RON",
    "RUB",
    "SAR",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "TWD",
    "UAH",
    "USD",
    "UYU",
    "VND",
    "ZAR",
  ];

  return (
    <div className="bg-[#333] w-screen min-h-screen flex items-center text-xl">
      <div className=" container mx-auto my-auto bg-white w-100 rounded-2xl shadow-2xl overflow-hidden text-center">
        <h1 className=" bg-gray-200 flex justify-center items-center h-10">
          Exchange Money
        </h1>{" "}
        <img src="/money.png" alt="" className="w-50 mx-auto my-5" />
        <div className="my-2">
          <select
            className="appearance-none p-2 transition-all ease-in-out rounded bg-gray-200 cursor-pointer mr-2 hover:bg-gray-300"
            value={currency1}
            onChange={(e) => setCurrency1(e.target.value)}
          >
            {currencies.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="text-right p-2 text-xl outline-none border-1 border-gray-400"
            value={amount1}
            onChange={(e) => setAmount1(e.target.value)}
          />
        </div>

        {/* Rate Text */}
        <div className="flex justify-end pr-10">
          <div className="text-md inline-block pr-2">{rates}</div>
        </div>

        <div className="my-4">
          <select
            className="appearance-none p-2 transition-all ease-in-out rounded bg-gray-200 cursor-pointer mr-2 hover:bg-gray-300"
            onChange={(e) => setCurrency2(e.target.value)}
            value={currency2}
          >
            {currencies.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <input
            type="text"
            disabled
            className="text-right p-2 bg-gray-200 text-xl outline-none border-1 border-gray-400"
            value={amount2}
            onChange={(e) => setAmount2(e.target.value)}
          />
        </div>
        {/* button section */}
        <div className="grid grid-cols-2 gap-2 mx-2 mb-2 ">
          <button
            className="rounded-bl-xl cursor-pointer transition-all ease-in-out hover:bg-green-600 bg-green-500 text-white roudned p-2"
            onClick={handleSwapCurrency}
          >
            Swap
          </button>
          <button 
            className="rounded-br-xl cursor-pointer transition-all ease-in-out hover:bg-red-600 bg-red-500 text-white roudned p-2"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
