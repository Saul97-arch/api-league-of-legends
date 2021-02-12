const selectChamps = document.getElementById("selectChamp");
const champName = document.getElementById("champ-name");
const champDes = document.getElementById("champ-des");
const champImgDiv = document.getElementById("champ-imgs");
const greatImg = document.getElementById("great-img");
const habDivImg = document.querySelectorAll(".hab-div img");
const habDiv = document.querySelector(".hab-div");
const infoSpells = document.querySelector(".champ-spells");
const nameSpell = document.getElementById("nameSpell");
const infoSpell = document.getElementById("info");
const levelSelect = document.getElementById("level");



fetch("https://ddragon.leagueoflegends.com/cdn/11.3.1/data/en_US/champion.json")
  .then((res) => res.json())
  .then((champs) => {


    const champsNames = [];

    // Itero sobre as chaves e coloco num array
    for (let name in champs.data) {
      champsNames.push(name);
    }

    champsNames.map((name) => {
      const opt = document.createElement("option");
      opt.text = name;
      selectChamps.add(opt);
    });
    
  })
// usar um addEventListener pelo select e puxar as infos do herois pelo mesmo.

selectChamps.addEventListener("change", (e) => {
  const champNameOpt = e.target.value;
  levelSelect.value = 1;
  // Essa rotina evita que as imagens continuem sendo adicionadas quando selecionar outro nome do campeão

  while (champImgDiv.firstChild) {
    champImgDiv.removeChild(champImgDiv.lastChild);
  }
  greatImg.setAttribute(
    "src",
    `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champNameOpt}_${0}.jpg`
  );
  fetch(
    `https://ddragon.leagueoflegends.com/cdn/11.3.1/data/en_US/champion/${champNameOpt}.json`
  )
    .then((res) => res.json())
    .then((info) => {
      const dataChamp = info.data[champNameOpt];
      champName.innerText = champNameOpt;
      champDes.innerText = dataChamp.title;

      const skinsNum = dataChamp.skins.map((skin) => {
        return skin.num;
      });
      console.log(dataChamp);
      console.log(skinsNum);

      // Renderizar habilidades
      // Render passiva
      habDivImg[0].setAttribute(
        "src",
        `https://ddragon.leagueoflegends.com/cdn/11.3.1/img/passive/${dataChamp.passive.image.full}`
      );
      habDivImg[0].setAttribute("id", "passive");
      // Render spells
      const spells = info.data[champNameOpt].spells;
      console.log(spells);
      habDivImg[1].setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/11.3.1/img/spell/${spells[0].image.full}`);
      habDivImg[1].setAttribute("id", 0);
      habDivImg[2].setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/11.3.1/img/spell/${spells[1].image.full}`);
      habDivImg[2].setAttribute("id", 1);
      habDivImg[3].setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/11.3.1/img/spell/${spells[2].image.full}`);
      habDivImg[3].setAttribute("id", 2);
      habDivImg[4].setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/11.3.1/img/spell/${spells[3].image.full}`);
      habDivImg[4].setAttribute("id", 3);
      skinsNum.map((num) => {
        const champSkin = document.createElement("img");
        champSkin.setAttribute(
          "src",
          `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champNameOpt}_${num}.jpg`
        );
        champSkin.setAttribute("id", num);
        champImgDiv.appendChild(champSkin);
      });
      // Render infoSpells
      habDiv.addEventListener("click", (e) => {
        const id = e.target.id;
        if (id === "passive") {
          nameSpell.innerHTML = dataChamp.passive.name;
          infoSpell.innerHTML = dataChamp.passive.description;
        }
        if (isNaN(id)) return;
        nameSpell.innerText = spells[id].name;
        infoSpell.innerText = spells[id].description;
        console.log(id);
      });

      // Renderizar atributos por nível
      document.getElementById("hp").innerHTML = "HP: " + dataChamp.stats.hp;
      document.getElementById("hplvl").innerHTML = "HP per level: " + dataChamp.stats.hpperlevel;
      document.getElementById("hregen").innerHTML = "HP regen : " + dataChamp.stats.hpregenperlevel;
      document.getElementById("mp").innerHTML ="MP: " + dataChamp.stats.mp;
      document.getElementById("mplvl").innerHTML ="MP per level: " + dataChamp.stats.mpperlevel;
      document.getElementById("mregen").innerHTML ="MP regen: " + dataChamp.stats.mpperlevel;
      document.getElementById("ms").innerHTML = "Movespeed: " + dataChamp.stats.movespeed;
      document.getElementById("atacsped").innerHTML = "Atack Speed: " + dataChamp.stats.attackspeed;
      document.getElementById("atspdlvl").innerHTML = "Atack Speed per level: " + dataChamp.stats.attackspeedperlevel;
      document.getElementById("mr").innerHTML = "Magic Resistance: " + dataChamp.stats.spellblock;
      document.getElementById("mrlvl").innerHTML = "Magic Resistance per level: " + dataChamp.stats.spellblockperlevel;
      document.getElementById("damage").innerHTML = "Atack:" + dataChamp.stats.attackdamage;
      document.getElementById("mrlvl").innerHTML = "Atack per level: " + dataChamp.stats.spellblockperlevel;
      document.getElementById("dist").innerHTML = "Distance :" + dataChamp.stats.attackrange;

      levelSelect.addEventListener("change", (e) => {
        const val = e.target.value;

        document.getElementById("hp").innerHTML = "HP: " + Number(dataChamp.stats.hp + (dataChamp.stats.hpperlevel * val));
        document.getElementById("mp").innerHTML ="MP: " + Number(dataChamp.stats.mp + (dataChamp.stats.mpperlevel * val));
        document.getElementById("damage").innerHTML = "Atack:" + Number(dataChamp.stats.attackdamage + (dataChamp.stats.attackspeedperlevel * val));
        document.getElementById("atacsped").innerHTML = "Atack Speed: " + Number(dataChamp.stats.attackspeed + (dataChamp.stats.attackspeedperlevel * val));
        document.getElementById("mr").innerHTML = "Magic Resistance: " + Number(dataChamp.stats.spellblock + (dataChamp.stats.spellblockperlevel * val));

        document.getElementById("hregen").innerHTML = "HP regen : " + (dataChamp.stats.hpregenperlevel * val).toFixed(2);
        document.getElementById("atspdlvl").innerHTML = "Atack Speed per level: " + (dataChamp.stats.attackspeedperlevel * val).toFixed(2);
        document.getElementById("mregen").innerHTML ="MP regen: " + (dataChamp.stats.mpperlevel * val).toFixed(2);
        document.getElementById("mrlvl").innerHTML = "Magic Resistance per level: " + (dataChamp.stats.spellblockperlevel * val).toFixed(2);
        document.getElementById("mrlvl").innerHTML = "Atack per level: " + (dataChamp.stats.spellblockperlevel *val).toFixed(2);
        console.log(dataChamp.stats);
      });
    });

  champImgDiv.addEventListener("click", (e) => {
    const id = e.target.id;
    greatImg.setAttribute(
      "src",
      `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champNameOpt}_${id}.jpg`
    );
  });
});

