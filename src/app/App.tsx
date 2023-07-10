import { InputKonterAgent } from "../shared/input";
import { Container } from "../shared/container";
import { CardsBoard } from "../shared/cardsBoard";

function App() {
    return (
        <Container>
            <div className="w-full h-screen flex flex-col justify-left gap-7">
                <div className=" w-1/3">
                    <InputKonterAgent />
                </div>
                <div className="h-80 w-100">
                    <CardsBoard />
                </div>
            </div>
        </Container>
    );
}

export { App };
