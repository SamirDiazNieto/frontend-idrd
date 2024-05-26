import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

function App() {
  const dataProyectos = [
    { id: 1, nombre: "Pratto", departamento: "Cundinamarca",  ciudad: "Bogota"},
    { id: 2, nombre: "Reserva del Bosque", departamento: "Boyaca", ciudad: "Tunja" },
    { id: 3, nombre: "Alcabama",departamento: "Meta", ciudad: "Villavicencio" }
  ];

  const dataMateriales = [
    {id: 1, codigo: 10001, descripcion: "Cemento", unidad: "m2", precio: 1000 },
    {id: 2, codigo: 10002, descripcion: "Estuco Blanco" , unidad: "und", precio: 2000 },
    {id: 3, codigo: 10002, descripcion: "Arena", unidad: "kg ", precio: 3000 }
  ];

 const [dataProjects, setDataProjects] = useState(dataProyectos);
 const [dataMaterials, setDataMaterials] = useState(dataMateriales);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalMaterials, setModalMaterials] = useState(false);

  const [project, setProject] = useState({
    id: '',
    nombre: '',
    departamento: '',
    cuidad: ''
  });

  const modalProyecto = (proyecto, action) => {
    setProject(proyecto);
    switch (action) {
      case "Edit":
        setModalEdit(true);
        break;
      case "Delete":
        setModalDelete(true);
        break;

      default:
        break;
    }
  };

  const handleChange = e =>{
    const {name, value}=e.target;
    setProject((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    var newDataProjects=dataProjects;
    newDataProjects.map(proyecto=>{
      if(proyecto.id===project.id){
        proyecto.nombre=project.nombre;
        proyecto.departamento=project.cuidad;
        proyecto.cuidad=project.departamento;
      }
    });
    setProject(dataProjects);
    setModalEdit(false);
  }

  const eliminar =()=>{
    setProject(dataProjects.filter(proyecto=>proyecto.id!==project.id));
    setModalDelete(false);
  }

  const openModalInsert=()=>{
    setProject(null);
    setModalInsert(true);
  }

  const insertar =()=>{
    var valorInsertar=project;
    valorInsertar.id=project[project.length-1].id+1;
    var dataNueva = project;
    dataNueva.push(valorInsertar);
    setProject(dataNueva);
    setModalInsert(false);
  }
  return (
    <div className="App container">
      <h2>Prueba Técnica IDRD</h2>
      <br />
      <button className="btn btn-success" onClick={() => openModalInsert()}>
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
          />
        </svg>{" "}
        Insertar
      </button>
      <br />
      <br />
      <div class="row">
        <div class="col-sm-6 col-md-5 col-lg-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Proyecto</th>
                <th>Ciudad</th>
                <th>Departamento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataProjects.map((elemento) => (
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.nombre}</td>
                  <td>{elemento.departamento}</td>
                  <td>{elemento.ciudad}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => modalProyecto(elemento, "Edit")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                      </svg>{" "}
                      Editar
                    </button>{" "}
                    {"   "}
                    <button
                      className="btn btn-danger"
                      onClick={() => modalProyecto(elemento, "Delete")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                      </svg>{" "}
                      Eliminar
                    </button>{" "}
                    {"   "}
                    <button className="btn btn-info"
                     onClick={() => setModalMaterials(true)}
                     >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-archive-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z" />
                      </svg>{" "}
                      Material
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalEdit}>
        <ModalHeader>
          <div>
            <h3>Editar Proyecto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={project && project.id}
            />
            <br />

            <label>Proyecto</label>
            <input
              className="form-control"
              type="text"
              name="proyecto"
              value={project && project.nombre}
              onChange={handleChange}
            />
            <br />

            <label>Ciudad</label>
            <input
              className="form-control"
              type="text"
              name="cuidad"
              value={project && project.ciudad}
              onChange={handleChange}
            />
            <br />
            <label>Departamento</label>
            <input
              className="form-control"
              type="text"
              name="departamento"
              value={project && project.departamento}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalEdit(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete}>
        <ModalBody>
          Estás Seguro que deseas eliminar el proyecto{" "}
          {project && project.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setModalDelete(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Insertar Proyecto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={dataProjects[dataProjects.length - 1].id + 1}
            />
            <br />

            <label>Proyecto</label>
            <input
              className="form-control"
              type="text"
              name="project"
              value={project ? project.nombre : ""}
              onChange={handleChange}
            />
            <br />

            <label>Cuidad</label>
            <input
              className="form-control"
              type="text"
              name="cuidad"
              value={project ? project.cuidad : ""}
              onChange={handleChange}
            />
            <label>Departamento</label>
            <input
              className="form-control"
              type="text"
              name="departamento"
              value={project ? project.departamento : ""}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalInsert(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalMaterials}>
        <ModalHeader>
          <div>
            <h3>Materiales de Proyecto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
        <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Descripcion</th>
                <th>Unidad</th>
                <th>precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataMaterials.map((elemento) => (
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.codigo}</td>
                  <td>{elemento.descripcion}</td>
                  <td>{elemento.unidad}</td>
                  <td>${elemento.precio}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      // onClick={() => modalProyecto(elemento, "Edit")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                      </svg>{" "}
                      
                    </button>{" "}
                    {"   "}
                    <button
                      className="btn btn-danger"
                      // onClick={() => modalProyecto(elemento, "Delete")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                      </svg>{" "}
                      
                    </button>{" "}
                    {"   "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>
                <button
            className="btn btn-secondary"
            onClick={() => setModalMaterials(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
