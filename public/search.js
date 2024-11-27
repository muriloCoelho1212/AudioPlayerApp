document.addEventListener('DOMContentLoaded', function () {
    const songlist = document.getElementById('songlist');
    const searchBtn = document.getElementById('search');
    const queryInput = document.getElementById('queryInput');
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const ctgBox = document.getElementById('categories');
    const cover = document.getElementById('cover');
    const cardContextMenu = document.getElementById('contextMenu');

    // playback stuff
    const audioPlayer = document.getElementById('audioPlayer');
    const playbackMenu = document.getElementById('playbackMenu');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const skipBtn = document.getElementById('skipBtn');
    const progressBar = document.getElementById('progressBar');
    const currentTime = document.getElementById('currentTime');
    const duration = document.getElementById('duration');

    // Restaurar último termo pesquisado na barra de pesquisa
    queryInput.placeholder = query;

    fetch('content/data/audiodata.json')
        .then(response => response.json())
        .then(data => {
            if (data.length <= 0) {
                songlist.innerHTML = '<h2>No songs found.</h2>';
            } else {
                data.map(entry => {
                    if (!query || entry.title.toUpperCase().includes(query.toUpperCase()) || query.toUpperCase() == entry.category.toUpperCase()) {
                        const div = document.createElement('div');
                        div.style.display = 'flex';
                        div.style.flexDirection = 'column';
                        div.style.alignItems = 'center';
                        div.style.marginBottom = '20px';
                        div.style.overflow = 'hidden';
                        div.classList.add('songCard');

                        const songText = document.createElement('h5');
                        const img = document.createElement('img');
                        songText.innerHTML = `${entry.title} <br> ${entry.duration}`;
                        songText.style.textAlign = 'center';
                        img.src = entry.cover;
                        img.style.maxWidth = '100%';
                        img.style.height = '100px';
                        img.style.width = '100px';
                        img.style.maxHeight = '300px';

                        div.appendChild(img);
                        div.appendChild(songText);
                        div.addEventListener('click', () => {
                            audioPlayer.src = entry.faixa;
                            audioPlayer.play();
                            playbackMenu.style.display = 'block';
                            duration.textContent = entry.duration;
                            localStorage.setItem('songDuration', entry.duration);
                            localStorage.setItem('currentSong', audioPlayer.src);
                            localStorage.setItem('songCover', entry.cover);
                            localStorage.setItem('songTitle', entry.title);
                            localStorage.setItem('songDescription', entry.description);
                            localStorage.setItem('songAuthor', entry.author);

                            cover.src = entry.cover;
                        });
                        div.addEventListener('contextmenu', (e) => {
                            e.preventDefault();
                            cardContextMenu.style.display = 'block';
                            cardContextMenu.style.left = `${e.clientX}px`;
                            cardContextMenu.style.top = `${e.clientY}px`;
                            console.log(`cursor position: ${e.clientX},${e.clientY}`);
                        });
                        songlist.appendChild(div);

                        div.addEventListener('mousemove', (e) => {
                            const rect = div.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            const centerX = rect.width / 2;
                            const centerY = rect.height / 2;
                            const deltaX = x - centerX;
                            const deltaY = y - centerY;
                            const rotateX = (deltaY / centerY) * 30;
                            const rotateY = (deltaX / centerX) * -30;
                            div.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                        });

                        div.addEventListener('mouseleave', () => {
                            div.style.transform = 'rotateX(0) rotateY(0)';
                        });

                    }
                });
            }

            const categories = [];
            data.map((entry) => {
                if (!categories.includes(entry.category)) {
                    categories.push(entry.category);
                }
            });

            categories.forEach(category => {
                const ctg = document.createElement('li');
                ctg.innerHTML = `<a class="dropdown-item" href="/search.html?query=${category.toLowerCase()}"><h5>${category.toLowerCase()}</h5></a>`;
                ctg.style.width = '50%';
                ctgBox.appendChild(ctg);
            });
        })
        .catch(error => console.log(error));

    searchBtn.addEventListener('click', function () {
        const searchQuery = queryInput.value;
        localStorage.setItem('lastSearch', searchQuery); // Salvar último termo pesquisado
        searchBtn.href = `/search.html?query=${searchQuery}`;
    });

    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = 'Pause';
            localStorage.setItem('isPlaying', true);
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = 'Play';
            localStorage.setItem('isPlaying', false);
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
        localStorage.setItem('songStamp', audioPlayer.currentTime);
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

    cardContextMenu.addEventListener('mouseleave', () => {
        cardContextMenu.style.display = 'none';
    });

    const ctmenuChildren = cardContextMenu.childNodes;
    ctmenuChildren.forEach(e => {
        e.addEventListener('click', () => {
            cardContextMenu.style.display = 'none';
        })
    }); 

    const songSrc = localStorage.getItem('currentSong');
    const songTimestamp = localStorage.getItem('songStamp');

    if (songSrc) {
        audioPlayer.src = songSrc;
        if (songTimestamp) audioPlayer.currentTime = songTimestamp;
        if(localStorage.getItem('isPlaying') == true) audioPlayer.play();
        playbackMenu.style.display = 'block';
        duration.textContent = localStorage.getItem('songDuration');
        cover.src = localStorage.getItem('songCover');
    }
});
