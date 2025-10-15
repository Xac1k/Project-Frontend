import { useState } from 'react'
import styles from './PopOver.module.css'
import { dispatch, getEditor } from '../../store/functions'
import { setBackground } from '../../store/types'

type PopOverBackgroundProps = {
    isHidden: boolean
}

function PopOverColor(props: PopOverBackgroundProps) {
    const RGB = /rgb\(\d+[ ]*,[ ]*\d+[ ]*, [ ]*\d+[ ]*\)/gm;
    const HEX = /#[\dABCDEFabcdef]{6,8}/gm;
    if (!props.isHidden) {
        return (
            <>
                <label htmlFor='inputColor'>Введите цвет в формате rgd/hex</label>
                <input id='inputColor' type='text' onKeyDown={
                    (event) => {
                        if (event.key == 'Enter') {
                            const target = event.target as HTMLInputElement;
                            const inputData = target.value;
                            const selectedSlideID = getEditor().selection.selectedSlideID
                            if (RGB.test(inputData) || HEX.test(inputData)) {
                                dispatch(setBackground, {slideID: selectedSlideID[selectedSlideID.length-1], color: inputData})
                            }                            
                        }
                    }}>
                </input>
            </>
        )
    }

    return(<></>)
}

function PopOverImg(props: PopOverBackgroundProps) {
    const SRC = /http[\n\w\\\/\:.?=\-&]*/g;
    if (!props.isHidden) {
        return (
            <>
                <label htmlFor='inputImg'>Введите url изображения</label>
                <input id='inputImg' type='text' onKeyDown={
                    (event) => {
                        if (event.key == 'Enter') {
                            const target = event.target as HTMLInputElement;
                            console.log(target.value);
                            const selectedSlideID = getEditor().selection.selectedSlideID
                            if (SRC.test(target.value)) {
                                dispatch(setBackground, {slideID: selectedSlideID[selectedSlideID.length-1], src: target.value});
                            }                            
                        }
                    }}>
                </input>
            </>
        )
    }

    return(<></>)
}

function PopOverBackground(props: PopOverBackgroundProps) {
    const [isChosenColor, setChooseColor] = useState<boolean>(true);
    const [isChosenImg, setChooseImg] = useState<boolean>(true);

    const onClickHandleColor = () => {
        console.log('Выбор цвета')
        setChooseColor(!isChosenColor);
        if (isChosenImg) setChooseImg(false);
    }

    const onClickHandleImg = () => {
        console.log('Выбор картинки')
        setChooseImg(!isChosenImg);
        if (isChosenColor) setChooseColor(false);
    }

    if (!props.isHidden) {
        return (
            <div className={styles.PopOverBackground}>
                <div>
                    <button className={styles.PopOverButton_start} onClick={onClickHandleColor}>Цвет</button>
                    <PopOverColor isHidden={!isChosenColor}></PopOverColor>
                </div>
                
                <div>
                    <button className={styles.PopOverButton_end} onClick={onClickHandleImg}>Картинка</button>
                    <PopOverImg isHidden={!isChosenImg}></PopOverImg>
                </div>
            </div>
        )
    }
    if(isChosenColor) setChooseColor(false);
    if(isChosenImg) setChooseImg(false);
    return (<></>)
}

export {
    PopOverBackground
}