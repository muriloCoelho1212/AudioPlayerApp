document.addEventListener('DOMContentLoaded', function () {
    const songlist = document.getElementById('songlist');
    songlist.innerHTML = '';
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    fetch('../content/data/audiodata.json')
        .then(response => response.json())
        .then(data => {
            data.map(entry => {
                if (entry.category.toLowerCase() === category.toLowerCase()) {
                    const div = document.createElement('div');
                    div.style.display = 'flex';
                    div.style.flexDirection = 'column';
                    div.style.alignItems = 'center';
                    div.style.marginBottom = '20px';
                    div.classList.add('songCard');

                    const songbtn = document.createElement('button');
                    const img = document.createElement('img');
                    songbtn.innerHTML = `${entry.title} || ${entry.duration}`;
                    songbtn.style.height = '200px';
                    img.src = entry.cover;
                    img.style.maxWidth = '100%';
                    img.style.height = '100px';
                    img.style.width = '100px';

                    songbtn.addEventListener('click', () => {
                        if (entry.url) {
                            window.location.href = entry.url; // url de merda
                        } else {
                            alert('URL não disponível para esta música!');
                        }
                    });

                    songbtn.addEventListener('contextmenu', (event) => {
                        event.preventDefault(); 
                        if (entry.faixa) {
                            const audio = new Audio(entry.faixa); // mamem o audio
                            audio.play(); 
                        } else {
                            alert('Áudio não disponível para esta música!');
                        }
                    });

                    div.appendChild(img);
                    div.appendChild(songbtn);
                    songlist.appendChild(div);
                }
            });
        })
        .catch(error => console.log(error));
});
