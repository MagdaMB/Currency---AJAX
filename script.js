let actualRates = document.querySelector("#actualRates");
const showRate = document.querySelector("#showRate");
let actualDate = document.getElementById("date");
const changeBtn = document.getElementById("changeMoney");
let result = document.querySelector("#result");

showRate.addEventListener("click", () => {
  let currency = document.querySelector("#currency").value.toLowerCase();

  console.log(currency);
  $.ajax({
    url:
      "http://api.nbp.pl/api/exchangerates/rates/c/" +
      encodeURIComponent(currency),
    method: "GET",
    dataType: "json",
    success: function(response) {
      actualRates.innerHTML = `Wybrano: ${response.currency.toUpperCase()} - aktualny kurs to: ${
        response.rates[0].ask
      }`;
    },
    error: function(response) {
      actualRates.innerHTML = "Spróbuj ponownie";
      actualDate.innerHTML = "";
    },
    complete: function(response) {
      let date = new Date();
      const showDate = () => {
        switch (date.getDay()) {
          case 1:
            actualDate.innerHTML = `Dziś jest poniedziałek.`;
            break;
          case 2:
            actualDate.innerHTML = `Dziś jest wtorek.`;
            break;
          case 3:
            actualDate.innerHTML = `Dziś jest środa.`;
            break;
          case 4:
            actualDate.innerHTML = `Dziś jest czwartek.`;
            break;
          default:
            actualDate.innerHTML = `Dziś jest piątek.`;
        }
      };
      date.getDay() === 0 || date.getDay() === 6
        ? (actualDate.innerHTML = `Jest weekend - podajemy dane z piątku!`)
        : showDate();
    }
  });
});

changeBtn.addEventListener("click", () => {
  let ratesValue = [];
  let arr = [];
  let currencyGive = document
    .getElementById("currencyGive")
    .value.toLowerCase();
  let currencyChange = document
    .getElementById("currencyChange")
    .value.toLowerCase();
  let valueOfMoneyGive = document.querySelector("#valueOfMoneyGive").value;

  arr = [currencyGive, currencyChange];

  for (let i = 0; i < arr.length; i++) {
    $.ajax({
      url:
        "http://api.nbp.pl/api/exchangerates/rates/c/" +
        encodeURIComponent(arr[i]),
      method: "GET",
      dataType: "json",
      success: function(res) {
        let valueCurr = res.rates[0].ask;
        ratesValue.push(valueCurr);
      }
    }).done(function() {
      result.innerHTML = ratesValue.reduce(
        multiplication,
        parseInt(valueOfMoneyGive)
      );
      function multiplication(total, num) {
        return total * num;
      }
    });
  }
});
