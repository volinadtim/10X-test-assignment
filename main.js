"use strict";
const PAGE_SIZE = 9;

const categoriesWrapperEl = document.getElementById("categories");
const coursesWrapperEl = document.getElementById("courses");
const searchInputEl = document.getElementById("search");
const loadMoreEl = document.getElementById("load-more");

const courses = [
    {
        photo: "1959b06e7f5d4163ea9599946af07d3d52f61d21.jpg",
        category: "Marketing",
        title: "The Ultimate Google Ads Training Course",
        price: "480",
        author: "Marvin McKinney",
    },
    {
        photo: "4dc0c01cdada93a61e7f51ac6388e22a998e52c3.jpg",
        category: "Management",
        title: "HR  Management and Analytics",
        price: "200",
        author: "Leslie Alexander Li",
    },
    {
        photo: "1adcaf7957590e8cdfee47506b5afbb5f1d3d251.jpg",
        category: "HR & Recruting",
        title: "Prduct Management Fundamentals",
        price: "100",
        author: "Jerome Bell",
    },
    {
        photo: "56e453da1f9df64680ce9ae8deb70c4fd6494a76.jpg",
        category: "Marketing",
        title: "Brand Management & PR Communications",
        price: "500",
        author: "Guy Hawkins",
    },
    {
        photo: "1c5469059ec3475582a6f6129b6ad3aed940c4d0.jpg",
        category: "Design",
        title: "Graphic Design Basic",
        price: "400",
        author: "Dianne Russell",
    },
    {
        photo: "c63086c15719088561c8ec14b31455901e6aced2.jpg",
        category: "Management",
        title: "Business Development Management",
        price: "530",
        author: "Kristin Watson",
    },
    {
        photo: "26b7504f2f3ca140714e87c67d19cee808f942e3.jpg",
        category: "Development",
        title: "Highload Software Architecture",
        price: "600",
        author: "Brooklyn Simmons",
    },
    {
        photo: "e6c7967bad5827ead11861fa456bdb395058c281.jpg",
        category: "HR & Recruting",
        title: "Human Resources – Selection and Recruitment",
        price: "150",
        author: "Kathryn Murphy",
    },
    {
        photo: "39a7972cf1e363e8eb007225e0b26ec15b87aa9b.jpg",
        category: "Design",
        title: "User Experience. Human-centered Design",
        price: "240",
        author: "Cody Fisher",
    },
    {
        photo: "26b7504f2f3ca140714e87c67d19cee808f942e3.jpg",
        category: "Development",
        title: "Advanced JavaScript Frameworks",
        price: "550",
        author: "Robert Johnson",
    },
    {
        photo: "4dc0c01cdada93a61e7f51ac6388e22a998e52c3.jpg",
        category: "Management",
        title: "Strategic Leadership and Decision Making",
        price: "350",
        author: "Sarah Chen",
    },
    {
        photo: "1959b06e7f5d4163ea9599946af07d3d52f61d21.jpg",
        category: "Marketing",
        title: "Social Media Marketing Mastery",
        price: "420",
        author: "Michael Torres",
    },
    {
        photo: "e6c7967bad5827ead11861fa456bdb395058c281.jpg",
        category: "HR & Recruting",
        title: "Employee Engagement Strategies",
        price: "180",
        author: "Jennifer Lee",
    },
    {
        photo: "1c5469059ec3475582a6f6129b6ad3aed940c4d0.jpg",
        category: "Design",
        title: "UI/UX Design Principles",
        price: "380",
        author: "Alex Rivera",
    },
    {
        photo: "56e453da1f9df64680ce9ae8deb70c4fd6494a76.jpg",
        category: "Marketing",
        title: "Content Marketing and SEO",
        price: "460",
        author: "Olivia Parker",
    },
    {
        photo: "39a7972cf1e363e8eb007225e0b26ec15b87aa9b.jpg",
        category: "Design",
        title: "Digital Product Design",
        price: "320",
        author: "David Kim",
    },
    {
        photo: "1adcaf7957590e8cdfee47506b5afbb5f1d3d251.jpg",
        category: "HR & Recruting",
        title: "Talent Acquisition Best Practices",
        price: "220",
        author: "Amanda Scott",
    },
];

const categoriesDict = courses.reduce(
    (res, course) => {
        if (res[course.category]) {
            res[course.category]++;
        } else {
            res[course.category] = 1;
        }
        return res;
    },
    {
        All: courses.length,
    }
);

