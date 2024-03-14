import React from 'react';
import {DFData, SimpleDFWidget} from '../../js/components/SimpleDFWidget'
import _ from 'lodash';

import { tableToIPC, tableFromJSON } from 'apache-arrow';
import { arrowToDFDataProxy } from '../../js/utils/arrowToDFDataProxy';

export default function() {

    const table = tableFromJSON([{
        a: 42,
        b: true,
        c: 'foo',
        d: -23.8
        //e: [10,20]
    }, {
        a: 12,
        b: false,
        c: 'bar',
        d: 9.1
        //e: [200,400]       
    }]);
    const adf = table.data[0];
    //const dfd = arrowToDFData(table);
    const dfd = arrowToDFDataProxy(table);
    console.log("tableToIpc", tableToIPC(table))

    console.log("dfd[0]", dfd[0], "length", dfd.length);
    return <div><SimpleDFWidget df_data={dfd}/></div>
}
