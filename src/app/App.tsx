import { CardChild } from "../shared/cards";

function App() {
    return (
        <div className="w-full h-screen flex bg-slate-500 justify-left items-center">
            <div>
                <CardChild companyName='Тензор' adress="Максима Горького 24" id='1'/>
                <CardChild companyName='Тензор' adress="Максима Горького 24" id='2'/>
                
            </div>
        </div>
    );
}

export { App };
