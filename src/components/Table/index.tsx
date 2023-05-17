'use client';

import { FC, memo } from 'react';
import Thead from './Thead';
// import { TableProps } from "../Types";
import Tbody from './Tbody';
import { TableProps } from '@/types';



const Table: FC<TableProps> = ({ configDetail, isFuc, isStt, selectCheck, data, configFuc, provider }) => {
    return (
        // max-sm:w-[1500px] sm:w-[1400px] 2xl:!w-full
        <table className="table-auto w-full">
            <Thead config={configDetail} isFuc={isFuc} isStt={isStt} selectCheck={selectCheck} />
            <Tbody
                data={data}
                config={configDetail}
                selectCheck={selectCheck}
                isStt={isStt}
                isFuc={isFuc}
                configFuc={configFuc}
                provider={provider}
            />
        </table>
    );
};

export default memo(Table);
