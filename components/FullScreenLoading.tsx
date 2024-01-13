import { Spinner } from "@nextui-org/react";
import { FC } from "react";

interface IFullScreenLoadingProps {
    text?: string;
}

const FullScreenLoading: FC<IFullScreenLoadingProps> = (props) => {
    const { text = 'loading...' } = props;
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black z-50 bg-opacity-60">
            <Spinner label={text} color="white" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
    )
}
export default FullScreenLoading;