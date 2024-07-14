import styled from "styled-components"

const StyledButton = styled.button`
    width: 180px;
    height: 54px;
    background-color: transparent;
    border: 2px solid #F5F5F5;
    border-radius: 10px;
    color: var(--branco);
    font-size: 1.25rem;
    font-weight: 900;
    text-align: center;
    cursor: pointer;
    &.active{
        background-color:#2271D1;
        border: 2px solid #FFFFFF;
        color: #FFFFFF;
    }
    
`


const Button = ({children, isActive}) => {
    
    return(
        <StyledButton className={isActive?"active":""}>
            {children}
        </StyledButton>
    )
}

export default Button