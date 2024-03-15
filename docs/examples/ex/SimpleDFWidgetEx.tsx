import React from 'react';
import { Components } from 'df_cereal';

const sampleData:Components.DFData =   [
    {'a':  5  , 'b':20, 'c': 'Paddy'},
    {'a': 58.2, 'b': 9, 'c': 'Margaret'}];
export default function() {
    return <div><Components.SimpleDFWidget df_data={sampleData}/></div>
}