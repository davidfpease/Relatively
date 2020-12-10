
export function getDoDData() {
  const parser = new DOMParser();
  
  const dailyLink = fetch('https://www.defense.gov/Newsroom/Contracts/')
    .then(response => response.text())
    .then(data => {
      
      const indexDoc = parser.parseFromString(data, 'text/html');
      const links = indexDoc.querySelectorAll('a');
      for (var i = 0; i < links.length; i++) {
        if (links[i].textContent.includes("Contracts For")) {
          return fetch(links[i].href);
        }
      }
    })
    .then(response => response.text())
    .then(data => {
      const doc = parser.parseFromString(data, 'text/html');
      const paragraphs = doc.querySelectorAll('p');
      let paraText = [];
      for (let i = 0; i < paragraphs.length; i ++){
        paraText.push(paragraphs[i].innerText);
      }

      return getTotalFromText(paraText);
    });
    console.log(dailyLink)
    return dailyLink;
}

function getTotalFromText(textArray){
  let numbers = [];

  for (let i = 0; i < textArray.length; i++){
    //console.log(textArray[i]);
    let para = textArray[i];
    //debugger;
    let awardIndex = para.indexOf("awarded a $");
    if (awardIndex > -1){
      let subString = para.slice(awardIndex + 11, awardIndex + 31);
      subString = parseInt(subString.slice(0, subString.indexOf(" ")).replace(/,/g, ''));
      numbers.push(subString);
    }
  }
  return numbers.reduce((a,b)=> a + b );
}