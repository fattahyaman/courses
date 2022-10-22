// SELECTORS
const select = document.querySelector(".option");

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
