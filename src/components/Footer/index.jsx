import styled from "styled-components"

const StyledFooter = styled.footer`
    display: none;
    @media screen and (min-width: 1024px){
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: "Roboto", sans-serif;
        gap: 10px;
        justify-content: center;
        width: 100%;
        height: 125px;
        background-color: var(--preto);
        border-top: var(--border);
        box-shadow: var(--boxShadow);
        >img{
            width: 168px;
        }
    }
`

const Footer = () => {
    return(
    <StyledFooter>
        <img src="/images/logo.png" alt="logo da AluraFlix" />
        <p>Desenvolvido por Rocio Gonzalez</p>
    </StyledFooter>    
    )
}

export default Footer