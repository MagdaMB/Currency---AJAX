let valueOfMoney = document.querySelector("#moneyValue").value;
let actualRates = document.querySelector("#actualRates");
const showRates = document.querySelector("#showRates");
let actualDate = document.getElementById("date");

showRates.addEventListener("click", () => {
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
        switch(date.getDay()) {
          case 1:
          actualDate.innerHTML = `Dziś jest poniedziałek.`
          break;
          case 2:
          actualDate.innerHTML = `Dziś jest wtorek.`
          break;
          case 3:
          actualDate.innerHTML = `Dziś jest środa.`
          break;
          case 4:
          actualDate.innerHTML = `Dziś jest czwartek.`
          break;
          default:
          actualDate.innerHTML = `Dziś jest piątek.`
        }
      };
      (date.getDay() === 0 || date.getDay() === 6)
        ? actualDate.innerHTML = `Jest weekend - podajemy dane z piątku!`
        : showDate();
    }
  });
});
