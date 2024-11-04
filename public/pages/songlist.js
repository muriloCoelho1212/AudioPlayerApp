document.addEventListener('DOMContentLoaded', function () {
    const songlist = document.getElementById('songlist');
    songlist.innerHTML = '';
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    fetch('../content/data/audiodata.json')
        .then(response => response.json())
        .then(data => {
            data.map(entry => {
                if (entry.category.toLowerCase() == category.toLowerCase()) {
                    const div = document.createElement('div');
                    div.style.display = 'flex';
                    div.style.flexDirection = 'column';
                    div.style.alignItems = 'center';
                    div.style.marginBottom = '20px';

                    const songbtn = document.createElement('button');
                    const img = document.createElement('img');
                    songbtn.innerHTML = `${entry.title} || ${entry.duration}`;
                    img.src = entry.cover;
                    img.style.maxWidth = '100%';
                    img.style.height = 'auto';
                    img.style.width = '200px';
                    img.style.maxHeight = '300px';


                    songlist.appendChild(div);
                    div.appendChild(songbtn);
                    div.appendChild(img);
                }
            })
        })
        .catch(error => console.log(error));

});