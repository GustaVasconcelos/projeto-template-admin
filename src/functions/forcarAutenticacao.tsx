import Image from "next/image"
import loading from '../../public/images/loading.gif'
import useAuth from "../data/hook/useAuth"
import Router from "next/router"
import Head from "next/head"

export default function ForcarAutenticacao(jsx: any) {

    const { usuario, carregando } = useAuth()

    const renderizarConteudo = () => {
        return (
            <>
                <Head>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            if (!document.cookie?.includes("admin-template-gv-auth")) {
                                window.location.href = "/autenticacao"
                            }
                        `
                    }}/>
                </Head>
                {jsx}
            </>
        )
    }

    const renderizarCarregando = () => {
        return (
            <div className="flex justify-center items-center h-screen">
                <Image src={loading} alt="carregando..."></Image>
            </div>
        )
    }

    if (!carregando && usuario?.email) {
        return renderizarConteudo()
    } else if (carregando) {
        return renderizarCarregando()
    } else {
        Router.push('/autenticacao')

        return null
    }

}