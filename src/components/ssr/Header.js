import ApplicationLogoNav from '@/components/ApplicationLogoNav'
import DropdownMenu from '@/components/ssr/DropdownMenu'
import LoginLinks from '@/app/LoginLinks'
import Link from 'next/link'

const Header = ({bgColor}) => {

    return (
        <header className={bgColor ?? 'bg-white'}>
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">

                    <div className="mr-10">
                        <ApplicationLogoNav />
                    </div>
                    <div className="hidden lg:flex flex-row justify-start items-baseline gap-x-6">
                        <Link href="/search" className="text-base font-semibold text-gray-900">
                            Property Search
                        </Link>
                        <DropdownMenu />
                        <Link href="#" className="text-base font-semibold text-gray-900">
                            Investment
                        </Link>
                        <Link href="#" className="text-base font-semibold text-gray-900">
                            Behind Yeoley
                        </Link>
                    </div>
                     <div className="flex flex-row ">
                            <LoginLinks />
                        </div>
            </nav>
        </header>
)

}
export default Header
