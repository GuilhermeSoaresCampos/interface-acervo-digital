import { type JSX } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import AuthRequests from '../../fetch/AuthRequests';
import { useState } from 'react';





interface CustomMenuItem extends MenuItem {
    badge?: number;
    shortcut?: string;
    items?: CustomMenuItem[];
}

function Navegacao(): JSX.Element {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });

    const [email] = useState(() => {
        return localStorage.getItem('email') ?? '';
    });

    const logout = () => {
        AuthRequests.removeToken();
        setIsAuthenticated(false);
    }

    const items: CustomMenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            className: 'm-5 text-white text-lg',
            url: "/"
        },
        {
            label: 'Alunos',
            icon: 'pi pi-star',
            className: 'm-5 text-white text-lg',
            url: "#"
        },
        {
            label: 'Livros',
            icon: 'pi pi-star',
            className: 'm-5 text-white text-lg',
            url: "#"
        },
        {
            label: 'Empréstimos',
            icon: 'pi pi-star',
            className: 'm-5 text-white text-lg',
            url: "#"   
        }
    ];

    const start = (
        <img
            alt="logo"
            src='./src/assets/app-icon.png'
            height="100"
            className="h-20 p-3 ml-10 mr-5 h-[7rem]"
        />
    );

    const end = (
        <div className="flex align-items-center gap-2">
            {isAuthenticated ? (
                <>
                    <p className="text-white content-center pr-[0.5rem]">Olá, {email}</p>
                    <button onClick={logout} className="text-white content-center pr-[0.5rem]">Sair</button>
                </>
            ) : (
                <a href="/login" className="text-white content-center pr-[0.5rem]">Login</a>

                
            )}
          
        </div>
    );

    return (
        <header className="card h-[12vh] bg-slate-700 content-center">
            <Menubar 
                model={isAuthenticated ? items : [items[0]]} 
                start={start} 
                end={end} 
            />
        </header>
    );

    
}

export default Navegacao;