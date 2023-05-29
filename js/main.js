const btn = document.getElementById('button');


const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const fecha = document.getElementById("fecha");
const horario = document.getElementById("horario");
const form = document.getElementById("formulario");
const parrafo = document.getElementById("warnings");



form.addEventListener('submit', e => {
    event.preventDefault();


    /*======================================================================*/
    /*   COMIENZO DE PARTE DE VALIDACION DE FORMULARIO */
    let warnings = "";
    let entrar = false;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/

    parrafo.innerHTML = ""

    //console.log(nombre.value.trim().length);

    if (nombre.value.length == 0) {
        warnings += `Falta introducir nombre <br>`;
        entrar = true;
    } else if (nombre.value.length < 3) {
        warnings += `El nombre no es válido <br>`;
        entrar = true;
    } else if (nombre.value.length >= 3) {

        for (var i = 0; i < nombre.value.trim().length; i++) {
            var charCode = nombre.value.charCodeAt(i);
            if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
                warnings += `El campo 'nombre' solo puede contener caracteres alfabéticos y espacios.<br>`;
                entrar = true;
                break;
            }
        }
    }

    if (apellido.value.length == 0) {
        warnings += `Falta introducir apellido <br>`;
        entrar = true;
    } else if (apellido.value.length < 3) {
        warnings += `El apellido no es válido <br>`;
        entrar = true;
    } else if (apellido.value.length >= 3) {

        for (var i = 0; i < apellido.value.trim().length; i++) {
            var charCode = apellido.value.charCodeAt(i);
            if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
                warnings += `El campo 'apellido' solo puede contener caracteres alfabéticos y espacios.<br>`;
                entrar = true;
                break;
            }
        }

    }

    if (email.value.length == 0) {
        warnings += `Falta introducir email <br>`;
        entrar = true;
    } else if (!regexEmail.test(email.value)) {
        warnings += `El email no es válido <br>`;
        entrar = true;
    }

    if (fecha.value.length == 0) {
        warnings += `Falta introducir la fecha de reserva <br>`;
        entrar = true;
    }

    if (horario.value.length == 0) {
        warnings += `Falta introducir el horario de su visita <br>`;
        entrar = true;
    }


    if (entrar) {
        // SI HAY ERRORES SE MUESTRAN EN PANTALLA
        parrafo.style = "color: red";
        parrafo.innerHTML = warnings
        setTimeout(() => {
            parrafo.innerHTML = "";
        }, 6000);
    } else {
        // SI NO HAY ERRORES SALE EL CARTEL EN VERDE Y LUEGO ACTIVA EL ENVIO AL BUZON DE CORREO....

        parrafo.style = "color: green";
        parrafo.innerHTML = "Solicitud de reserva enviada correctamente, en breve recibirá un email de confirmación en su correo electrónico. "

        /*  FIN VALIDACION DE FORMULARIO */
        /*======================================================================*/

        /* DESDE ACA EMPIEZA LA PARTE QUE ENVIA EL MAIL */

        btn.value = 'Enviando...';
        setTimeout(() => {
            parrafo.innerHTML = "";
        }, 10000);



        const serviceID = 'default_service';
        const templateID = 'template_6f2o81s';


        emailjs.sendForm(serviceID, templateID, form)
            .then(() => {
                btn.value = 'Solicitar Reserva';
                //alert('Mensaje enviado correctamente!');



            }, (err) => {
                btn.value = 'Solicitar Reserva';
                alert(JSON.stringify(err));
            });

    }

});


