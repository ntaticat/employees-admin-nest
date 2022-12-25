const contenedorLista = document.getElementById('contenedor-lista');
const employeeForm = document.getElementById('employee-form');
const createEmployeeModal = document.getElementById('create-employee-modal');
const openEmployeeModalButton = document.getElementById('open-employee-modal');
const employeeModalContainer = document.getElementById('employee-modal-container');
const buttonInput = document.getElementById('button-employee');

const input1 = document.getElementById('employeeName');
const input2 = document.getElementById('employeeMiddleName');
const input3 = document.getElementById('employeeSurName');

function getData() {
    contenedorLista.innerHTML = "";

    fetch('http://localhost:3000/api/v2/employees', { method: 'GET'})
    .then((response) => response.json())
    .then((employeesData) => {
        employeesData.map((employee) => {

            const fullName = `${employee.name} ${employee.middleName} ${employee.surName}`
            
            const div = document.createElement("div");
            div.classList.add('employees-list-item-container');

            const li = document.createElement("li");
            li.innerHTML = fullName;
            li.classList.add('employees-list-item');
            
            const span = document.createElement('span');
            span.innerHTML = employee.id;
            span.classList.add('employee-id');

            div.append(li, span);
            contenedorLista.appendChild(div);
        });
    })
}

window.addEventListener("load", () => {
    getData()
});

buttonInput.addEventListener("click", (e) => {
    e.preventDefault();

    let data = {
        name: input1.value,
        middleName: input2.value,
        surName: input3.value,
    }

    fetch('http://localhost:3000/api/v2/employees', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((responseData) => {
        console.log(responseData);

        if(responseData.ok === false) {
            throw new Error("No se pudo registrar al empleado");
        }

        alert("se ha registrado al empleado exitosamente");
        getData();
        createEmployeeModal.style.display = "none";
    })
    .catch((err) => {
        alert(err);
    })
});

openEmployeeModalButton.addEventListener("click", () => {
    createEmployeeModal.style.display = "flex";
})

createEmployeeModal.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    createEmployeeModal.style.display = "none";
});

employeeModalContainer.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
});