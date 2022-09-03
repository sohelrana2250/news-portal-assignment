
// load News catagory information

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



// display catagory of news 
const displayNews = (data) => {


    const navigationList = document.getElementById('navigation-list');

    data.forEach((x) => {



        const newList = document.createElement('li');
        newList.innerHTML = `
        <a onclick="handelNewID('${x.category_id ? x.category_id : 'News ID Not Found'}')" class="nav-link active" aria-current="page" href="#">${x.category_name}</a>
        
        `




        navigationList.appendChild(newList);




        //console.log(x);

    })







}
// identify the  news id number
const handelNewID = (id) => {

    toggleSpinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`

    fetch(url).then((res) => res.json()).then((data) => displayNewsMaterial(data.data)).catch((error) => console.log(error.message))


}
//display News Materials
const displayNewsMaterial = (newData) => {


    newData.sort((a, b) => b.total_view - a.total_view)


    const lengthField = document.getElementById('data-length');
    lengthField.innerText = `${newData.length} data found News List`
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerText = ''
    newData.forEach((v) => {


        //b6-news-portal-assignment

        const newContainer = document.createElement('div');
        newContainer.innerHTML = `
         
         <div class="row g-0 mb-3">
         <div class="col-md-4">
             <img src="${v.image_url ? v.image_url : 'Image Not Found'}" class="img-fluid rounded-start" alt="...">
         </div>
         <div class="col-md-8">
             <div class="card-body">
                 <h4 class="card-title">${v.title}</h4>
                 <p>${v.details.slice(0, 300).concat('...')}</p>


    <div class="row">

        <div class=" col-lg-3 col-sm-6 mt-5">
 
        
        <div class="d-flex">
        <img src="${v.author.img ? v.author.img : 'Author  Image data not Found'}" class="rounded-circle w-25 h-25" alt="...">
        
        <div class="m-3"> <p>${v.author.name ? v.author.name : 'Author Name Not Found'}</p>
        <p >${v.author.published_date ? v.author.published_date : ' Author Public list  Not Found'}</p></div>
        
        </div>
        
        
        
        </div>
     
        <div class=" col-lg-3 col-sm-6 mt-5 d-flex">
            
        <p class="m-2"><i class="fa-regular fa-eye fs-3 "></i></p>

        <h6 class="m-3">${v.total_view ? v.total_view : 'View Data Not Found'}</h6>


        </div>
        <div class=" col-lg-3 col-sm-6 mt-5">

         <div class="text-center">
         <i class="fa-solid fa-star-half-stroke fs-3 text-warning p-2"></i>
         <i class="fa-regular fa-star text-warning p-2 fs-3"></i>
         <i class="fa-regular fa-star text-warning p-2 fs-3"></i>
         <i class="fa-regular fa-star text-warning p-2 fs-3"></i>
         <i class="fa-regular fa-star text-warning p-2 fs-3"></i>
         </div>
    
    

        </div>
        <div class=" col-lg-3 col-sm-6 mt-5 text-center">
       
        <button data-bs-toggle="modal" data-bs-target="#exampleModal"  onclick="handelNewDetails('${v._id}')" type="button" class="btn btn-outline-danger"><i class="fa-solid fa-arrow-right"></i></button>
       
        </div>

             </div>
         </div>
         `
        //data-bs-toggle="modal" data-bs-target="#exampleModal"
        newsContainer.appendChild(newContainer)



    })

    toggleSpinner(false);


}
// handel new details 
const handelNewDetails = async (newDetailsId) => {

    try {
        const url = ` https://openapi.programming-hero.com/api/news/${newDetailsId}`
        const res = await fetch(url);
        const data = await res.json();

        displayMoreDetails(data.data)
    }
    catch (error) {
        console.log(error.message)
    }


}
const displayMoreDetails = (moreData) => {
    // console.log(moreData)
    const modalTatile = document.getElementById('exampleModalLabel');
    const newsDetails = document.getElementById('news-details');

    moreData.forEach((v) => {
        modalTatile.innerText = `${v.title ? v.title : "Title Data not Found"}`
        newsDetails.innerHTML = `
        <div class="card" style="width: 28rem;">
  <img src="${v.thumbnail_url ? v.thumbnail_url : 'Picture does not exist API'}" class="card-img-top" alt="...">
  <div class="card-body">
    <p> Budget :  ${v.rating.badge ? v.rating.badge : "Badge Information Not Found"}</p>
    <p>number : 
     ${v.rating.number ? v.rating.number : "Rating Not Found"}</p>
  </div>
</div>
        
        `

    })




}




const toggleSpinner = (isLoadding) => {

    const loadingSection = document.getElementById('loader-id');
    if (isLoadding) {
        loadingSection.classList.remove('d-none');
    }
    else {
        loadingSection.classList.add('d-none');
    }


}
loadNewsprotalApi()

