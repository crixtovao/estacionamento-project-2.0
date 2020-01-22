const btn = document.querySelector ('#enviar');

function renderGarage () {
 const garage = localStorage.garage ? JSON.parse (localStorage.garage) : [];
 document.getElementById('garage').innerHTML = '';
 garage.forEach(c => addCarToGarage(c))
 
}

function convertPeriod (mil) {
  const min = Math.floor (mil / 60000);
  const sec = Math.floor ((mil % 60000) / 1000);

  return `${min}m e ${sec}s`;
}

function addCarToGarage (car) {
  const row = document.createElement("tr");
  row.innerHTML= `
    <td>${car.veiculo.value}</td>
    <td>${car.placa.value}</td>
    <td data-time="${car.time}">${new Date(car.time)
      .toLocaleString('pt-BR', {
      hour: "numeric", minute: "numeric"
    })}</td>
    <td>
        <button class="delete"> X </button>
    </td>
  `;
  document.getElementById('garage').appendChild(row);
};

function checkOut(info) {
  let period = new Date() - new Date (info [2].dataset.time);
  period = convertPeriod(period);
  
  const placa = info[1].textContent;
  const msg = `o veiculo ${info[0].textContent} de placa ${placa} permaneceu estacionado por ${period}
  deseja encerrar?`;
  
  if (!confirm(msg)) return;

  const garage = getGarage().filter (c => c.placa !== placa);
  localStorage.garage = JSON.stringify(garage);

}

const getGarage = () =>  {return localStorage.garage ? JSON.parse (localStorage.garage) : []}



btn.addEventListener ('click', function (){
  const x = document.getElementById ('veiculo').value
  const z = document.getElementById ('placa').value;
 
  if (!veiculo || !placa) {
    alert ('Os campos sao essenciais');
    return;
  }

  const car = {veiculo, placa, time: new Date()}
  const garage = getGarage();
      garage.push (car);
      
      localStorage.garage = JSON.stringify(garage);


    addCarToGarage(car);

    document.getElementById ('veiculo').value = "";
    document.getElementById ('placa').value = "";

    document.getElementById('garage').addEventListener ("click", e => {
          if(e.target.className == "delete");
          checkOut(e.target.parentElement.parentElement.cells);

    })
  });
