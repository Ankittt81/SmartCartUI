import PublicNavbar from "./PublicNavbar";

function PublicLayout({ children }) {

    return (

        <div className="min-h-screen bg-gray-100">

            <PublicNavbar />

            <main>

                {children}

            </main>

        </div>
    );
}

export default PublicLayout;