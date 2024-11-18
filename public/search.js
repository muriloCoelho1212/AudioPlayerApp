document.addEventListener('DOMContentLoaded', function () {
    const songlist = document.getElementById('songlist');
    songlist.innerHTML = '';
    const urlParams = new URLSearchParams(window.location.search);
    const searchBtn = document.getElementById('search');
    const query = urlParams.get('query');
    const ctgBox = document.getElementById('categories');

    //playback stuff
    const audioPlayer = document.getElementById('audioPlayer');
    const playbackMenu = document.getElementById('playbackMenu');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const skipBtn = document.getElementById('skipBtn');
    const progressBar = document.getElementById('progressBar');
    const currentTime = document.getElementById('currentTime');
    const duration = document.getElementById('duration');

    fetch('content/data/audiodata.json')
        .then(response => response.json())
        .then(data => {
            if(data.length <= 0){
                songlist.innerHTML = '<h2>No songs found.</h2>';
            }
            else{
                data.map(entry => {
                    //console.log(`checking ${entry.title} for ${query}... ${entry.title.includes(query)}`);
                    if (entry.title.toUpperCase().includes(query.toUpperCase()) || query.toUpperCase() == entry.category.toUpperCase()) {
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
                        songbtn.addEventListener('click', () => {
                            audioPlayer.src = entry.faixa;
                            audioPlayer.play();
                            playbackMenu.style.display = 'block';
                            duration.textContent = entry.duration;
                        });
                        console.log(`playing audio: ${audioPlayer.src}`);
                        songlist.appendChild(div);

                    }
                })
            }
            

            const categories = []
            data.map((entry) => {
                if (!categories.includes(entry.category)) {
                    categories.push(entry.category);
                }
            })

            categories.forEach(category => {
                const ctg = document.createElement('button');
                ctg.innerHTML = `<h5>${category.toLowerCase()}</h5>`;
                ctg.style.width = '100px';
                ctg.style.borderRadius = '10%';
                ctg.classList.add('category-button', 'btn', 'btn-dark', 'category-button');
                ctg.onclick = () => {
                    window.location.href = `/search.html?query=${category.toLowerCase()}`;
                };
                ctgBox.appendChild(ctg);
            });
        })
        .catch(error => console.log(error));

        searchBtn.addEventListener('click', function(){
            searchBtn.href = `/search.html?query=${document.getElementById('queryInput').value}`;
        });

        playPauseBtn.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playPauseBtn.textContent = 'Pause';
            } else {
                audioPlayer.pause();
                playPauseBtn.textContent = 'Play';
            }
        });
    
        skipBtn.addEventListener('click', () => {
            audioPlayer.currentTime += 10; // Skip 10 seconds
        });
    
        audioPlayer.addEventListener('timeupdate', () => {
            const current = audioPlayer.currentTime;
            const total = audioPlayer.duration;
            progressBar.value = (current / total) * 100;
            currentTime.textContent = formatTime(current);
        });
    
        progressBar.addEventListener('input', () => {
            const total = audioPlayer.duration;
            audioPlayer.currentTime = (progressBar.value / 100) * total;
        });
    
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }

});