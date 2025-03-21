// Traer la API y ver que se muestran los datos

const apiUsers = "https://jsonplaceholder.typicode.com/users";
console.log(apiUsers)
fetch(apiUsers)
.then(response =>{
    if(!response.ok){
        throw new Error("Error a obtener los datos")
    }
    return response.json();
})
.then(data => {
    console.log("Usuarios obtenidos:", data);
    const users = data.map(usuario => ({
        ...usuario,
        // añadir a cada usuario una edad aleatoria
        edad: edadAleatoria(),
        // añadir imagenes a los usuarios
        img: `assets/img/${usuario.id}.jpeg` 
    }));
    // mostrar los usuarios en la pagina web
    const listaUsuarios= document.getElementById("listaUsuarios")
    if (!listaUsuarios) {
        console.error("No se encontró el elemento con id 'listaUsuarios'");
        return;
    }

    users.forEach(usuario => {
        const li = document.createElement(`li`);
        li.classList.add(`usuario`);
        li.innerHTML = cardUsuario(usuario)
        listaUsuarios.appendChild(li);
    })

})
.catch(error => {
    console.error("error petición", error);
});


function edadAleatoria() {
    return Math.floor(Math.random() * (45 - 30 + 1)) + 30;
}
//console.log(edadAleatoria())

function cardUsuario(usuario) {
    return `
    <div class="card">
        <div class="datos">
            <p><strong>Nombre:</strong> ${usuario.name}</p>
            <p><strong>Edad:</strong>  ${usuario.edad}</p>
            <p><strong>Username:</strong>  ${usuario.username}</p>
            <p><strong>Télefono:</strong> ${usuario.phone}</p>
            <p><strong>Email:</strong> ${usuario.email}</p>
        </div>
        <img src="${usuario.img}" alt="foto">
    </div>
    <div class="empresa">
        <p><strong>Compañia:</strong> ${usuario.company.name}</p>
        <p><strong>Dirección:</strong> ${usuario.address.street}, ${usuario.address.suite}, ${usuario.address.city}</p>
    </div>
    `;
}

