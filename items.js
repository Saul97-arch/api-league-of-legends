const items = document.querySelector(".items");
const about = document.querySelector(".about");
const name = document.getElementById("name");
const description = document.getElementById("description");
const upgrades = document.getElementById("upgrades");

fetch("https://ddragon.leagueoflegends.com/cdn/11.3.1/data/en_US/item.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data.data);

    const idsName = [];

    for (let id in data.data) {
      idsName.push(id);
    }

    console.log(idsName);

    // render imgs
    idsName.map((id) => {
      const imgItem = document.createElement("img");
      imgItem.setAttribute(
        "src",
        `https://ddragon.leagueoflegends.com/cdn/11.3.1/img/item/${id}.png`
      );
      imgItem.setAttribute("id", id);
      items.appendChild(imgItem);
    });

    items.addEventListener("click", (e) => {
      if (isNaN(e.target.id)) return;
      const itemId = e.target.id;
      console.log(data.data[itemId]);
      name.innerHTML = data.data[itemId].name;
      description.innerHTML = data.data[itemId].description;

      if (!data.data[itemId].hasOwnProperty("into")) {
        while (upgrades.firstChild) {
          upgrades.removeChild(upgrades.lastChild);
        }
      }

      if (data.data[itemId].hasOwnProperty("into")) {
        upgrades.innerHTML = `<p>Upgrades into:</p><br>`;
        data.data[itemId].into.map((id) => {
          const upgradeItem = document.createElement("img");
          upgradeItem.setAttribute(
            "src",
            `https://ddragon.leagueoflegends.com/cdn/11.3.1/img/item/${id}.png`
          );
          upgrades.appendChild(upgradeItem);
        });
      }
    });
  });
