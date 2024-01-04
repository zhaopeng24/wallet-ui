import { ReactNode, FC } from 'react'
interface HeaderProps {
    title?: string;
    showBack?: boolean;
    leftBtn?: ReactNode
}
const Header: FC<HeaderProps> = (props) => {
    const { title } = props
    return (
        <div className='p-8'>
            <div className='text-white font-bold text-center'>{ title }</div>
        </div>
    )
}
export default Header