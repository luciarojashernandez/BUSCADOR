//Automatizando fetch
//se pueden agregar más metodos, verificar que esté en formato de closure
//la closure retorna esos métodos
//todos internamente usa custom fecth
//primero se configura con opciones
//retona una petición fetch

export const helpHttp = () => {
    /*closure cuando una función es capaz de recordar 
      y acceder a un lexical scope, 
      incluso cuando la función es ejecutada por fuera del lexical scope.*/
    const customFetch = (endpoint, options) => {
      const defaultHeader = {
        //Acepta por defecto json
        accept: "applicatios/json",
      };
      //cuando fecth detecta que no hay respuesta del servidor
      const controller = new AbortController();
      //del objeto de las options (petivciocnes fetch), agregar signal para agregar el objeto controller
      //options.signal = controller.signal;
      //si el usuario no especifico ningun método, por default es get
      options.method = options.method || "GET";
      //si el usuario especifico algunas cabeceras (viene headers), entonces cabeceras por defecto + las que indique el usuario
      options.headers = options.headers
        ? { ...defaultHeader, ...options.headers }
        : defaultHeader;
      //hay que parsear el objeto como cadena de texto con json strngify (si no viene body, iguala a falso)
      options.body = JSON.stringify(options.body) || false;
      if (!options.body) {
        delete options.body; //33 min 22:30
      }
  
      console.log(options);
      //si después de un segundo no hay respuesta, ejecuta el mètodo abort
      setTimeout(() => controller.abort(), 3000);
  
      return (
        fetch(endpoint, options)
          //si res es ok, parsea a json vs rechaza
          .then((res) =>
            res.ok
              ? res.json()
              : Promise.reject({
                  //objeto de error que se envía a la respuesta
                  err: true,
                  //si no viene el status,si es 00 la api no trajo status de error
                  status: res.status || "00",
                  statusText: res.statusText || "Ocurrió un error",
                })
          )
          .catch((err) => err)
      );
    };
    //si el usuario no manda options, el valor por defecto es un objeto vacío
    const get = (url, options = {}) => customFetch(url, options);
    const post = (url, options = {}) => {
      options.method = "POST";
      return customFetch(url, options);
    };
    const put = (url, options = {}) => {
      options.method = "PUT";
      return customFetch(url, options);
    };
    const del = (url, options = {}) => {
      options.method = "DELETE";
      return customFetch(url, options);
    };
    return {
      get,
      post,
      put,
      del,
    };
  };
  