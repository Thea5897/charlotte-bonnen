// const header = document.querySelector("#h2-skift");
const myHeaders = {
  "x-apikey": "613b480043cedb6d1f97ef66",
};

window.addEventListener("DOMContentLoaded", sidenVises);
let produkter;
let filter = "all";

function sidenVises() {
  console.log("sidenVises");
  // document.querySelector("#menuknap").addEventListener("click", toggleMenu);
  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((knap) =>
    knap.addEventListener("click", filterKategori)
  );
  loadJSON();
}

function filterKategori() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  visProdukt();

  // header.textContent = this.textContent;
}

async function loadJSON() {
  const JSONData = await fetch("produkter.json", {
    headers: myHeaders,
  });
  produkter = await JSONData.json();
  // console.log("frugter", frugter);
  visProdukt();
}

//funktion der viser personer i liste view
function visProdukt() {
  const dest = document.querySelector("#liste"); // container til articles med en person
  const skabelon = document.querySelector("template").content; // select indhold af html skabelon (article)
  dest.textContent = "";
  console.log(produkter);

  produkter.forEach((produkt) => {
    console.log(produkt._id);
    // loop igennem json (produkter)
    if (filter == produkt.type || filter == "all") {
      // console.log(produkt);
      const klon = skabelon.cloneNode(true);
      klon.querySelector(".navn").textContent = produkt.navn;
      klon.querySelector(".pris").textContent = produkt.pris;
      klon.querySelector(".produkt-billede").src =
        "produkter/" + produkt.billedenavn + ".webp";

      //Kalder anonym funktion indeni click, der fører siden over til single view
      klon.querySelector("article").addEventListener("click", () => {
        location.href = "detail_single_view.html?id=" + produkt.id;
      });

      //Hover effekt på produkterne sker ved mouseover/mouseout
      // klon.querySelector("article").addEventListener("mouseover", () => {
      //   visHover(produkt.billedenavn);
      // });
      // klon.querySelector("article").addEventListener("mouseout", () => {
      //   fjernHover(produkt.billedenavn);
      // });
      dest.appendChild(klon);
    }
  });
}

// function visHover(img) {
//   console.log(event.target);
//   event.target.src = "restdb_images/" + img + "-2.webp";
//   //event target betyder målet for den begivenhed JS laver
// }

// function fjernHover(img) {
//   console.log(event.target);
//   event.target.src = "restdb_images/" + img + ".webp";
// }

//billeder portraet skift
// var w = window.innerWidth;
// console.log(w);
// if (w > 800) {
//   if (location.href == "thea.html") {
//     // document.querySelector(".portraet img").src = "pics/thea_desk.png";
//   }
// }

// //menubar, burgermenu
// function toggleMenu() {
//   console.log("toggleMenu");
//   document.querySelector("#menu").classList.toggle("hidden");

//   let erSkjult = document.querySelector("#menu").classList.contains("hidden");

//   if (erSkjult == true) {
//     document.querySelector("#menuknap").textContent = "☰";
//   } else {
//     document.querySelector("#menuknap").textContent = "X";
//   }
// }
