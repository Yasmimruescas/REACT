import { LinkedinLogoIcon } from '@phosphor-icons/react/dist/ssr'

function Footer() {

    let data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-gradient-to-r from-purple-600 to-purple-900 text-white">
                <div className="container flex flex-col items-center">
                    <p className='text-xl font-bold'>
                        Blog da Yasmim • Compartilhando ideias desde {data}
                    </p>
                    <p className='text-lg'>Acesse minhas redes sociais</p>
                    <div className='flex gap-2'>
                        <a href="http://linkedin.com/in/yasmim-ruescas" target="_blank">
                            <LinkedinLogoIcon size={48} weight='bold' />
                        </a>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer