import React from "react";
import { useState } from "react";

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
          "* Formato invalido apellidos, ej: Nuria Roca",
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

  //------ evento onChange de los input ------------
  function handleChange(ev) {
    const { name, value } = ev.target; // cojo el name (ej:nombre) y value (ej:Alberto) que viene del onChange
    setFormData({
      ...formData,
      [name]: { ...formData[name], valor: value },
    });
  }

  //---------- evento onBlur de los input ---------
  function validaCaja(ev) {
    const _name = ev.target.name;
    const _value = ev.target.value;
    const _validaciones = formData[_name].validaciones;
    let msj = "";

    if (!_validaciones.obligatorio[0]) {
      cambiaValido(_name, true);
    } else {
      if (!formData[_name].valor || /^\s+/.test(formData[_name].valor)) {
        msj = _validaciones.obligatorio[1];
      } else if (
        _validaciones.maximaLongitud &&
        _validaciones.maximaLongitud[0] <= _value.length
      ) {
        msj = _validaciones.maximaLongitud[1];
        cambiaMsj(_name, msj);
      } else if (
        _validaciones.minimaLongitud &&
        _validaciones.minimaLongitud[0] >= _value.length
      ) {
        msj = _validaciones.minimaLongitud[1];
      } else if (!_validaciones.patron[0].test(_value)) {
        msj = _validaciones.patron[1];
      }
    }

    cambiaMsj(_name, msj);

    if (msj) {
      cambiaValido(_name, false);
    } else {
      cambiaValido(_name, true);
    }
  }

  const cambiaMsj = (name, msj) => {
    setFormData({
      ...formData,
      nombre: { ...formData.nombre, msjValidacion: msj },
    });
    console.log(
      `msj pasado a la funcion: ${msj} ... msj del state: ${formData[name].msjValidacion}`
    );
  };

  const cambiaValido = (name, value) => {
    setFormData({ ...formData, [name]: { ...formData[name], valido: value } });

    console.log(
      `Valido pasado a la funcion: ${value} ... valido del state: ${formData[name].valido}`
    );
  };

  console.log(formData.nombre.msjValidacion.length);

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
                  onBlur={validaCaja}
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
                  onBlur={validaCaja}
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
                onBlur={validaCaja}
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
                onBlur={validaCaja}
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
