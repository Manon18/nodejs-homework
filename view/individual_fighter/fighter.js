let container = document.getElementsByClassName('container')[0];   

let url = new URL(window.location);
let params = new URLSearchParams(url.search);
let find = params.get('id');
let fighter = '/fighters/' + find;

fetch(fighter)
  .then(res => {
    return res.json();
    console.log(res.json());
  })
  .then(data => {
    let fighterContainer = document.createElement('div');
    fighterContainer.className = 'fighter-container';
    container.appendChild(fighterContainer);

    let fighterGif = document.createElement('img');
    fighterGif.src = data.source;
    fighterContainer.appendChild(fighterGif);

    let infoFighter = document.createElement('div');
    infoFighter.className = 'info-fighter';
    infoFighter.innerHTML = `name: ${data.name} <br> health: ${data.health} <br> attack: ${data.attack} <br> defense: ${data.defense}`;
    fighterContainer.appendChild(infoFighter);
  })
