import { InputKonterAgent } from "../shared/input";
import { Container } from "../shared/container";
import { CardsBoard } from "../shared/cardsBoard";

function App() {
    return (
        <Container>
            <div className="w-full flex flex-col justify-left">
                <InputKonterAgent />    
                <div style={{height: '100vh'}}>
                    <CardsBoard />
                </div>
            </div>
        </Container>
    );
}

export { App };
