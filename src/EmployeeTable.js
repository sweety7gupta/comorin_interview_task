import React from 'react';
import EmployeeHeader from './EmployeeHeader';
import EmployeeRow from './EmployeeRow';

export default class EmployeeTable extends React.Component {
    state = {
        employees: this.props.employees,
        employeesToRender: this.props.employees,
        searchText: '',
    };

    getEmployeesToRender = () => {
        const { employees, searchText } = this.state;
        const text = searchText && searchText.toLowerCase();

        const filteredEmployees = employees.filter((emp) =>
            emp.name.toLowerCase().indexOf(text) > -1
        );

        return filteredEmployees;
    };

    handleEmployeeStatusChange = (employee) => {
        const { employees } = this.state;
        const index = employees.findIndex((emp) => emp.id === employee.id);
        const empsBeforeIndex = employees.slice(0, index);
        const empsAfterIndex = employees.slice(index + 1);
        const empAtIndex = employees[index];
        const empStatusAtIndex = employees[index].active;

        const updatedEmployees = [
            ...empsBeforeIndex,
            {
                ...empAtIndex,
                active: !empStatusAtIndex
            },
            ...empsAfterIndex,
        ];

        this.setState({
            employees: updatedEmployees,
        });
    };

    handleSearchTextChange = (event) => {
        const { value } = event.target;
        const searchText = value.trim();

        this.setState({
            searchText: value
        });
    };

    render() {
        const { searchText } = this.state;

        return (
            <React.Fragment>
                <input
                    type="text"
                    placeholder="Search by employee name"
                    value={searchText}
                    onChange={this.handleSearchTextChange}
                />

                <div className="employee-table">
                    <EmployeeHeader />

                    {this.getEmployeesToRender().map(employee => (
                        <EmployeeRow
                            employee={employee}
                            onEmployeeStatusChange={this.handleEmployeeStatusChange}
                        />
                    ))}
                </div>
            </React.Fragment>
        )
    }
}
