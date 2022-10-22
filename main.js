// SELECTORS
const select = document.querySelector(".option");
const selectElement = document.querySelector("#one");
const courseTitle = document.getElementById("course_title");
const courseDate = document.getElementById("course_date");
const coursePrice = document.getElementById("course_price");
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
      courseTitle.innerText = data.description;
      courseDate.innerHTML = "";
      data.start_dates.forEach((ele) => {
        const p = document.createElement("p");
        p.innerText = ele;
        coursePrice.appendChild(p);
      });

      // TO GET A CURRENT LOCATION
      var request = new XMLHttpRequest();
      request.open(
        "GET",
        "https://api.ipdata.co/?api-key=73d32d75455fcc03625b5b88f71807c5bafca190fde0d2cc262d2b7f"
      );

      request.setRequestHeader("Accept", "application/json");

      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          // INORDER TO CHANGE PRICE
          course_price.innerHTML = "";
          const p = document.createElement("p");

          // TO SET IT AS PER THE REGION
          p.innerText =
            (JSON.parse(this.responseText).continent_name === "Europe" &&
              data.prices[1].amount + " " + data.prices[1].currency) ||
            data.prices[0].amount + " " + data.prices[0].currency;

          course_price.appendChild(p);
        }
      };
      request.send();
    });
});
