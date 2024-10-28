document.addEventListener('DOMContentLoaded', function(){
    const songlist = document.getElementById('songlist');
    songlist.innerHTML = '';
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    fetch('../content/data/audiodata.json')
    .then(response => response.json())
    .then(data => {
        data.map(entry => {
            if(entry.category.toLowerCase() == category.toLowerCase()){
                const songbtn = document.createElement('button');
                const img = document.createElement('img');
                songbtn.innerHTML = `${entry.title} || ${entry.duration}`;
                img.src = entry.cover;
                img.width = 200;
                songlist.appendChild(songbtn);
                songlist.appendChild(img);
            }
        })
    })
    .catch(error => console.log(error));

});