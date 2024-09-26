import { Spin } from 'antd'

const Loader = () => {
    return (
        <div className="flex h-[90vh]  w-full justify-center items-center">
            <Spin />
        </div>
    )
}

export default Loader
