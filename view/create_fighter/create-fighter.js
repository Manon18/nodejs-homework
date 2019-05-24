let saveFighter = document.getElementsByClassName('save-fighter-btn')[0];

saveFighter.addEventListener('click', function(event) {
  event.stopPropagation();

  let fighterName = document.getElementById('fighter-name');
  let fighterHealth = document.getElementById('fighter-health');
  let fighterAttack = document.getElementById('fighter-attack');
  let fighterDefense = document.getElementById('fighter-defense');
  let fighterSource = document.getElementById('fighter-source');

  function generateRandomId() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
  }

  let generateId = generateRandomId();

  let answersUser = {
    "_id": generateId,
    "name": fighterName.value,
    "health": fighterHealth.value,
    "attack": fighterAttack.value,
    "defense": fighterDefense.value,
    "source": fighterSource.value
  }

  let fightersData = JSON.stringify(answersUser);

  fetch('http://localhost:3000/fighters',
  { 
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: fightersData
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(JSON.stringify(data));
    })
});
