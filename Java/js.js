var LinkName = document.getElementById("Name");
var LinkUrl = document.getElementById("URL");
var submit = document.getElementById("submit");
var tablecontent = document.getElementById("tableContent");
var box = document.querySelector(".box-info");
var close = document.getElementById("closeBtn")
var list = [];
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex =
  /^(https?:\/\/)?(www\.)?[\w-]+(\.[a-z]{2,})+(:\d{2,5})?(\/[\w-]*)*\/?$/i;

if (localStorage.getItem("Links")) {
  list = JSON.parse(localStorage.getItem("Links"));
  display(list);
}

function getlinks() {
  var siteName = LinkName.value.trim();
  var siteURL = LinkUrl.value.trim();

  if (nameRegex.test(siteName) && urlRegex.test(siteURL)) {
    box.classList.add("d-none");

    var links = {
      Name: siteName,
      Link: siteURL,
    };

    list.push(links);
    localStorage.setItem("Links", JSON.stringify(list));

    clear();
    display(list);
  } else {
    box.classList.remove("d-none");
  }
}

function clear() {
  LinkName.value = "";
  LinkUrl.value = "";
}

function display(arr) {
  var cartona = ``;
  for (var i = 0; i < arr.length; i++) {
    cartona += `
      <tr>
        <td>${i + 1}</td>
        <td>${arr[i].Name}</td>
        <td>
          <a href="${arr[i].Link}" target="_blank" class="btn visit">
            <i class="fa-solid fa-eye pe-2"></i>Visit
          </a>
        </td>
        <td>
          <button class="btn delete pe-2" index="${i}">
            <i class="fa-solid fa-trash-can"></i> Delete
          </button>
        </td>
      </tr>
    `;
  }
  tablecontent.innerHTML = cartona;
}

tablecontent.addEventListener("click", function (e) {
  if (e.target.closest(".delete")) {
    var index = e.target.closest(".delete").getAttribute("index");
    deleteLink(index);
  }
});
function deleteLink(i) {
  list.splice(i, 1);
  localStorage.setItem("Links", JSON.stringify(list));
  display(list);
}


submit.addEventListener("click", function (e) {
  e.preventDefault();
  getlinks();
});


close.addEventListener("click",function(e){
  box.classList.add("d-none");
})
document.addEventListener("keydown",function(e){
  if(e.key=="Escape"){
    box.classList.add("d-none");
  }
})
document.addEventListener("click",function(e){
  if(e.target.classList.contains("box-info")){
    box.classList.add("d-none");
  }
})