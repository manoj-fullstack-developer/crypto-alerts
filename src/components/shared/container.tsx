import React from 'react'

function AppContainer({
    className,
    children,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
    return (
        <div className="flex justify-center w-full">
            <div
                className={`${className} mx-4 md:mx-10 lg:mx-14 max-w-[1300px] w-full`}
            >
                {children}
            </div>
        </div>
    )
}

export default AppContainer
