import React, { useState, useEffect, Fragment } from 'react';

function Formulario ({addAppointment}) {

    const initialState = {
        pet: '',
        owner: '',
        date: '',
        time: '',
        symptoms: ''
    }

    const [appointment, updateAppointment] = useState(initialState);

    
    const handleChange = (e) => {
        updateAppointment({
            ...appointment,
            [e.target.name]: e.target.value
        });

    }
    
    const sendAppointment = e => {
        e.preventDefault();
        console.log('appointment ', appointment);
        
        // pasar la cita al componente principal
        addAppointment(appointment);
        // reiniciar el form
        updateAppointment(initialState);
    }

    return(
        <Fragment>
            <h2>Crear Cita</h2>
            <form onSubmit={sendAppointment}>
                    <label>Nombre Mascota</label>
                    <input 
                        type="text" 
                        name="pet"
                        className="u-full-width" 
                        placeholder="Nombre Mascota" 
                        onChange={handleChange}
                        value={appointment.pet}
                    />

                    <label>Nombre Dueño</label>
                    <input 
                        type="text" 
                        name="owner"
                        className="u-full-width"  
                        placeholder="Nombre Dueño de la Mascota" 
                        onChange={handleChange}
                        value={appointment.owner}
                    />

                    <label>Fecha</label>
                    <input 
                        type="date" 
                        className="u-full-width"
                        name="date"
                        onChange={handleChange}
                        value={appointment.date}
                    />               

                    <label>Hora</label>
                    <input 
                        type="time" 
                        className="u-full-width"
                        name="time" 
                        onChange={handleChange}
                        value={appointment.time}
                    />

                    <label>Sintomas</label>
                    <textarea 
                        className="u-full-width"
                        name="symptoms"
                        onChange={handleChange}
                        value={appointment.symptoms}
                    ></textarea>

                    <button type="submit" className="button-primary u-full-width">Agregar</button>
                </form>
        </Fragment>
    )
}

function Appointment ({appointment, index, deleteAppointment}) {

    return (
        <div className="appointment">
            <p><strong>Mascote:</strong> {appointment.pet}</p>
            <p><strong>Due;o:</strong>{appointment.owner}</p>
            <p><strong>Fecha:</strong>{appointment.date}</p>
            <p><strong>Hora:</strong>{appointment.time}</p>
            <p><strong>Sintomas:</strong>{appointment.symptoms}</p>
            <button 
                onClick={() => deleteAppointment(index)}
                type="button" className="button eliminar u-full-width">Eliminar X</button>
        </div>
    )
}

const App = () => {


    // appointment -> Es es state
    // saveAppointment -> Modifica el state
    // ([]) -> valor inicial del state
    const [appointments, saveAppointments] = useState([]);

    const addAppointment = appointment => {
        let newAppointments = [...appointments, appointment];      
        console.log('nweAppointment', newAppointments)  ;
        saveAppointments(newAppointments);        
    }

    const deleteAppointment = index => {
        const newAppointments = [...appointments];
        newAppointments.splice(index, 1);
        saveAppointments(newAppointments);
    }

    useEffect(() => {
        console.log('Componente listo o algo cambio');
        // let startAppointment;
        let startAppointment = JSON.parse(localStorage.getItem('appointments'));

        if(startAppointment){
            // localStorage.setItem('appointments', JSON.stringify(appointments));
        }
        else{
            // localStorage.setItem('appointments', JSON.stringify([]));
        }
    } )

    const title = Object.keys(appointments).length === 0? 'No hay citas': 'Administra las citas aqui';

    return ( 
        <Fragment>
            <h1>Administrador de pacientes</h1>
            <div className="container">
                <div className="one-half column">
                    <Formulario addAppointment={addAppointment} />
                </div>
                <div className="one-half column">
                    <h2>{title}</h2>
                    {appointments.map((appointment, index) => {
                        return (
                            <Appointment
                                key={index}
                                index={index}
                                appointment={appointment}
                                deleteAppointment={deleteAppointment} />
                        )
                    })}
                </div>
                
            </div>
        </Fragment>
     );
}
 
export default App;