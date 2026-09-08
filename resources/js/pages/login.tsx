import car from "../../../public/banner.jpg"
export default function login() {
    
    return (
        <>
         <div className="w-full h-screen flex items-center justify-center">
            <div className="flex flex-row px-5 py-6">
            <div className="flex flex-col items-center">
                <p>Hai</p>
                <p>Hai</p>
            </div>
            <div className="w-1/2 h-64 overflow-hidden flex items-center">
                <img src={car} alt="" />
            </div>
         </div>
         </div>
        </>
    );
}