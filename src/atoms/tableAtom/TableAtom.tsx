import React from 'react';
import './TableAtom.scss';
// import { users } from '../../assets/user-image';
import {FaUsers  } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

interface TableAtomProps {
  header: string[];
  rows?: { [key: string]: string | number }[];
}

const TableAtom: React.FC<TableAtomProps> = ({ header, rows = [] }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          {header.map((column, index) => (
            <th className={column==='NICKNAME'? 'tr-nickname': index===0?'tr-firstelement':''} key={index}>{column}</th>
        
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((row, rowIndex) => (
            <>
            <tr key={rowIndex}>
                <td className="nicknames-icon">
                {/* <span className="nickname-icon">👥</span> */}
                <FaUsers className="nickname-icon"/>

                </td>
              <td className="nickname-cell">
                <div>
                  <span className="nickname-text">{row.nickname}</span>
                  <div>Created {row.datemodify}</div>
                </div>
              </td>
              <td>{row.response}</td>
              <td>
                <span className="status-badge">{row.status}</span>
              </td>
              <td>{row.datemodify}</td>
              <td className="more-options"><HiDotsHorizontal />
              </td>
            </tr>
        
            </>
          ))
        ) : (
          <tr>
            <td colSpan={header.length+1} className="no-data">
              No data available
            </td>
          </tr>
        )}
      </tbody>
      <div></div>
    </table>
  );
};

export default TableAtom;
