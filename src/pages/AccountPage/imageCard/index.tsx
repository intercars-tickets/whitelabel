import "./style.scss";

type ImageLink={
    header:string;
    link:string;
}

type ImageCardProps = {
    imageLinks:ImageLink[];
    cardTitle:string;
    cardText:string;
}

export function ImageCard(props: ImageCardProps) {

    //"../../../img/moscov-img.png"
    return <>
        <div className="intercars-image-card-container">
            <div typeof="header">Популярные направления</div>
            <div typeof="text">Множество рейсов в самые различные города</div>
            {props.imageLinks && props.imageLinks.map((picture:ImageLink) => (
                <div>
                    <div></div>
                    <div typeof="image"><img src={require(  "../../../img/"+picture.link)} alt="img"/></div>
                </div>
            ))}

        </div>
    </>
}