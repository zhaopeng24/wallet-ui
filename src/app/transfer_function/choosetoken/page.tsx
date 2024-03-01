import { PersonComponent } from "../components/Sent";
import Token from "../components/Token";

export default function ChooseToken() {
    return (<div className="flex flex-col gap-5">
    <h1 className="text-bold">Send To</h1>
        <PersonComponent/>
        <Token/>
    </div>)
}