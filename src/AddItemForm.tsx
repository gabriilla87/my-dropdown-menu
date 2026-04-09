import styled from "styled-components";
import {v4 as uuidv4} from "uuid";
import {useMemo, useState} from "react";
import * as React from "react";
import {useStore} from "./store.ts";

export const AddItemForm = () => {
    const { addCollapsibleDataItem, addRegularDataItem } = useStore();

    
    const [headerState, setHeaderState] = useState<"single" | "collapsible">("single");
    const [isChecked, setIsChecked] = useState({
        firstCheckBox: true,
        secondCheckBox: false,
    })
    const [inputsValue, setInputsValue] = useState({
        firstInput: "",
        secondInput: ""
    })

    const singleItemType = useMemo(() => {
        return isChecked.firstCheckBox ? "text" : "link";
    }, [isChecked.firstCheckBox])

    const changeHeaderStateToSingle = () => {
        setHeaderState("single");
    }
    const changeHeaderStateToCollapsible = () => {
        setHeaderState("collapsible");
    }

    const changeFirstIsCheckedValue = () => {
        setIsChecked({
            firstCheckBox: true,
            secondCheckBox: false,
        })
    }
    const changeSecondIsCheckedValue = () => {
        setIsChecked({
            firstCheckBox: false,
            secondCheckBox: true,
        })
    }

    const changeFirstInputValue = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setInputsValue({
            ...inputsValue,
            firstInput: e.currentTarget.value,
        })
    }
    const changeSecondInputValue = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setInputsValue({
            ...inputsValue,
            secondInput: e.currentTarget.value,
        })
    }

    const onButtonClickHandler = () => {
        if (headerState === "single") {
            addRegularDataItem(inputsValue.firstInput, inputsValue.secondInput, singleItemType);
            console.log("single item added")
        } else {
            addCollapsibleDataItem(inputsValue.firstInput);
            console.log("collapsible added")
        }
    };

    const firstInputId = useMemo(() => {
        return uuidv4();
    }, []);
    const secondInputId = useMemo(() => {
        return uuidv4();
    }, []);

    return (
        <Container>
            <Header>
                <HeaderPart onClick={changeHeaderStateToSingle}
                            style={{backgroundColor: headerState === "single" ? "lightgray" : "white"}}
                >
                    Одиночное
                </HeaderPart>
                <HeaderPart onClick={changeHeaderStateToCollapsible}
                            style={{backgroundColor: headerState === "collapsible" ? "lightgray" : "white"}}
                >
                    Раскрывающее
                </HeaderPart>
            </Header>
            <Input placeholder={"Введите название..."}
                   value={inputsValue.firstInput}
                   onChange={changeFirstInputValue}
                   id={firstInputId}
            />
            {
                headerState === "single"
                    ?
                    <>
                        <Input placeholder={"Введите заменитель..."}
                               value={inputsValue.secondInput}
                               onChange={changeSecondInputValue}
                               id={secondInputId}
                        />
                        <CheckBoxWrapper>
                            <CheckBoxItem onClick={changeFirstIsCheckedValue}>
                                <CheckBox checked={isChecked.firstCheckBox} onChange={() => {}}/>
                                <CheckBoxLabel>текст</CheckBoxLabel>
                            </CheckBoxItem>
                            <CheckBoxItem onClick={changeSecondIsCheckedValue}>
                                <CheckBox checked={isChecked.secondCheckBox} onChange={() => {}}/>
                                <CheckBoxLabel>ссылка</CheckBoxLabel>
                            </CheckBoxItem>
                        </CheckBoxWrapper>
                    </>
                    :
                    <></>
            }
            <button onClick={onButtonClickHandler}>Создать</button>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    box-sizing: border-box;
    margin: 10px 0 0 0;
    padding: 20px;
    border: 1px solid black;
    border-radius: 10px;
`

const Header = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    //border: 1px solid black;
`

const HeaderPart = styled.div`
    width: 100%;
    border: 1px solid black;
    text-align: center;
    cursor: pointer;
`

const Input = styled.input`
    width: 100%;
    height: 24px;
    padding: 0 6px;
    margin: 0;
    box-sizing: border-box;
`

const CheckBoxWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    //border: 1px solid red;
`

const CheckBoxItem = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 10px;
    //border: 1px solid yellow;
    cursor: pointer;
`

const CheckBox = styled.input.attrs({type: "checkbox"})`
    cursor: pointer;
`

const CheckBoxLabel = styled.span`
    margin: 0;
`