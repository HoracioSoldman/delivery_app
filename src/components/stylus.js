import styled from 'styled-components'

export const PageTitle = styled.h2`
    text-align: center;
    font-weight: 400;
    margin-top: 100px;
`

/**************OVERVIEW**** */
export const OverviewWrapper = styled.div`
    display: flex;
    flex-flow: wrap;
    justify-content: center;
`

export const OverviewItemStyle = styled.div`
    text-align: center;
    margin: 10px;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),
     0 2px 2px 0 rgba(0,0,0,.14),
      0 1px 5px 0 rgba(0,0,0,.12);
    *{
        margin: 0;
        padding: 16px;
    }
    :hover{
        color: #00f;
    }
    h4 {
        background-color: ${props => props.primaryColor || '#aaa'};
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }

    p {
        background-color: ${props => props.secondaryColor || '#da5'};
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
    }

`


/**************END OF OVERVIEW**** */


export const TableStyle = styled.div`
    justify-content: center;
    overflow-x: scroll;
    table {
        margin: 20px auto;
        border-spacing: 0px;
        padding: 10px;
    }
    table th, table td {
        border-bottom: 1px solid #aaa;
        padding: 8px 5px;
    }
    
    table th{
        background-color: #ddd;
        padding-top: 10px;
    }

    table tr:hover{
        background-color: #eee;
    } 
`

export const OrderDateFieldStyle= styled.div`
    button {
        border: none;
        border-radius: 4px;
        color: #fff;
        float: right;
        padding: 2px 10px;
        cursor: pointer;
    }

    .add {
        background-color: #325ff8;
    }

    .rm {
        background-color: #ef0049;
    }

    .cnc {
        background-color: #555;
        margin-left: 10px;
    }

    .save, button.edt {
        background-color: #00b450;
        margin-left: 10px;
    }

    select {
        background-color: #eee;
        padding: 3px;
        border: none;
        margin-bottom: 10px;
    }

    div {
        display: flex;
        justify-content: center;
        border-radius: 3px;
    }
`

export const BikersList = styled.ul`
    position: absolute;
    top: 100%;
    padding: 0;
    margin: 2px 0 0 0;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;  
    list-style-type: none;
    display: none;

    li {
        float: none;
        padding: 5px 10px;
        text-decoration: none;
        display: block;
        text-align: left;
        color: #000;
        font-size: 0.9rem;
        cursor: pointer;
    }

    li:hover {
        background-color: #0f0fff;
        color: #fff;
    
    }
`

export const AssignmentStyle = styled.div`
    display: inline-block;
    position: relative;
    :hover ${BikersList}{
        display: block;
    }

    button {
        display: inline-block;
        font-family: inherit; 
        color: #fff;
        background-color: #0f0fff;
        border: none;
        padding: 5px 15px;
        border-radius: 4px;
        cursor: pointer;
    }
`
