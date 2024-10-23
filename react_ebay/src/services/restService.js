let restService = {
  RegistrarCliente: function (datosCuenta) {
    return fetch("http//localhost:3003/cliente/Registro", {
      method: "POST",
      body: JSON.stringify({ datosCuenta }),
    });
  }
};

export default restService;