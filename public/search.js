document.addEventListener('DOMContentLoaded', function () {
    const songlist = document.getElementById('songlist');
    songlist.innerHTML = '';
    const urlParams = new URLSearchParams(window.location.search);
    const searchBtn = document.getElementById('search');
    const query = urlParams.get('query');

    fetch('content/data/audiodata.json')
        .then(response => response.json())
        .then(data => {
            data.map(entry => {
                //console.log(`checking ${entry.title} for ${query}... ${entry.title.includes(query)}`);
                if (entry.title.toUpperCase().includes(query.toUpperCase())) {
                    const div = document.createElement('div');
                    div.style.display = 'flex';
                    div.style.flexDirection = 'column';
                    div.style.alignItems = 'center';
                    div.style.marginBottom = '20px';
                    div.style.overflow = 'hidden';
                    div.classList.add('songCard');

                    const songbtn = document.createElement('button');
                    const img = document.createElement('img');
                    songbtn.innerHTML = `${entry.title} || ${entry.duration}`;
                    //songbtn.style.position = 'absolute';
                    //songbtn.style.bottom = '10%';
                    songbtn.style.height = '200px';
                    img.src = entry.cover;
                    img.style.maxWidth = '100%';
                    img.style.height = '100px';
                    img.style.width = '100px';
                    img.style.maxHeight = '300px';


                    div.appendChild(img);
                    div.appendChild(songbtn);
                    songlist.appendChild(div);
                }
            })
        })
        .catch(error => console.log(error));

        searchBtn.addEventListener('click', function(){
            searchBtn.href = `/search.html?query=${document.getElementById('queryInput').value}`;
        });

});