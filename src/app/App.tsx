import { CardChild } from "../shared/cards";
import { InputKonterAgent } from "../shared/input";
import { Container } from "../shared/container";
import { Todos } from "../todos";

function App() {
    return (
        <Container>
            <div className="w-full h-screen flex flex-col justify-left gap-7">
                <div className=" w-1/3">
                    <InputKonterAgent />
                </div>
                <div>
                    <CardChild
                        companyName="Тензор"
                        adress="Максима Горького 24"
                        id="1"
                        phone="79999999999"
                    />
                    <CardChild
                        companyName="Тензор"
                        adress="Максима Горького 24"
                        id="2"
                    />
                </div>
                <div>
                    <Todos/>
                </div>
            </div>
        </Container>
    );
}

export { App };
