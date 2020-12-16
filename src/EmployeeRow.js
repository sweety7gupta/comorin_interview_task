import React from 'react';

export default function EmployeeRow(props) {
    const { employee, onEmployeeStatusChange } = props;

    return (
        <div className="data-row">
            <div className="row-field">{employee.id}</div>
            <div className="row-image-field">
                <img src={employee.image} width="30" />
            </div>
            <div className="row-field">{employee.name}</div>
            <div className="row-field">{employee.grade}</div>
            <div className="row-field">{employee.active ? 'YES': 'NO'}</div>
            <div className="row-field">
                <button onClick={() => onEmployeeStatusChange(employee)}>
                    {employee.active ? 'Deactivate': 'Activate'}
                </button>
            </div>
        </div>
    );
}
