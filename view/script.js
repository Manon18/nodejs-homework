let container = document.getElementsByClassName('container')[0];

fetch('http://localhost:3000/fighters')
  .then(res => {
    return res.json();
  })
  .then(data => {
    data.forEach((item) => {
      let fighterContainer = document.createElement('div');
      fighterContainer.className = 'fighter-container';
      container.appendChild(fighterContainer);

      let closeBtn = document.createElement('img');
      closeBtn.className = 'close-btn';
      closeBtn.src = './images/close-button.svg';
      fighterContainer.appendChild(closeBtn);

      let fighter = document.createElement('div');
      fighter.className = 'fighter';
      fighter.innerHTML = `name: ${item.name} <br> health: ${item.health} <br> attack: ${item.attack} <br> defense: ${item.defense}`;
      fighterContainer.appendChild(fighter);

      let gifImg = document.createElement('img');
      gifImg.src = item.source;
      fighterContainer.appendChild(gifImg);

      closeBtn.addEventListener('click', function(event) {
      event.stopPropagation();
      window.location.reload();

      let deleteFighterData = {
        "_id": item._id,
        "name": item.name,
        "health": item.health,
        "attack": item.attack,
        "defense": item.defense,
        "source": item.source
      }

      let deleteData = JSON.stringify(deleteFighterData);

      let fighterId = item._id;
      let fighterDeleteUrl = 'http://localhost:3000/fighters/' + item._id;

        fetch(fighterDeleteUrl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: deleteData
        })
          .then(res => {
            return res;
          })
          .then(data => {
            console.log(data);
          })
      })

      fighterContainer.addEventListener('click', function() {
        window.location.href = "http://localhost:3000/individual_fighter/fighter.html" + "?id=" + item._id;
      })
    })
  })
  .catch(err => {
    console.log(err);
  })
