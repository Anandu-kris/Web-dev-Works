document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.search-box');
  const input = form.querySelector('input[type=search]');
  const resultsConatainer = document.querySelector('.results');
  const resultCounter = document.querySelector('header p');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const searchTerm = input.value;
    if(searchTerm) {
      searchWikipedia(searchTerm);
    }
  });

  function searchWikipedia(searchTerm) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=100&srsearch=${searchTerm}`;
    
    fetch(url).then(response => response.json()).then(data => {
      displayResults(data.query.search);
    }).catch(error => alert('Error: ' + error));
  }

  function displayResults(results){
    resultsConatainer.innerHTML = '';
    resultCounter.textContent = `Results Count : ${results.length}`;
    results.forEach(result =>{
      const resultElement = document.createElement('div');
      resultElement.className = 'result';
      resultElement.innerHTML = `
      <h3>${result.title}</h3>
      <p>${result.snippet}</p>
      <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank" rel="noopener">Read More</a>
      `;
      resultsConatainer.appendChild(resultElement);
    })
  }
})