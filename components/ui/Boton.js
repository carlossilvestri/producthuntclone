import styled from "@emotion/styled";

const Boton = styled.a`
    display: block;
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin: 2rem auto;
    text-align: center;
    background-color: ${props => props.bgColor ? '#da552f' : 'white'};
    color: ${props => props.bgColor ? 'white' : '#000'};
    &:hover{
        cursor: pointer;
        background-color: ${props => props.bgColor ? 'white' : '#da552f'};
        color: ${props => props.bgColor ? '#000' : 'white'};
    }
    &::last-of-type{
        margin-right: 0;
    }
`;
 
export default Boton;