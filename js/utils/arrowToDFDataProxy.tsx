import { DFData } from '../components/SimpleDFWidget';
import { Table, tableFromIPC } from 'apache-arrow';

export const arrowToDFData = (table: Table): DFData => {

    const retArr: Record<string, any>[] = [];
    const columns: string[] = table.schema.fields.map((f) => f.name);
    table.batches.map((b) => {
        for (var rowNum = 0; rowNum < b.data.length; rowNum++) {
            const row = {};
            for (var i = 0; i < columns.length; i++) {
                const colName = columns[i];
                //@ts-ignore
                row[colName] = b.data.children[i].values[rowNum];
            }
            retArr.push(row);
        }
    });
    return retArr;
};

export const arrowToDFDataProxy = (table: Table): DFData => {
    const dfTarget:DFData = [];
    const columns: string[] = table.schema.fields.map((f) => f.name);

    function map(array:any[], iteratee:any) {//from lodash
        let index = -1;
        const length = array == null ? 0 : array.length;
        const result = new Array(length);

        while (++index < length) {
            result[index] = iteratee(array[index], index, array)}
        return result;}

    const dfDataHandler = {
        get(target:any, prop:string, receiver:any) {
            //console.log("target", target, "prop", prop, "receiver", receiver);

            if (prop === 'length') {
                return table.batches[0].data.length}
            else if (prop === 'map') {
                return (passedFunc:any) => map(receiver, passedFunc)}
            const rowNum = prop;
            ///for now pretend that there's only a single batch
            const relData = table.batches[0].data;
            const row = {};
            for (var i = 0; i < columns.length; i++) {
                const colName = columns[i];
                //@ts-ignore
                row[colName] = relData.children[i].values[rowNum];
            }
            return row;
        }
    };

    const dfDataProxy = new Proxy(dfTarget, dfDataHandler);
    return dfDataProxy;
};// from https://developer.mozilla.org/en-US/docs/Glossary/Base64#Solution_.232_.E2.80.93_rewriting_atob%28%29_and_btoa%28%29_using_TypedArrays_and_UTF-8
export function base64ToBytes(base64:string) {
    const binString = atob(base64);
    //@ts-ignore
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

export function bytesToBase64(bytes: Uint8Array) {
    const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)
    ).join("");
    return btoa(binString);
}

export const arrowFromBase64 = (b64:string)  => {
    console.log("b64", b64)
    const b64bytes = base64ToBytes(b64);
    const t2 = tableFromIPC(b64bytes);
    return t2;
}


