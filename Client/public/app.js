const button = document.getElementById("search-button");
const input = document.getElementById("input");
// const input = document.getElementById("city-input");
const options = document.querySelector(".options");

const getData = async (cityName) => {
  const promise = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=5787db3dc5654bfdb67175726240903&q=${cityName}&aqi=yes`
  );
  return await promise.json();
};

const fetchData = async () => {
  const value = input.value;
  const data = await getData(value);

  document.querySelector('.countryName').innerHTML = `
    <h2>${data.location.name +", "+ data.location.region +", "+ data.location.country}</h2>
    <h3>${data.location.localtime}</h3>
    <h4>Temperature in celsius = ${data.current.temp_c}</h4>
    <h4>Temperature in fahrenheit = ${data.current.temp_f}</h4>
  `
}

input.addEventListener("keypress", (evt)=>{
  if(evt.key === "Enter"){
    event.preventDefault();
    button.click();
  }
  
});
button.addEventListener("click", fetchData);

input.addEventListener("click", async ()=>{
  const data = await fetch("./countries.json");
  const countryData = await data.json();

  for(let countryName of countryData.country){
    const ele = countryName.name;
    let newOption = document.createElement("option");
    newOption.innerText = ele;
    newOption.value = ele;
    options.append(newOption);  
  }
})
