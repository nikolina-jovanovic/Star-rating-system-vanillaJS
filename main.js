const btn = document.querySelector("button");
const post = document.querySelector(".post");
const widget = document.querySelector(".widget");
const labels = document.querySelectorAll("label");
const othersRatings = document.querySelector(".othersRatings");
const ratingsAndComments = document.querySelector(".ratingsAndComments");
const comment = document.getElementById("comment");
const homeBtn = document.getElementById("home");


let ratings = [];
let avRatings = [];

var goHomeTimer;

btn.onclick = () => {
  widget.style.display = "none";
  post.style.display = "block";
  
  //After rating and leaving a comment, after not choosing to see others' ratings section, it goes back at the home page after 10 seconds. Remembering rating and a comment.

  goHomeTimer = setTimeout(() =>{
    goHome();
  },10000)

  //Saving comment to local storage

  localStorage.setItem('comment:' , comment.value);

  //Getting comment and rating from local storage:

  const commentLoc = localStorage.getItem('comment:');
  const ratingLoc = localStorage.getItem('stars')
  

  avRatings.push(parseInt(ratingLoc));

  //Showing rating and comment in others' ratings section:

  const newDiv = document.createElement('div');
  const commentDiv = `
    <p>${ratingLoc} ⭐</p>
    <p>" ${commentLoc} "</p>
  `;
  const noCommentDiv = `
    <p>${ratingLoc} ⭐</p>
    <p style="color: rgba(78, 75, 75, 0.553);"><i>User didn't leave a comment.</i></p>
  `

  //If user does write a comment, comment will be displayed. If not,italic message will be displayed: 

  if(commentLoc.length < 1){
    newDiv.insertAdjacentHTML("afterbegin",noCommentDiv);
    newDiv.className = "commentClass";
    ratingsAndComments.appendChild(newDiv);
  }else{
  newDiv.insertAdjacentHTML("afterbegin",commentDiv);
  newDiv.className = "commentClass";
  ratingsAndComments.appendChild(newDiv);
  }



  //Average rating:

  let averageRating = 0;
  for(var j = 0; j < avRatings.length; j++){
    averageRating += avRatings[j];
  }

  let finalRating = averageRating / avRatings.length;
  
  document.getElementById("average-rating").innerHTML = `
  <p>Average rating: ${finalRating.toFixed(2)} ⭐ </p>
`
}



labels.forEach((each)=> {
  each.addEventListener("click", fun);
})

function fun(){
  ratings.push(this.id);

  if(ratings.length > 1){
    ratings.shift()
  }
  console.log(ratings);
  
  //Saving rating to local storage:
  localStorage.setItem('stars',ratings);

}



othersRatings.onclick = () => {
  post.style.display = "none";
  ratingsAndComments.style.display = "block";
  clearTimeout(goHomeTimer);

}

homeBtn.addEventListener("click", goHome);

function goHome(){
  ratingsAndComments.style.display = "none";
  post.style.display = "none";
  widget.style.display = "block";
  comment.value = ``;
  //deleting selected rating:
  var selectedStar = document.getElementsByName("rate");
  for(var i=0; i<selectedStar.length; i++){
      selectedStar[i].checked = false;
    }

}
