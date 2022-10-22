// SELECTORS
const select = document.querySelector(".option");
const selectElement = document.querySelector("#one");
const course_title = document.getElementById("course_title");
const course_date = document.getElementById("course_date");

// SELECTORS

// API CALL
fetch("https://private-e05942-courses22.apiary-mock.com/courses")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.forEach((course) => render(course));
  });

function render(course) {
  const opt = document.createElement("option");
  opt.value = course.slug;
  opt.text = course.title;
  select.appendChild(opt);
}

// SELECTION DROPDOWN
selectElement.addEventListener("change", (event) => {
  var url =
    "https://private-e05942-courses22.apiary-mock.com/courses/" +
    event.target.value;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // INORDER TO CHANGE TITLE AND DATE
      course_title.innerText = data.description;
      course_date.innerHTML = "";
      data.start_dates.forEach((ele) => {
        const p = document.createElement("p");
        p.innerText = ele;
        course_date.appendChild(p);
      });
    });
});
