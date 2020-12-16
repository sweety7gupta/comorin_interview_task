import React from 'react';
import EmployeeHeader from './EmployeeHeader';
import EmployeeRow from './EmployeeRow';

export default class EmployeeTable extends React.Component {
    state = {
        employees: this.props.employees
    };

    handleEmployeeStatusChange = (employee) => {
        const { employees } = this.state;
        const index = employees.findIndex((emp) => emp.id === employee.id);
        const empsBeforeIndex = this.state.employees.slice(0, index);
        const empsAfterIndex = this.state.employees.slice(index + 1);
        const empAtIndex = this.state.employees[index];
        const empStatusAtIndex = this.state.employees[index].active;

        this.setState({
            employees: [
                ...empsBeforeIndex,
                {
                    ...empAtIndex,
                    active: !empStatusAtIndex
                },
                ...empsAfterIndex,
            ]
        });
    };

    render() {
        const { employees } = this.state;

        return (
            <div className="employee-table">
                <EmployeeHeader />

                {employees.map(employee => (
                    <EmployeeRow
                        employee={employee}
                        onEmployeeStatusChange={this.handleEmployeeStatusChange}
                    />
                ))}
            </div>
        )
    }
}
