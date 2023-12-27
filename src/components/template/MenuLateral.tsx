import useAuth from "@/data/hook/useAuth";
import { IconeAjustes, IconeCasa, IconeLogout, IconeSino } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";
import { log } from "console";

export default function MenuLateral() {
    const { logout } = useAuth()
    return (
        <aside className="flex flex-col bg-gray-200 text-gray-900 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center bg-gray-700 dark:bg-gray-500 h-20 w-20">
                <Logo/>
            </div>
            <ul className="flex-grow">
                <MenuItem url="/" texto="Início" icone={IconeCasa}/>
                <MenuItem url="/configuracoes" texto="Configuração" icone={IconeAjustes}/>
                <MenuItem url="/notificacoes" texto="Notificações" icone={IconeSino}/>
            </ul>
            <ul>
                <MenuItem  className="text-red-600 dark:text-red-400 hover:bg-red-400 hover:text-white" onClick={logout} texto="Desconectar" icone={IconeLogout}/>
            </ul>
        </aside>
    )
}