import React from 'react';
//import React, { useState, useRef } from 'react';
//import _ from 'lodash';

import { tableFromIPC } from 'apache-arrow';
import { arrowFromBase64, arrowToDFDataProxy } from '../utils/arrowToDFDataProxy';


export type DFDataRow = Record<
  string,
  string | number | boolean | any | null
  // | any[] | Record<string, any>
>;

export type DFData = DFDataRow[];

function tableRow(r: DFDataRow) {
  return Object.keys(r).map((key: string) => {
    const val = r[key];
    return <td key={key}> {val} </td>;
  });
}

function headerRow(r: DFDataRow) {
  return Object.keys(r).map((key: string) => {
    return <th key={key}> {key} </th>;
  });
}

export function SimpleDFWidget({ df_data }: { df_data: DFData }) {
  console.log('SimpleDFWidget');
  if (df_data.length === 0) {
    return <h3> empty df_data</h3>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>{headerRow(df_data[0])}</tr>
        </thead>
        <tbody>
          {df_data.map((valDict, index) => {
            return <tr key={index}>{tableRow(valDict)}</tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}

export function BytesSimpleDFWidgetOrig({ df_arrow_bytes}: {df_arrow_bytes:any}) {
  console.log("df_arrow_bytes", df_arrow_bytes)
  const table = tableFromIPC(df_arrow_bytes);
  console.log("table", table)
  const dfd:DFData = arrowToDFDataProxy(table)
  return SimpleDFWidget({df_data:dfd}) 
}

export function BytesSimpleDFWidget({ df_arrow_bytes}: {df_arrow_bytes:DataView}) {
  console.log("df_arrow_bytes", df_arrow_bytes)
  const uintBytes = new Uint8Array(df_arrow_bytes.buffer);

  const table = tableFromIPC(uintBytes);
  console.log("table", table)
  const dfd:DFData = arrowToDFDataProxy(table)
  return SimpleDFWidget({df_data:dfd}) 
}

export function Base64SimpleDFWidget({ df_base64}: {df_base64:string}) {
  const table = arrowFromBase64(df_base64);
  //  const table = tableFromIPC(df_arrow_bytes);
  const dfd:DFData = arrowToDFDataProxy(table)
  return SimpleDFWidget({df_data:dfd}) 
}
