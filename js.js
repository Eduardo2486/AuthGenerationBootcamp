const isLoggedIn = () => {
  let loggedin = localStorage.getItem('loggedin');
  if(loggedin){
    return true;
  }else{
    localStorage.removeItem('loggedin');
    return false;
  }
};

const logIn = (email, pass) => {
  if(email === "email@email.com" && pass === "pass"){
    console.log("inside");
    localStorage.setItem("loggedin", true)
    window.location.reload();
  }
};


const loadImages = async () => {
  if(isLoggedIn()){
    //Agregar la key del api despues del client api de unsplash.
    let res = await fetch('https://api.unsplash.com/photos/?client_id=');
    let data = await res.json();
    return data;
  }else{
    let url = `${window.location.origin}/auth-web-page/login.html`; 
    window.location.replace(url);
  }
};

const showImages = async () => {
  let data = await loadImages();
  for (let i = 0; i < data.length; i++) {
    let cardText = document.createElement('p');
    cardText.setAttribute('class', 'card-text');

    let text = document.createTextNode(data[i]['alt_description']);
    console.log(text);
    cardText.appendChild(text);
    
    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    cardBody.appendChild(cardText);

    let img = document.createElement('img');
    img.setAttribute('class', 'bd-placeholder-img card-img-top');
    img.setAttribute('src', data[i]['urls']['raw']);
    
    let cardShadow = document.createElement('div');
    cardShadow.setAttribute('class', 'card shadow-sm');
    cardShadow.appendChild(img);
    cardShadow.appendChild(cardBody);

    let col = document.createElement('div');
    col.setAttribute('class', 'col');
    col.appendChild(cardShadow)
    document.getElementById('imagesContainer').appendChild(col);
  }
}

const logOut = () => {
  localStorage.removeItem('loggedin');
  let url = `${window.location.origin}/auth-web-page/login.html`; 
  window.location.replace(url);
};