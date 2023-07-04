import { FC } from "react";
import Images from "../Images";

interface CardCouterProps {
    title?: string
    counter?: string
    desc?: string
    src?: string
}

const CardCouter: FC<CardCouterProps> = ({ title, counter, desc, src }) => {
    return (
        <div className="col-lg-4 col-md-12 col-6 mb-[26px]">
            <div className="card h-full">
                <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                            <Images w={'100%'} h={'100%'} src={src} alt={title} classNameImg="rounded" />
                        </div>
                    </div>
                    <span className="fw-semibold d-block mb-1">{title}</span>
                    <h3 className="card-title mb-2">{counter}</h3>
                    <span>{desc}</span>
                </div>
            </div>
        </div>
    );
}

export default CardCouter;