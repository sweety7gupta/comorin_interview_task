import React from 'react';

export default function EmployeeHeader(props) {
    const { onSort, sortKey, sortAsc } = props;

    function getSortIndicator(key) {
        if (sortKey === key) {
            return sortAsc ? '▲' : '▼';
        }

        return '';
    }

    return (
        <div className="header">
            <div className="header-field" onClick={() => onSort('id')}>ID {getSortIndicator('id')}</div>
            <div className="header-field" onClick={() => onSort('image')}>Avatar</div>
            <div className="header-field" onClick={() => onSort('name')}>Name {getSortIndicator('name')}</div>
            <div className="header-field" onClick={() => onSort('grade')}>Grade {getSortIndicator('grade')}</div>
            <div className="header-field" onClick={() => onSort('active')}>Active {getSortIndicator('active')}</div>
            <div className="header-field">Action</div>
        </div>
    );
}
