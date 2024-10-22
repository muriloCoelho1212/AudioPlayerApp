document.addEventListener('DOMContentLoaded', function(){
    const songlist = document.getElementById('songlist');
    songlist.innerHTML = '';
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    fetch('../data/audiodata.json')
    .then(response => response.json())
    .then(data => {
        data.map(entry => {
            if(entry.category.toLowerCase() == category.toLowerCase()){
                const songbtn = document.createElement('button');
                songbtn.style.width = '100%';
                songbtn.innerHTML = `${entry.title} || ${entry.duration}`;
                songlist.appendChild(songbtn);
            }
        })
    })
    .catch(error => console.log(error));

});