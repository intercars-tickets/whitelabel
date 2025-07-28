import "./style.scss"

type ButtonProps ={
onClick: () => void,
    text: string,
    label?: string,
}


export function Button2 (props: ButtonProps): React.ReactElement {
    return<>
        <button  className="intercars-button2"
        onMouseDown={()=>{ props.onClick()}}>
            {props.text}

        </button>

    </>
}