//* Usando "formik" para el formulario y "yup" para validaciones del Formulario para registro personal

import React from "react";
import "./Registro.css";
import { useState } from 'react'; //hook para manejar el estado del componente
import  { useFormik }  from "formik";
import * as Yup from "yup";
import restService from "../../services/restService";

const regexName = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;//Admite tildes y ñ
const regexEmail = /^.+@(hotmail|gmail|yahoo|msn)\.[a-z]{2,3}$/;
const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#@$%*]).{8,}$/;

const Registro = () => {

  const formik = useFormik({
    initialValues: { nombre: "", apellidos: "", email: "", password: "" },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required('* Nombre obligatorio')
        .max(150, '* Nombre no debe exceder de 150 cars')
        .matches(regexName,'* Formato no válido ej: Ángel Luis'),
      apellidos: Yup.string()
        .required('* Apellidos obligatorios')
        .max(150, '* No debe exceder de 250 cars')
        .matches(regexName,'* Formato no válido ej: Pérez Gómez'),
      email: Yup.string()
        .required('* Campo requerido')
        .matches(regexEmail, '* Formato invalido email, ej: mio@hotmail.es'),
      password: Yup.string()
        .required('* Contraseña obligatoria')
        .min(8,'* Longitud mínima de 8 caracteres')
        .matches(regexPass, '* Formato invalido contraseña, una MAYS, una Mins, un digito, un simbolo')

    }),
    
    onSubmit: (values) => {
    console.log(values);
    //restService.RegistrarCliente(values);
    
    }

  });
  
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
          <form onSubmit={formik.handleSubmit}>
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
                  onChange={formik.handleChange}
                  value={formik.values.nombre}
                />
                <p>
                  <span className="small text-danger">{formik.errors.nombre}</span>
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
                  onChange={formik.handleChange}
                  value={formik.values.apellidos}
                />
                <p>
                  <span className="small text-danger">{formik.errors.apellidos}</span>
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
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <p>
                <span className="small text-danger">{formik.errors.email}</span>
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
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <p>
                <span className="small text-danger">{formik.errors.password}</span>
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
              disabled={!(formik.isValid && formik.dirty)} // habilita solo si es válido y se ha modificado

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
};

export default Registro;
