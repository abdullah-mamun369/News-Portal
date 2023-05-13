// Calling-of-categoty-section

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => showCategories(data.data.news_category))
    .catch((error) => console.log(error));
};

const showCategories = (categories) => {
  const categoryConatiner = document.getElementById("category-list");
  categories.forEach((category) => {
    const creatCategoryLi = document.createElement("li");
    creatCategoryLi.innerHTML = `
        <button id="${category.category_id}" class="btn btn-outline-primary px-3 py-1" onclick="newsFetch('${category.category_id}')">${category.category_name}</button>
        `;
    categoryConatiner.appendChild(creatCategoryLi);
  });
};

loadCategories();

// Calling-of-news-section
const newsFetch = (categoryId) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => newsFeed(data.data))
    .catch((error) => console.log(error));
};

const newsFeed = (newsAll) => {
  const newsFeedContainer = document.getElementById("news-feed");
  newsFeedContainer.textContent = "";
  newsAll.forEach((news) => {
    const newsFeedDiv = document.createElement("div");
    newsFeedDiv.classList.add(
      "row",
      "g-0",
      "my-4",
      "p-3",
      "border",
      "rounded-3"
    );
    newsFeedDiv.innerHTML = `
        <div class="col-sm-12 col-lg-3">
            <img src="${news.thumbnail_url}" class="img-fluid rounded" alt="">
        </div>
        <div class="col-sm-12 col-lg-9 p-4">
            <div>
                <h5 class="fw-bold fs-5">${news.title}</h5>
                <p class="fs-6 my-3"><small>${news.details.slice(
                  0,
                  350
                )}</small></p>

                <div class="d-flex justify-content-between mt-5">
                    <div class="d-flex">
                        <div>
                            <img class="news-img  img-fluid " src="${
                              news.author.img
                            }"></img>
                        </div>
                        <div class="ms-2">
                            <p class="fw-semibold m-0">${news.author.name}</p>
                            <p><small class="text-muted m-0">${news.details.slice(
                              0,
                              26
                            )}</small></p>
                        </div>
                    </div>
                    
                    <div>
                        <i class="fa-solid fa-eye  text-muted"></i><span class="ms-2 fw-semibold"><small>${
                          news.total_view
                        }</small></span>
                    </div>

                    <div>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                    </div>
                    
                    <div>
                        <button type="button" class="btn btn-primary px-4 py-1 text-white fw-semibold" data-bs-toggle="modal" data-bs-target="#newsDetailsModal"  onclick="detailedNewsFetch('${
                          news._id
                        }')">Details</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    newsFeedContainer.appendChild(newsFeedDiv);
  });
};

newsFetch();
