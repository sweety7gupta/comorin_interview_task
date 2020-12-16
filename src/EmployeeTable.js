import React from 'react';
import EmployeeHeader from './EmployeeHeader';
import EmployeeRow from './EmployeeRow';

const sortableColumns = ['id', 'name', 'grade', 'active'];

export default class EmployeeTable extends React.Component {
    state = {
        employees: this.props.employees,
        employeesToRender: this.props.employees,
        searchText: '',
    };

    getEmployeesToRender = () => {
        const { employees, searchText, sortKey, sortAsc } = this.state;
        const text = searchText && searchText.toLowerCase();

        const filteredEmployees = employees.filter((emp) =>
            emp.name.toLowerCase().indexOf(text) > -1
        );

        const sortedEmployees = filteredEmployees.sort((a, b) => {
            if (sortAsc) {
                if (typeof a[sortKey] === 'string') {
                    return a[sortKey].localeCompare(b[sortKey]);
                } else {
                    return a[sortKey] - b[sortKey];
                }
            } else {
                if (typeof a[sortKey] === 'string') {
                    return b[sortKey].localeCompare(a[sortKey]);
                } else {
                    return b[sortKey] - a[sortKey];
                }
            }
        });

        return sortedEmployees;
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

    handleSorting = (key) => {
        if (sortableColumns.indexOf(key) <= -1) {
            return;
        }

        const { sortKey } = this.state;

        this.setState({
            sortKey: key,
            sortAsc: sortKey === key ? !this.state.sortAsc : true,
        });
    };

    render() {
        const { searchText, sortKey, sortAsc } = this.state;

        return (
            <React.Fragment>
                <input
                    type="text"
                    placeholder="Search by employee name"
                    value={searchText}
                    onChange={this.handleSearchTextChange}
                />

                <div className="employee-table">
                    <EmployeeHeader onSort={this.handleSorting} sortKey={sortKey} sortAsc={sortAsc} />

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
