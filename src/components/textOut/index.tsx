import "./style.scss";

type TextOutProps = {
    title: string;
    text: string;
    mode?: "vertical" | "block" | "inline" | "none";
    minWidth?: string;
}

export function TextOut(props: TextOutProps) {
    const getStyle = () => {
        let style = "text-out-item_vertical"

        if (props.mode === undefined || props.mode === "vertical" || props.mode === "none") {
            return "text-out-item_vertical";
        } else {
            return "text-out-item_"+props.mode;
        }


    }
    return (<>
        <div className={getStyle()}>
            <div typeof="title">{props.title}</div>
            <div style={{minWidth: props.minWidth ?? "60px"}} typeof="value">{props.text}</div>
        </div>
    </>)
}