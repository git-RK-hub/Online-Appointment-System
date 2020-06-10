/* eslint-disable */

//*********SLIDER */
let myIndex = 0;
export const carousel = function () {
  let i;
  const x = document.getElementsByClassName('display-box_content');
  for (i = 0; i < x.length; i += 1) {
    x[i].style.display = 'none';
  }
  myIndex += 1;
  if (myIndex > x.length) {
    myIndex = 1;
  }
  x[myIndex - 1].style.display = 'block';
  setTimeout(carousel, 3000);
};

//********CATEGORY SEARCH */
export const filterList = (searchTerm, optionList) => {
  searchTerm = searchTerm.toLowerCase();
  optionList.forEach((option) => {
    const label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
    if (label.indexOf(searchTerm) !== -1) {
      option.style.display = 'block';
    } else {
      option.style.display = 'none';
    }
  });
};
