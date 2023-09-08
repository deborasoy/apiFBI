document.addEventListener("DOMContentLoaded", getList());
const container = document.getElementById("container"); //donde se añade cada articulo, con la data de la api

async function getList() { //obtener data
  const response = await fetch(` https://api.fbi.gov/wanted/v1/list`); //api FBI
  if (!response.ok) throw new Error(`code error: ${response.status}`);
  const data = await response.json();
  const { items } = data //  me quedo con el array items
  showList(items);
  //llamo a la funcion utlizando como parametro itmes, un array que contiene 20 objetos con sus propiedas.
    
};
function showList(array) {
   let template = ``;
   let numArticle = 0;
   for (let i = 0; i < 18; i++) { //recorro del array solo 19 posiciones de las 20, el objeto 20 no tenia suficiente contenido dispnible para mostar.
     numArticle += 1;
     const element = array[i]; 
      const subjects = element.subjects;; // array subjetcs que se encuentra dentro del objeto
      const imgArray = element.images; //array images dentro del objeto
     
    //tomo las propiedades: title, array subjects, images, details, publication, modified para generar cada articulo.
      template += `
         <article class="text-center" style="background-color:#161616">
          <div>
                  <h2 class="text-justify h2">Article  ${numArticle}</h2> 
                  <h2 class="h2">Name of missing person: ${element.title}</h2> 
                  <h3>Topic of the article:</h3>
        `;
       subjects.forEach(item => { //recorro el array subjects, hay objetos que tienen mas de un elemento dentro del array
        template += ` 
        <h3>${item}</h3>  
        </div>`
       });
      imgArray.forEach(imagen => { //recoro el array images, hay objetos que tienen mas de una imagen 
        template += `
                  <img src="${imagen.original}" style="height:150px" class="rounded" alt="image not available">  
            `;
      });
      const conditionDetails = element.details === null ? "" : ` Details: ${element.details}`;
      //aseguro con el operador condicional ternario que la descripcion que se mostrara no este vacia y muestre un null.
      template += `
              <div>
              <p class="text-justify load">${conditionDetails}</p>
                  <p> Date Post Publication: ${element.publication}</p>
                  <p>Date Post Modified: ${element.modified}</p>    
              </div>
              <hr>
              </article> 
            `;
    };
    container.innerHTML += template;
  };










