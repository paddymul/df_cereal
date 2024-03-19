import React from 'react';
import { tableFromIPC } from 'apache-arrow';
import { arrowUtils, Components } from 'df_cereal';

/*
  df = pd.DataFrame({'a':[10,530], 'c': [-3.5, 9.7], 'd': [1,2]})

table = pa.Table.from_pandas(df)
feather.write_feather(table, "simple_df.feath", compression='uncompressed')
feath_text = open("simple_df.feath", "rb").read()
usable_feath_text = base64.b64encode(feath_text).decode('utf8')
*/
const base64table = [
  'QVJST1cxAAD/////6AIAABAAAAAAAAoADgAGAAUACAAKAAAAAAEEABAAAAAAAAoADAAAAA',
 'QACAAKAAAARAIAAAQAAAABAAAADAAAAAgADAAEAAgACAAAABwCAAAEAAAADAIAAHsiaW5k',
 'ZXhfY29sdW1ucyI6IFt7ImtpbmQiOiAicmFuZ2UiLCAibmFtZSI6IG51bGwsICJzdGFydC',
 'I6IDAsICJzdG9wIjogMiwgInN0ZXAiOiAxfV0sICJjb2x1bW5faW5kZXhlcyI6IFt7Im5h',
 'bWUiOiBudWxsLCAiZmllbGRfbmFtZSI6IG51bGwsICJwYW5kYXNfdHlwZSI6ICJ1bmljb2',
 'RlIiwgIm51bXB5X3R5cGUiOiAib2JqZWN0IiwgIm1ldGFkYXRhIjogeyJlbmNvZGluZyI6',
 'ICJVVEYtOCJ9fV0sICJjb2x1bW5zIjogW3sibmFtZSI6ICJhIiwgImZpZWxkX25hbWUiOi',
 'AiYSIsICJwYW5kYXNfdHlwZSI6ICJpbnQ2NCIsICJudW1weV90eXBlIjogImludDY0Iiwg',
 'Im1ldGFkYXRhIjogbnVsbH0sIHsibmFtZSI6ICJiIiwgImZpZWxkX25hbWUiOiAiYiIsIC',
 'JwYW5kYXNfdHlwZSI6ICJ1bmljb2RlIiwgIm51bXB5X3R5cGUiOiAib2JqZWN0IiwgIm1l',
 'dGFkYXRhIjogbnVsbH1dLCAiY3JlYXRvciI6IHsibGlicmFyeSI6ICJweWFycm93IiwgIn',
 'ZlcnNpb24iOiAiMTQuMC4yIn0sICJwYW5kYXNfdmVyc2lvbiI6ICIyLjAuMyJ9AAAAAAYA',
 'AABwYW5kYXMAAAIAAABAAAAABAAAANj///8AAAEFEAAAABgAAAAEAAAAAAAAAAEAAABiAA',
 'AABAAEAAQAAAAQABQACAAGAAcADAAAABAAEAAAAAAAAQIQAAAAHAAAAAQAAAAAAAAAAQAA',
 'AGEAAAAIAAwACAAHAAgAAAAAAAABQAAAAP/////IAAAAFAAAAAAAAAAMABYABgAFAAgADA',
 'AMAAAAAAMEABgAAAAwAAAAAAAAAAAACgAYAAwABAAIAAoAAABsAAAAEAAAAAIAAAAAAAAA',
 'AAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAA',
 'AAAAAQAAAAAAAAAAwAAAAAAAAAIAAAAAAAAAANAAAAAAAAAAAAAAACAAAAAgAAAAAAAAAA',
 'AAAAAAAAAAIAAAAAAAAAAAAAAAAAAABjAAAAAAAAABsAAAAAAAAAAAAAAAUAAAANAAAAAA',
 'AAAHBhZGR5bWFyZ2FyZXQAAAD/////AAAAABAAAAAMABQABgAIAAwAEAAMAAAAAAAEAEAA',
 'AAAoAAAABAAAAAEAAAD4AgAAAAAAANAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
 'oADAAAAAQACAAKAAAARAIAAAQAAAABAAAADAAAAAgADAAEAAgACAAAABwCAAAEAAAADAIA',
 'AHsiaW5kZXhfY29sdW1ucyI6IFt7ImtpbmQiOiAicmFuZ2UiLCAibmFtZSI6IG51bGwsIC',
 'JzdGFydCI6IDAsICJzdG9wIjogMiwgInN0ZXAiOiAxfV0sICJjb2x1bW5faW5kZXhlcyI6',
 'IFt7Im5hbWUiOiBudWxsLCAiZmllbGRfbmFtZSI6IG51bGwsICJwYW5kYXNfdHlwZSI6IC',
 'J1bmljb2RlIiwgIm51bXB5X3R5cGUiOiAib2JqZWN0IiwgIm1ldGFkYXRhIjogeyJlbmNv',
 'ZGluZyI6ICJVVEYtOCJ9fV0sICJjb2x1bW5zIjogW3sibmFtZSI6ICJhIiwgImZpZWxkX2',
 '5hbWUiOiAiYSIsICJwYW5kYXNfdHlwZSI6ICJpbnQ2NCIsICJudW1weV90eXBlIjogImlu',
 'dDY0IiwgIm1ldGFkYXRhIjogbnVsbH0sIHsibmFtZSI6ICJiIiwgImZpZWxkX25hbWUiOi',
 'AiYiIsICJwYW5kYXNfdHlwZSI6ICJ1bmljb2RlIiwgIm51bXB5X3R5cGUiOiAib2JqZWN0',
 'IiwgIm1ldGFkYXRhIjogbnVsbH1dLCAiY3JlYXRvciI6IHsibGlicmFyeSI6ICJweWFycm',
 '93IiwgInZlcnNpb24iOiAiMTQuMC4yIn0sICJwYW5kYXNfdmVyc2lvbiI6ICIyLjAuMyJ9',
 'AAAAAAYAAABwYW5kYXMAAAIAAABAAAAABAAAANj///8AAAEFEAAAABgAAAAEAAAAAAAAAA',
 'EAAABiAAAABAAEAAQAAAAQABQACAAGAAcADAAAABAAEAAAAAAAAQIQAAAAHAAAAAQAAAAA',
 'AAAAAQAAAGEAAAAIAAwACAAHAAgAAAAAAAABQAAAABgDAABBUlJPVzE='].join('')
 

/*
f1 = t2.schema.fields[0]
f1.type 
b = t2.batches[0]

b.schema.metadata // pandas index info
bi  = b.data.children[0].values[0]
JSON.parse( t2.schema.metadata.get('pandas')) 

pmdecode = new TextDecoder().decode(b.data.children[1].values) 
t2.getChild('b').get(0) 

*/

export default function() {
    // this test verifies that we can load  base64 into an array data and display the same table

    const b64bytes = arrowUtils.base64ToBytes(base64table)
  const t2 = tableFromIPC(b64bytes);
  console.log(t2);
    const dfd2 = arrowUtils.arrowToDFDataProxy(t2);    
    return <div><Components.SimpleDFWidget df_data={dfd2}/></div>
}
