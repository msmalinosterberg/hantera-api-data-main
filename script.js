/* Det är i denna fil du ska jobba! Följ steg 1-7 för att få en
förklaring på den kod som redan skrivits. Läs de i sifferordning
för att det ska bli tydligt vad som sker. Om du vill hoppa direkt
till övningen - gå till steg 8. Och som alltid - ändra gärna
stylingen och lägg till fler fält i korten om du hittar något
intressant i datan! */

/* 1. Här deklarerar vi URL:en till API:et så vi vet vart vi ska
skicka förfrågan.*/
const URL = "https://api.spacexdata.com/v4/launches"

/* 2. Vi deklarer också dagens datum för att kunna
avgöra om uppskjutningen har varit eller inte.*/
const todaysDate = Math.round(new Date().getTime()/1000)

/* 6. Det här är vår huvudfunktion. Den plockar upp datan (json)
som vi skickade med när vi kallade på funktionen. Så 'launches'
innehåller hela responsen från API:et eftersom det är detsamma som
json (som vi skickade med). */
const displayLaunches = launches => {
  /* 7. Om du kikat i konsollen har du nog sett att datan vi får
  tillbaka är en array. För varje uppskjutning i arrayen skapar vi
  en ny div med data i sig.*/
  launches.forEach(launch => {
         
    /* 8. Vi hämtar elementet från HTML:en och ändrar dess HTML
    med hjälp av innerHTML. Vi har redan lagt till namn och datum
    för uppskjutningen - din uppgift är att lära känna datan och
    lägga till fler saker att visa i varje kort, t.ex. en bild av
    tygmärket (patch) för besätttningen, uppskjutningsdetaljer eller
    en länk för att läsa mer om uppskjutningen.  */

    /*Hint! Kika i konsollen där vi loggade datan för att se hur den
    är strukturerad. Tänk på det som en vanlig JavaScript-array med
    objekt i. */

    /*Hint 2! Du kan välja om du antingen vill skriva in datan direkt
    inuti <h2>${launch.name}</h2>, men om du t.ex. vill redigera värdet
    kan det kännas snyggare att först lägga det i en variabel som vi
    gjort nedan.*/

    const name = launch.name
    const date = launch.date_utc.slice(0,10)

    /*Hint 3! Här är en funktion med villkor i som visar olika saker 
    beroende på datum och värdet på launch.success. På ett liknande
    sätt skulle du t.ex. göra en funktion som visar olika saker
    beroende på om datan finns eller inte.*/
    const checkSuccess = () => {
      //Om dagens datum är mindre (tidigare) än launch date - returnera
      //"Not yet launched"
      if (todaysDate < launch.date_unix) {
        return "Not yet launched"
      }
      //Om launch.success är true - returnera "Launch successful"
      if (launch.success) {
        return "Launch successful"
      //Annars returnera "Launch failed"
      } else {
        return "Launch failed"
      }
    }

    document.querySelector(".all-launches").innerHTML += 
      `<div class="launch">
        <h2>${name}</h2>
        <p>${checkSuccess()}
        <p>${date}</p>
        <img src="" />
        <p class="details">Launch details</p>
        <a href="">Read more</a>
      </div>
      `
  })

} 
/* 3.  Det första som sker i vår fil är denna fetch-funktionen.
Fetch är en inbyggd JavaScript-funktion som skickar en förfrågan
till den URL vi skriver inom parentesen. När vi fått svar omvandlar
vi datan till JSON-format (JavaScript Object Notation) och därefter
specificerar vi vad vi vill göra med datan. */
fetch(URL)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    /* 4. Här loggar vi datan till konsollen för att se hur den är
    strukturerad. Öppna konsollen i browsern för att kika! */
    console.log(json)

    /* 5. Här kallar vi på vår displayLaunches-funktion och skickar
    med data/json som argument. */
    displayLaunches(json)
  })