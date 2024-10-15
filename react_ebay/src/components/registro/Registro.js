import React from "react";
import { useState } from "react";
import './Registro.css';

function Registro() {
  const [formData, setFormData] = useState({
    nombre: {
      //? <---------- propiedad q se mapea contra campo input-nombre
      valor: "", // <------ propiedad de "nombre" a modificar en evento onChange del input
      valido: false, // <--propiedad de "nombre" q define estado de validacion del contenido del input-nombre
      validaciones: {
        // <-- propiedad de "nombre" con las validaciones a hacer sobre el input-nombre
        obligatorio: [true, "* Nombre obligatorio"],
        maximaLongitud: [150, "* Nombre no debe exceder de 150 cars."],
        patron: [
          /^([A-Z][a-z]+\s*)+/,
          "* Formato invalido nombre, ej: Nuria Roca",
        ],
      },
      msjValidacion: "", //<-- propiedad de "nombre" con el mensaje de error procedente de las validaciones a hacer sobre input-nombre
    },
    apellidos: {
      //? <---------- propiedad q se mapea contra campo input-apellidos
      valor: "",
      valido: false,
      validaciones: {
        obligatorio: [true, "* Apellidos obligatorios"],
        maximaLongitud: [250, "* Apellidos no debe exceder de 250 cars."],
        patron: [
          /^([A-Z][a-z]+\s*)+/,
          "* Formato invalido apellidos, ej: Perez Roca",
        ],
      },
      msjValidacion: "",
    },
    email: {
      //? <---------- propiedad q se mapea contra campo input-email
      valor: "",
      valido: false,
      validaciones: {
        obligatorio: [true, "* Email obligatorio"],
        patron: [
          /^.+@(hotmail|gmail|yahoo|msn)\.[a-z]{2,3}$/,
          "* Formato invalido email, ej: mio@hotmail.es",
        ],
      },
      msjValidacion: "",
    },
    password: {
      //? <---------- propiedad q se mapea contra campo input-password
      valor: "",
      valido: false,
      validaciones: {
        obligatorio: [true, "* Contraseña obligatoria"],
        minimaLongitud: [
          8,
          "* La contraseña debe tener al menos 8 caracteres ",
        ],
        patron: [
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#@~€¬$%*]).{8,}$/,
          "* Formato invalido contraseña, una MAYS, una Mins, un digito, un simbolo",
        ],
      },
      msjValidacion: "",
    },
  });

  //#region ev onChange / validaCaja
  function handleChange(ev) {
    const { campo, _valor } = ev.target; // cojo el name (ej:nombre) y value (ej:Alberto) que viene del onChange
    setFormData({
      ...formData,
      [campo]: { ...formData[campo], valor: _valor },
    });
    validaCaja(ev);
  }

  function validaCaja(ev) {
    const campo = ev.target.name;
    const _valor = ev.target.value;
    const _validaciones = formData[campo].validaciones;
    let msj = ""; // Para almacenar el msj de validación
    let _valido = false;

    if (_validaciones.obligatorio) {
      if (!_valor || /^\s+/.test(_valor) || /\s$/.test(_valor)) {
        // Ni en blanco ni con espacios delante o al final
        console.log("en blanco");

        msj = _validaciones.obligatorio[1];
      } else if (
        _validaciones.maximaLongitud &&
        _validaciones.maximaLongitud[0] < _valor.length
      ) {
        //si existe la prop y no cumple
        msj = _validaciones.maximaLongitud[1];
      } else if (
        _validaciones.minimaLongitud &&
        _validaciones.minimaLongitud[0] >= _valor.length
      ) {
        //si existe la prop y no cumple
        msj = _validaciones.minimaLongitud[1];
      } else if (!_validaciones.patron[0].test(_valor)) {
        //si no cumple el patron
        msj = _validaciones.patron[1];
      } else {
        _valido = true;
      }
    } else {
      _valido = true;
    }
    setFormData({
      ...formData,
      [campo]: { ...formData[campo], valido: _valido, msjValidacion: msj },
    });

    console.log(msj, _valido);
  }
//#endregion ev onChange / validaCaja

  return (
    <div className="container">
      {/* fila donde va logo de ebay y link para el Login*/}
      <div className="row mt-4">
        <div className="col-2">
          <img src="/images/logo_ebay.png" alt="logo ebay"></img>
        </div>
        <div className="col-6"></div>
        <div className="col-2">
          <span>¿Ya tienes una cuenta?</span>
        </div>
        <div className="col-2">
          <a href="/">Identificarse</a>
        </div>
      </div>
      {/* fila donde va imagen de registro y formulario, depende tipo de cuenta, si es PERSONAL o EMPRESA*/}
      <div className="row mt-4">
        <div className="col-8">
          <img
            src="/images/imagen_registro_personal.jpg"
            alt="Registro Personal"
          ></img>
        </div>
        <div className="col-4">
          <form>
            <div className="row">
              <h1 className="title">Crear una cuenta</h1>
            </div>
            <div className="row">
              <div className="col form-floating">
                <input
                  type="text"
                  id="txtNombre"
                  name="nombre"
                  className="form-control form-element"
                  placeholder="Nombre"
                  onChange={handleChange}
                />
                <p>
                  <span>{formData.nombre.msjValidacion}</span>
                </p>
                <label htmlFor="txtNombre" className="floating-label">
                  Nombre
                </label>
              </div>
              <div className="col mb-3 form-floating">
                <input
                  type="text"
                  id="txtApellidos"
                  name="apellidos"
                  className="form-control form-element"
                  placeholder="Apellidos"
                  onChange={handleChange}
                />
                <p>
                  <span>{formData.apellidos.msjValidacion}</span>
                </p>

                <label htmlFor="txtApellidos" className="floating-label">
                  Apellidos
                </label>
              </div>
            </div>
            <div className="mb-3 form-floating">
              <input
                type="email"
                id="txtEmail"
                name="email"
                className="form-control form-element"
                placeholder="Correo electrónico"
                onChange={handleChange}
              />
              <p>
                <span>{formData.email.msjValidacion}</span>
              </p>

              <label htmlFor="txtEmail" className="floating-label">
                Correo Electronico
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                type="password"
                id="txtPassword"
                name="password"
                className="form-control form-element"
                placeholder="Contraseña"
                onChange={handleChange}
              />
              <p>
                <span>{formData.password.msjValidacion}</span>
              </p>

              <label htmlFor="txtPassword" className="floating-label">
                Contraseña
              </label>
            </div>
            <div className="mb-3" style={{ maxWidth: "430px" }}>
              {/*** minicomponente para desuscribirse */}
              <p className="text-small">
                Te enviaremos correos electrónicos sobre ofertas relacionadas
                con nuestros servicios periódicamente. Puedes{" "}
                <a
                  href="/"
                  style={{ color: "#007bff", textDecoration: "underline" }}
                >
                  cancelar la suscripción
                </a>{" "}
                en cualquier momento.
              </p>
              <p className="text-small">
                Al seleccionar Crear cuenta personal, aceptas nuestras
                Condiciones de uso y reconoces haber leído nuestro Aviso de
                privacidad.
              </p>
            </div>
            <button
              type="submit"
              className="btn w-100 mb-3"
              disabled={
                !(
                  formData.nombre.valido &&
                  formData.apellidos.valido &&
                  formData.email.valido &&
                  formData.password.valido
                )
                  ? true
                  : false
              }
            >
              Crear cuenta personal
            </button>
            <div className="row mt-3 d-flex flex-row">
              <span className="separator-before"></span>
              <span className="text-small inseparator">o continua con</span>
              <span className="separator-after"></span>
            </div>
            <div className="row">
              <div className="col">
                <button className="btn redes" style={{ width: "100%" }}>
                  <i className="fa-brands fa-google"></i> Google
                </button>
              </div>
              <div className="col">
                <button className="btn redes" style={{ width: "100%" }}>
                  <i className="fa-brands fa-facebook"></i> Facebook
                </button>
              </div>
              <div className="col">
                <button className="btn redes" style={{ width: "100%" }}>
                  <i className="fa-brands fa-apple"></i> Apple
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registro;
