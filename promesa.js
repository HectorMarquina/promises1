// EJERCICIO 1
function numeros() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
            resolve(numeroAleatorio);
            console.log("El número aleatorio es: ", numeroAleatorio)
        }, 2000);
    })
    .then((numero) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const resultadoCuadrado = Math.pow(numero, 2);
                resolve(resultadoCuadrado);
                console.log("El número aleatorio al cuadrado es: ", resultadoCuadrado)
            }, 3000);
        });
    })
    .then((resultado) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const raizCuadrada = Math.sqrt(resultado);
                resolve(raizCuadrada);
                console.log("La raíz del último número es: ", raizCuadrada)
            }, 1000);
        });
    });
}

numeros().then((resultadoFinal) => {
        console.log("El primer ejercico ha terminado.");
    })
    .catch((error) => {
        console.error("Hubo un error:", error);
});


// EJERCICIO 2
function multiplesSolicitudes(urls) {
    const promesas = urls.map(url => {
        return fetch(url).then(response => response.json());
    });

    return Promise.all(promesas);
}

const urls = ['https://reqres.in/api/users/1', 'https://reqres.in/api/users/2', 'https://reqres.in/api/users/3'];
multiplesSolicitudes(urls).then(resultados => {
        console.log('Resultados de las solicitudes:', resultados);
    })
    .catch(error => {
        console.error('Error al realizar las solicitudes:', error);
    });



// EJERCICIO 3
function PromesasParalelo(funcionesPromesa) {
    const promesasPara = funcionesPromesa.map(func => func());
    return Promise.all(promesasPara);
}

const prom1 = () => new Promise(resolve => setTimeout(() => resolve('Promesa 1'), 3000));
const prom2 = () => new Promise(resolve => setTimeout(() => resolve('Promesa 2'), 3000));
const prom3 = () => new Promise(resolve => setTimeout(() => resolve('Promesa 3'), 3000));
const prom4 = () => new Promise(resolve => setTimeout(() => resolve('Promesa 4'), 3000));
const prom5 = () => new Promise(resolve => setTimeout(() => resolve('Promesa 5'), 3000));

const funPro = [prom1, prom2, prom3, prom4, prom5];

PromesasParalelo(funPro)
    .then(final => {
        console.log(final);
    })
    .catch(error => {
        console.error(error);
    });




// EJERCICIO 4
function cadenaDePromesas(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            for (let i = 1; i <= n; i++) {
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log(i);
                        resolve();
                    }, i * n * 1000); // ¿Se multiplica después de n segundos multiplicado por el número actual en el bucle?
                }).then(() => {
                    if (i === n) {
                        resolve("Todas las promesas se resolvieron");
                    }
                });
            }
        }, n * 1000);
    });
}

cadenaDePromesas(3)
    .then(resultado => {
        console.log(resultado);
    })
    .catch(error => {
        console.error("Hubo un error:", error);
    });



// EJERCICIO 5
function promesaCancelacion() {
    let cancelada = false;

    const promesaPrincipal = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!cancelada) {
                resolve('La promesa se ha completado después de 5 segundos');
            }
        }, 5000);
    });

    const cancelarPromesa = () => {
        cancelada = true;
        console.log('Promesa cancelada');
    };

    return { promesaPrincipal, cancelarPromesa };
}


const { promesaPrincipal, cancelarPromesa } = promesaCancelacion();

promesaPrincipal
    .then((mensaje) => {
        console.log(mensaje);
    })
    .catch((error) => {
        console.error(error);
    });

    setTimeout(() => {
        console.log('Cancelando...');
        cancelarPromesa(); // Llamar a cancelar. Si se quita esto, la promesa se cumple.
    }, 3000);
