import { createContext, useState, useEffect } from "react";

interface AppContextProps {
    tema?: string;
    alternarTema?: () => void;
}

const AppContext = createContext<AppContextProps>({});

export function AppProvider(props: any) {
    const [tema, setTema] = useState('light');

    const alternarTema = () => {
        const novoTema = tema === 'light' ? 'dark' : 'light'

        setTema(novoTema);
        
        localStorage.setItem('tema', novoTema)
    };

    useEffect(() => {
        const temaSalvo = localStorage.getItem('tema')

        if (temaSalvo) {
            setTema(temaSalvo)
        }
    }, [])
    return (
        <AppContext.Provider value={{ tema, alternarTema }}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContext;

export const AppConsumer = AppContext.Consumer;
