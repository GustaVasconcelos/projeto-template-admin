import Link from "next/link"

interface MenuItemProps {
    url?: string,
    texto: string,
    icone: any,
    onClick?: (evento:any) => void,
    className?: string
}


export default function MenuItem (props:MenuItemProps) {

    const renderizarLink = () => {
        if (props.url) {
            return (
                <Link 
                    href={props.url!}
                    className="flex flex-col justify-center items-center h-20 w-20 text-gray-600 dark:text-gray-200"
                >
                    {props.icone}
                    <span className="text-xs font-light">
                        {props.texto}
                    </span>
                </Link>
            )
        }
        return (
                <a className={`flex flex-col justify-center items-center h-20 w-20 text-gray-600 ${props.className} dark:text-gray-200`}>
                    {props.icone}
                    <span className="text-xs font-light ">
                        {props.texto}
                    </span>
                </a>
        )
    }

    return (
        <li onClick={props.onClick!} className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
            {renderizarLink()}
        </li>
    )
}