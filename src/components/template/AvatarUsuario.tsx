import useAuth from '../../data/hook/useAuth'
import Link from 'next/link'

interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario (props:AvatarUsuarioProps) {
    const { usuario } = useAuth()

    return (
        <Link href="/perfil">
            <img 
                className='mx-2 h-10 w-10 rounded-full cursor-pointer'
                src={usuario?.imagemUrl ?? '/images/avatar.png'} 
                alt="Avatar do Usuário" 
            /> 
        </Link>
    )
}