const categories = Object.entries(categoriesDict).map(([key, value]) => {
    return {
        category: key,
        courses: value,
    };
});

let filteredCourses = [];
let displayCourses = [];

let selectedCategory = "All";
let searchQuery = "";

const selectCategory = (category) => {
    categoryElsDict[selectedCategory].classList.remove("category--active");
    selectedCategory = category;
    categoryElsDict[category].classList.add("category--active");
    filterCourses();
};

const onSearchChange = (event) => {
    searchQuery = event.target.value;
    filterCourses();
};

const filterCourses = () => {
    filteredCourses =
        selectedCategory === "All"
            ? courses.slice()
            : courses.filter((course) => course.category === selectedCategory);
    const loweredSearchQuery = searchQuery.trim().toLowerCase();
    filteredCourses = filteredCourses.filter(
        (course) =>
            course.title.toLowerCase().includes(loweredSearchQuery) ||
            course.category.toLowerCase().includes(loweredSearchQuery) ||
            course.author.toLowerCase().includes(loweredSearchQuery)
    );

    displayCourses = filteredCourses.slice(0, PAGE_SIZE);
    checkLoadMoreVisibility();

    renderCourses();
};

const getPhotoSrc = (src) => {
    return `assets/images//${src}`;
};

const getCategoryClass = (category) => {
    switch (category) {
        case "Marketing":
            return "success";
        case "Management":
            return "info";
        case "HR & Recruting":
            return "success";
        case "Design":
            return "pink";
        case "Development":
            return "deepblue";
    }
};

const renderCourses = () => {
    coursesWrapperEl.innerHTML = "";

    displayCourses.forEach((course) => {
        const wrapperEl = document.createElement("div");
        wrapperEl.className = "course";
        coursesWrapperEl.appendChild(wrapperEl);

        const imgEl = document.createElement("img");
        imgEl.className = "course__photo";
        imgEl.src = getPhotoSrc(course.photo);
        imgEl.alt = course.title;
        wrapperEl.appendChild(imgEl);

        const contentEl = document.createElement("div");
        contentEl.className = "course__content";
        wrapperEl.appendChild(contentEl);

        const categoryEl = document.createElement("div");
        categoryEl.className = `course__category course__category--${getCategoryClass(
            course.category
        )}`;
        categoryEl.innerText = course.category;
        contentEl.appendChild(categoryEl);

        const titleEl = document.createElement("p");
        titleEl.className = "course__title";
        titleEl.innerText = course.title;
        contentEl.appendChild(titleEl);

        const infoEl = document.createElement("div");
        infoEl.className = "course__info";
        contentEl.appendChild(infoEl);

        const priceEl = document.createElement("span");
        priceEl.className = "course__price";
        priceEl.innerText = `$${course.price}`;
        infoEl.appendChild(priceEl);

        const dividerEl = document.createElement("div");
        dividerEl.className = "course__divider";
        infoEl.appendChild(dividerEl);

        const authorEl = document.createElement("span");
        authorEl.className = "course__author";
        authorEl.innerText = `by ${course.author}`;
        infoEl.appendChild(authorEl);
    });
};

const loadMore = () => {
    displayCourses = filteredCourses.slice(0, displayCourses.length + PAGE_SIZE);
    renderCourses();
    checkLoadMoreVisibility();
};

const checkLoadMoreVisibility = () => {
    if (displayCourses.length >= filteredCourses.length) {
        loadMoreEl.classList.add("load-more--hidden");
    } else {
        loadMoreEl.classList.remove("load-more--hidden");
    }
};

const renderCategories = () => {
    categoriesWrapperEl.innerHTML = "";

    const categoryElsDict = {};
    const categoryEls = categories.map((category) => {
        const wrapper = document.createElement("div");
        wrapper.className = "category";
        categoriesWrapperEl.appendChild(wrapper);

        const titleEl = document.createElement("span");
        titleEl.className = "category__title";
        titleEl.innerText = category.category;
        wrapper.appendChild(titleEl);

        const coursesEl = document.createElement("span");
        coursesEl.className = "category__courses";
        coursesEl.innerText = category.courses;
        wrapper.appendChild(coursesEl);

        categoryElsDict[category.category] = wrapper;

        wrapper.addEventListener("click", () => {
            selectCategory(category.category);
        });
    });

    return categoryElsDict;
};

loadMoreEl.addEventListener("click", () => {
    loadMore();
});

const categoryElsDict = renderCategories();

selectCategory("All");

searchInputEl.addEventListener("input", onSearchChange);
