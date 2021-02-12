const summon = document.getElementById("summon");
const description = document.getElementById("description");

fetch("https://ddragon.leagueoflegends.com/cdn/11.3.1/data/en_US/summoner.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const spellsNames = [];
    for (let spellName in data.data) {
      spellsNames.push(spellName);
    }

    console.log(spellsNames);

    // Render imgs
    spellsNames.map((nome) => {
      const img = document.createElement("img");
      img.setAttribute(
        "src",
        `https://ddragon.leagueoflegends.com/cdn/11.3.1/img/spell/${data.data[nome].image.full}`
      );
      img.setAttribute("id", nome);
      summon.appendChild(img);
    });

    summon.addEventListener("click", (e) => {
      const id = e.target.id;
      description.innerHTML = data.data[id].description;
    });
  });
