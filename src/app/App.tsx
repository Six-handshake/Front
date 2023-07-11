import { InputKonterAgent } from "../shared/input";
import { Container } from "../shared/container";
import { CardsBoard } from "../shared/cardsBoard";
import { GetFrontTestV1Type, getFrontTestV1 } from "../api/get-front-test-v1";
import { useEffect, useState } from "react";

type DataType = {
    key: string;
    parent_name: string;
    parent_inn: string;
    child_name: string;
    child_inn: string;
    depth: number;
};

const convertKontragentsToList = (responseKontragents: GetFrontTestV1Type) => {
    return responseKontragents.map((agent) => ({
        key: agent.parent.id,
        parent_name: agent.parent.name,
        parent_inn: agent.parent.inn,
        child_name: agent.child.name,
        child_inn: agent.child.inn,
        depth: agent.depth,
    }));
};

function App() {
    const [kontragent, setKonteragent] = useState<{
        data: DataType[];
        loading: boolean;
    }>({
        data: [],
        loading: true,
    });

    useEffect(() => {
        if (kontragent.loading) {
            getFrontTestV1().then((res) => {
                const convertedKontragents = convertKontragentsToList(res.data);
                setKonteragent({ data: convertedKontragents, loading: false });
            });
        }
    });
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
            <p className="text-black font-bold text-xl mb-5">
                Get Front Test V1
            </p>
            <div>
                {kontragent.data.map((agent) => {
                    return (
                        <div className="flex border border-black flex-col gap-4 mb-1">
                            <div className="flex flex-row gap-2">
                                <p className="font-semibold">Parent ID</p>
                                <p>{agent.key}</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <p className="font-semibold">Parent Name</p>
                                <p>{agent.parent_name}</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <p className="font-semibold">Parent INN</p>
                                <p>{agent.parent_inn}</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <p className="font-semibold">Child Name</p>
                                <p>{agent.child_name}</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <p className="font-semibold">Child INN</p>
                                <p>{agent.child_inn}</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <p className="font-semibold">Depth</p>
                                <p>{agent.depth}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Container>
    );
}

export { App };
