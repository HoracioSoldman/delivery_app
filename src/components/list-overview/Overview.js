import React from 'react'
import {OverviewWrapper} from '../stylus'
import OverviewItem from './OverviewItem'

export default function Overview(props) {

    return (
        <OverviewWrapper>
            {
                 props.items.map((ovv, i)=>(
                    <OverviewItem item={ovv} key={i}/>
                ))
            }

        </OverviewWrapper>
    )
}
