document.addEventListener('DOMContentLoaded', function(){
    const ctgBox = document.getElementById('categories');
    console.log(`got ctg: ${ctgBox}`);

    fetch('content/data/audiodata.json')
    .then(response => response.json())
    .then(data => {
        const categories = []
        data.map((entry) =>{
            if(!categories.includes(entry.category)){
                categories.push(entry.category);
            }
        })

        console.log(`mapped data: ${categories}`);

        categories.forEach(category => {
            const ctg = document.createElement('button');
            ctg.innerHTML = `<h5>${category.toLowerCase()}</h5>`;
            ctg.style.width = '100px'
            ctgBox.appendChild(ctg);
        });
    })
    .catch(error => console.log(error))
});