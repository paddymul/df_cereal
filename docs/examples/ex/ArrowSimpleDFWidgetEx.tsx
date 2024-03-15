import React from 'react';
import { tableToIPC, tableFromJSON } from 'apache-arrow';
import { arrowUtils, Components } from 'df_cereal';

export default function() {
    const table = tableFromJSON([{
        a: 42,
        b: true,
        c: 'foo',
        d: -23.8
    }, {
        a: 12,
        b: false,
        c: 'bar',
        d: 9.1
    }]);
    const dfd = arrowUtils.arrowToDFDataProxy(table);
    console.log("tableToIpc", tableToIPC(table))
    return <div><Components.SimpleDFWidget df_data={dfd}/></div>
}
