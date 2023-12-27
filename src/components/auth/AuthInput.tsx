interface AuthInputProps {
    label: string
    valor: any
    obrigatorio?: boolean
    naoRenderizarQuando?: boolean
    valorMudou: (novoValor: any) => void
    tipo?: 'text' | 'email' | 'password'
}

export default function AuthInput (props: AuthInputProps) {
    return props.naoRenderizarQuando ? null : (
        <div className="flex flex-col mt-4">
            <label>{props.label}</label>
            <input 
                className="px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:bg-white focus:border-blue-500 focus:outline-none" 
                type={props.tipo ?? 'text'}
                value={props.valor} 
                required={props.obrigatorio}
                onChange={e => props.valorMudou?.(e.target.value)}
            />
        </div>

    )
}