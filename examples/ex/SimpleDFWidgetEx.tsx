import React from 'react';
import {DFData, SimpleDFWidget} from '../../js/components/SimpleDFWidget'


const sampleData:DFData =   [
    {'a':  5  , 'b':20, 'c': 'Paddy'},
    {'a': 58.2, 'b': 9, 'c': 'Margaret'}];
export default function() {
    console.log("statusbar default");


    return <div><SimpleDFWidget df_data={sampleData}/></div>

}
