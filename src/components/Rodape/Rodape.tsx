import type { JSX } from "react";

function Rodape(): JSX.Element {
    return (
        <footer className="bg-slate-700 min-h-[12vh] px-4 py-5 flex flex-col sm:flex-row items-center justify-around gap-2">
            <p className="text-white text-sm sm:text-base lg:text-lg">Copyright - Todos os direitos e esquerdos reservados</p>
            <p className="text-white text-sm sm:text-base lg:text-lg">[ Guilherme Henrique Soares Campos ]</p>
        </footer>
    );
}

export default Rodape;