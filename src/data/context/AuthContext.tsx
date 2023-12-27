import Router from "next/router";
import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import Usuario from "../../model/Usuario";
import Cookies from 'js-cookie'

interface AuthContextProps {
    usuario?: Usuario;
    carregando?: boolean;
    loginGoogle?: () => Promise<void>;
    login?: (email:string, senha:string) => Promise<void>; 
    cadastrar?: (email:string, senha:string) => Promise<void>;
    logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({});

const gerenciarCookie = (logado: boolean) => {
    if (logado) {
        return Cookies.set('admin-template-gv-auth', 'true', {
            expires: 1
        })
    }

    return Cookies.remove('admin-template-gv-auth')
}

const usuarioNormalizado = async (usuarioFireBase: firebase.User): Promise<Usuario> => {
    const token = await usuarioFireBase.getIdToken()

    return {
        uid: usuarioFireBase.uid,
        nome: usuarioFireBase.displayName,
        email: usuarioFireBase.email,
        token,
        provedor: usuarioFireBase.providerData[0]?.providerId,
        imagemUrl: usuarioFireBase.photoURL
    }
}


export function AuthProvider(props: any) {
    const [carregando, setCarregando] = useState<boolean>(true)
    const [usuario, setUsuario] = useState<Usuario>()

    const configurarSessao = async (usuarioFireBase: any) => {
        if (usuarioFireBase?.email) {
            const usuario = await usuarioNormalizado(usuarioFireBase)
            
            setUsuario(usuario)

            gerenciarCookie(true)

            setCarregando(false)

            return usuario.email
        } 

        setUsuario(undefined)

        gerenciarCookie(false)

        setCarregando(false)

        return false
    }

    const loginGoogle = async () => {
        try {
            setCarregando(true)

            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
            
            if (resp.user) {
                await configurarSessao(resp.user)
    
                Router.push('/')
            }
        } finally {
            setCarregando(false)
        }
    }

    const login = async (email: string, senha: string) => {
        try {
            setCarregando(true)

            const resp = await firebase.auth().signInWithEmailAndPassword(email, senha)
            
            if (resp.user) {
                await configurarSessao(resp.user)
    
                Router.push('/')
            }
        } finally {
            setCarregando(false)
        }
    }

    const cadastrar = async (email: string, senha: string) => {
        try {
            setCarregando(true)
            if (email && senha) {
                const resp = await firebase.auth().createUserWithEmailAndPassword(email,senha)
                
                if (resp.user) {
                    await configurarSessao(resp.user)
        
                    Router.push('/')
                }
            }
        } finally {
            setCarregando(false)
        }
    }


    const logout = async () => {
        try {
            setCarregando(true)

            await firebase.auth().signOut()

            await configurarSessao(null)
        } finally {
            setCarregando(false)
        }

    }

    useEffect(() => {
        if (Cookies.get('admin-template-gv-auth')) {
            const cancelar = firebase.auth().onIdTokenChanged(configurarSessao)
    
            return () => cancelar()
        }

        return setCarregando(false)
    },[])

    return (
        <AuthContext.Provider
            value={{
                usuario,
                loginGoogle,
                logout,
                login,
                cadastrar,
                carregando
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext