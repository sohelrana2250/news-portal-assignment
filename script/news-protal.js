

const loadNewsprotalApi = async () => {
    try {

        const url = `https://openapi.programming-hero.com/api/news/categories`
        const res = await fetch(url);
        const data = await res.json();

        displayNews(data.data.news_category)
    }
    catch (error) {
        console.log(error.message)
    }
}

const displayNews = (data) => {

    const navigationList = document.getElementById('navigation-list');

    data.forEach((x) => {

        const newList = document.createElement('li');
        newList.innerHTML = `
        
        <a onclick="handelNewID('${x.category_id}')" class="nav-link active" aria-current="page" href="#">${x.category_name}</a>
        
        `

        navigationList.appendChild(newList);


        console.log(x);

    })


}

const handelNewID = (id) => {




}
loadNewsprotalApi()