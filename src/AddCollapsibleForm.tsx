import {useState} from "react";
import styled from "styled-components";

// type Props = {
//     onChange?: (event: SyntheticEvent<HTMLInputElement>) => void,
//     value?: string
// }



const StyledInput = styled.input`
    width: 100%;
    height: 40px;
    border-radius: 15px;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const UpperBlock = styled.div`
    display: flex;
    flex-direction: row;
`

const DownerBlock = styled.div`
    display: flex;
    flex-direction: row;
`

export const AddCollapsibleForm = () => {
    const [textValue, setTextValue] = useState<string>("")
    const [isCollapsded, setIsCollapsed] = useState(false)

    return (
        <Wrapper>
            <UpperBlock>
                <StyledInput onChange={(e) => setTextValue(e.currentTarget.value)} value={textValue} />
                <button>Создать</button>
            </UpperBlock>
            <DownerBlock>
                <input type="checkbox" checked={isCollapsded} onChange={() => setIsCollapsed(!isCollapsded)} />
            </DownerBlock>
        </Wrapper>
    )
}