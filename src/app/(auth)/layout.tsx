export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-screen relative lg:flex block content-center">
            <div className="w-full absolute z-[-2] h-full bg-cover bg-[linear-gradient(to_left,rgba(255,255,255,0.95)_10%,rgba(0,0,0,0.2)_100%),url('/image/LeSserafim.jpg')] co"></div>
            <div className="lg:w-3/5 hidden lg:block h-full"></div>
            <div className="lg:w-2/5 h-full flex flex-col justify-center items-center">
                {children}
            </div>
        </div>
    );
}