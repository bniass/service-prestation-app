import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <>
            <div>Entete</div>
            <div><Outlet /></div>
            <div>Footer</div>
        </>
    )
}