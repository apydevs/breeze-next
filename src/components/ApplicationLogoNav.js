import Link from 'next/link'

const ApplicationLogo = props => (
    <Link href={"/"} className="flex lg:flex-1 items-baseline">
       <svg {...props} className="text-black w-8 font-semibold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path fill="currentColor"
                      d="M272 49.7V464H112l0-371.2L272 49.7zM320 464V42.4C320 19 301 0 277.6 0c-3.7 0-7.4 .5-11 1.5L99.5 46.4C78.6 52.1 64 71.1 64 92.8V464H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64 96h16H272h48V464zM224 288c13.2 0 24-14.4 24-32s-10.8-32-24-32s-24 14.4-24 32s10.7 32 24 32zM352 112H456c4.4 0 8 3.6 8 8V488c0 13.3 10.7 24 24 24h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H512V120c0-30.9-25.1-56-56-56H352v48z" />
            </svg>
            <span className="text-3xl font-semibold text-black">Yeoley</span>
    </Link>
)

export default ApplicationLogo
