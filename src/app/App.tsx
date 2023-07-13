import { InputKonterAgent } from "../shared/input";
import { Container } from "../shared/container";
import { CardsBoard } from "../shared/cardsBoard";

function App() {
    return (
        <Container>
            <div className="w-full h-screen flex flex-col justify-left gap-7">
                <InputKonterAgent />    
                <div style={{height: '70%'}}>
                    <CardsBoard />
                </div>
            </div>
            <div>
            </div>
        </Container>
    );
}

export { App };
