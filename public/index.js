document.addEventListener('DOMContentLoaded', function () {
    const ctgBox = document.getElementById('categories');
    const searchBtn = document.getElementById('search');
    console.log(`got ctg: ${ctgBox}`);

    fetch('content/data/audiodata.json')
        .then(response => response.json())
        .then(data => {
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
                    window.location.href = `/pages/songlist.html?category=${category.toLowerCase()}`;
                };
                ctgBox.appendChild(ctg);
            });

        })
        .catch(error => console.log(error))

    searchBtn.addEventListener('click', function(){
        searchBtn.href = `/search.html?query=${document.getElementById('queryInput').value}`;
    });

});