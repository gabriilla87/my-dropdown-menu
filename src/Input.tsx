import type {SyntheticEvent} from "react";
import styled from "styled-components";

type Props = {
    onChange?: (event: SyntheticEvent<HTMLInputElement>) => void,
    value?: string
}

const StyledInput = styled.input`
    width: 100%;
    height: 40px;
    border-radius: 15px;
`

export const Input = ({onChange, value}: Props) => {
    return (
        <StyledInput onChange={onChange} value={value} type="text"/>
    )
}