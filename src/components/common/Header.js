import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const Title = styled.h1`
    margin-top: 20px;
    color: #606163;
`

const Header = () => {
    return (
        <Wrapper>
            <Title>DongBlog</Title>
        </Wrapper>
    )
}

export default Header